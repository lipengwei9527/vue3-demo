<template>
  <div class="ex-calendar" ref="calendar">
    <div class="calendar-head" ref="head">{{ modelValue }}</div>
    <table class="ex-calendar-table">
      <thead ref="thead">
        <th v-for="item in weeks" class="week-item">{{ item }}</th>
      </thead>
      <tbody ref="tbody">
        <tr v-for="trItem in calendarData">
          <td v-for="tdItem in trItem">
            <div
              :class="setCalendarItemClass(tdItem)"
              @click="selectDayFn(tdItem)"
            >
              <div v-if="Object.keys(slots).length == 0">
                {{ tdItem.day }}
              </div>
              <slot v-else :data="tdItem"></slot>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script name="ExCalendar" setup lang="ts">
import {
  ref,
  reactive,
  useSlots,
  PropType,
  useTemplateRef,
  watch,
  onMounted,
  computed,
} from "vue";
import { useVModel } from "@vueuse/core";
import { formateDate } from "@/utils/date";

import { getCalendarData, modeType } from "./library/date";
import { DayInfo } from "@/types/components";
import { isType } from "@/utils/isType";

// 父组件中使用插槽即使是注释也会返回一个包含default属性的对象
// 不使用插槽时要保证父组件插槽位置不能有任何东西（注释也不行）
const slots = useSlots();
const props = defineProps({
  /**
   * @description 选中的时间
   * 会统一格式化为yyyy-MM-dd时间格式
   */
  modelValue: {
    type: [Date, String, Array] as PropType<Date | string | string[]>,
    default: () => new Date(),
  },
  /**
   * @description 默认要展示的月份或周
   */
  defaultTime: {
    type: [Date, Number, String] as PropType<Date | number | string>,
    default: () => new Date(),
  },
  /**
   * @description 绑定的值的格式
   */
  valueFormat: {
    type: String as PropType<FormateDateType>,
    default: () => "yyyy-MM-dd",
  },
  /**
   * @description 组件整体高度
   */
  height: {
    type: [Number],
  },
  /**
   * @description 日历单元格高度
   */
  cellHeight: {
    type: [Number],
    default: () => 400,
  },
  /**
   * @description 显示的是一周还是一个月
   */
  mode: {
    type: String as PropType<modeType>,
    default: "month",
  },
  /**
   * @description 周起始日：值为1-7,1为周一，7为周日
   */
  firstDayOfWeek: {
    type: Number as PropType<RangeType<1, 7>>,
    default: 1,
  },
  /**
   * @description 选择的是时间段还是时间点:true-时间段，false-时间点
   */
  period: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 可选时间段中的开始时间
   */
  startTime: {
    type: [String, Date],
    default: "",
  },
  /**
   * @description 可选时间段中不可选择的时间
   */
  banTime: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  /**
   * @description 可选时间段中的结束时间
   *
   */
  endTime: {
    type: [String, Date],
    default: "",
  },
});

const emits = defineEmits([
  "select",
  "update:modelValue",
  "update:defaultTime",
]);
let mValue = useVModel(props, "modelValue", emits);
let mDefaultTime = useVModel(props, "defaultTime", emits);
watch(
  mValue,
  (value) => {
    console.log("watch");
    const format = props.valueFormat;
    if (isType(value, "string") || isType(value, "date")) {
      return (mValue.value = formateDate(value, format));
    } else if (isType(value, "array")) {
      const list: string[] = [];
      for (const key in value as string[]) {
        list.push(formateDate(value[key], format));
      }
      mValue.value = list;
    }
  },
  {
    immediate: true,
    deep: true,
  }
);
watch(mDefaultTime, (value) => {});
const calendarRef = useTemplateRef("calendar");
const weeks = ["一", "二", "三", "四", "五", "六", "日"];
// 通过点击选中的日期
const selData = reactive<(DayInfo | undefined)[]>([]);
// 要渲染的日历数据
let calendarData = reactive<DayInfo[][]>([]);
// 选中的月份的原始日历数据
let orgData: DayInfo[] = [];

/**
 * @description 将平铺的日历数据转为每七个为一组的数组
 * @param data 平铺的日历数据
 */
const toTreeCalendarData = (data: DayInfo[]) => {
  const tempData: DayInfo[][] = [];
  let tempItem: DayInfo[] = [];
  data.forEach((item, index) => {
    tempItem.push(item);
    if ((index + 1) % 7 == 0) {
      tempData.push(tempItem);
      tempItem = [];
    }
  });
  return tempData;
};
/**
 * @description 根据value和type设置日历数据
 * @param value
 * value为数字时：
 *    type为month时:
 *      1-下一月,-1-上一月,
 *    type为week时:
 *      1-下一周,-1-上一周
 * value为字符串时：
 *    直接返回该字符串时间的日历数据
 * @param {'month' | 'week' } type
 * month-月模式，week-周模式
 * @example
 * -props.defaultTime：默认日期
 *
 * 获取默认日期当月的日历数据
 * changeCalendar()
 *
 * 获取默认日期上一个月的日历数据
 * changeCalendar(-1)
 *
 * 获取默认日期下一个周的日历数据
 * changeCalendar(1,'week')
 *
 * 获取2025-12-20当周(7天)的日历数据
 * changeCalendar('2025-12-20','week')
 */
function changeCalendar(value: number | string = 0, type: modeType = "month") {
  // 最终展示的日历时间点
  let date = "";
  // 最终默认时间点加的毫秒数
  let finallyStep = 0;
  // 原默认展示的日历时间点
  const defaultTime = mDefaultTime.value;
  // 转化的时间格式
  const valueFormat = props.valueFormat;
  // 一天的毫秒数
  const dayStep = 60 * 60 * 24 * 1000;

  // 获取最终展示的日历时间点
  if (typeof value == "number") {
    finallyStep = type == "month" ? value * dayStep * 30 : value * dayStep * 7;
    date = formateDate(
      new Date(defaultTime).getTime() + finallyStep,
      valueFormat
    );
    mDefaultTime.value = date;
  } else if (typeof value == "string") {
    date = formateDate(value, valueFormat);
  }
  // 获取一维日历信息
  let list = getCalendarData(date, type);
  // 日历信息转为树结构
  let treeList = toTreeCalendarData(list);
  orgData.length = 0;
  calendarData.length = 0;
  orgData.push(...list);
  calendarData.push(...treeList);
}
changeCalendar();

/**
 * @description 判断该单元格是否是禁用
 * @param data 该单元格的信息
 */
const isBanFn = (data: DayInfo): boolean => {
  let time = new Date(data.date).getTime();
  let start = new Date(props.startTime).getTime();
  let end = new Date(props.endTime).getTime();
  let isHaving = props.banTime.find((item) => new Date(item).getTime() == time);
  if (time <= start || time >= end || isHaving) {
    data.disabled = true;
    return true;
  }
  return false;
};

/**
 * @description 判断该日期是否选中
 * @param data 该单元格的信息
 */
const isSelectedFn = (data: DayInfo): boolean => {
  if (selData.find((item) => item?.date == data.date)) {
    return true;
  }
  return false;
};
/**
 * @description 日历单元格要设置的样式类
 * @param item 日历单元格数据
 */
const setCalendarItemClass = (item: DayInfo) => {
  return {
    "calendar-item": true,
    "cus-scroll": true,
    "hover-scroll": true,
    // "hidden-scroll": true,
    "pre-month": item.type == "pre",
    "next-month": item.type == "next",
    allow: !isBanFn(item),
    ban: isBanFn(item),
    selected: isSelectedFn(item),
  };
};
/**
 * @description  选择点击的日期
 * @param data 该单元格的信息
 */
const selectDayFn = (data: DayInfo) => {
  if (!data || data.disabled) return;

  // 选择时间段
  if (props.period) {
    if (selData.length == 0 || selData.length >= 2) {
      selData.length = 0;
      selData.push(data);
    } else if (selData.length == 1) {
      // 如果选中的是同一天就取消选中
      if (selData[0]?.date == data.date) return (selData.length = 0);
      selData.push(data);
      // 升序排序
      selData.sort((a, b) => {
        return (
          new Date(a?.date || "").getTime() - new Date(b?.date || "").getTime()
        );
      });
      // 筛选出在两个时间段之间,同时没有被禁止选中的元素
      let list = orgData.filter((item) => {
        let time = new Date(item.date).getTime();
        let firTime = new Date(selData[0]?.date || "").getTime();
        let secTime = new Date(selData[1]?.date || "").getTime();
        if (time > firTime && time <= secTime && !item.disabled) {
          return item;
        }
      });
      // list中包含selData中的第二个元素，所以要删除selData的第二个元素
      selData.length = 1;
      selData.push(...list);
    }
  } else {
    // 选择时间点
    // 单点模式取消日期选中

    if (selData[0]?.date == data.date) {
      selData.length = 0;
      return;
    }
    selData.length = 0;
    selData.push(data);
  }
  emits("select", selData);
};

/**
 * @description 设置日历组件的整体高度
 */
const setCalendarHeight = () => {
  props.height &&
    calendarRef.value?.style.setProperty("--height", `${props.height}px`);
};
onMounted(() => {
  setCalendarHeight();
});
watch(
  () => props.height,
  () => {
    setCalendarHeight();
  }
);
defineExpose({
  changeCalendar,
});
</script>

<style lang="scss" scoped>
@mixin border {
  border-top: 1px solid var(--el-border-color);
  border-left: 1px solid var(--el-border-color);
}
// hover及选中的样式
@mixin hover_or_selected() {
  z-index: 10;
  background-color: #ecf5ff;
  color: #79bbff;
  border-color: #79bbff;
}
.ex-calendar {
  --height: 600px;
  user-select: none;
  display: grid;
  grid-template-rows: auto 1fr;
  height: var(--height);
  .ex-calendar-table {
    border-collapse: collapse;
    border: 1px solid var(--el-border-color);
    table-layout: fixed;
    height: 100%;
    width: 100%;
    thead {
      th {
        padding: 12px 0;
        @include border();
      }
    }
    tbody {
      tr {
        td {
          @include border();
          .calendar-item {
            --tdHeight: 100px;
            box-sizing: border-box;
            // height: --tdHeight;
            height: 100%;
            overflow: scroll;
            cursor: pointer;
            padding: 8px;
          }
          .pre-month,
          .next-month {
            color: #999;
          }
          // 允许选择的hover样式
          .allow:hover {
            @include hover_or_selected();
          }
          // 选中的样式
          .selected {
            @include hover_or_selected();
          }
          // 禁止选择的样式
          .ban {
            background-color: #f4f4f5;
            cursor: not-allowed;
          }
        }
      }
    }
  }
}
</style>
