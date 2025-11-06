<template>
  <div class="ex-calendar" ref="calendarRef">
    <div class="calendar-head" ref="headRef">
      <div>选中的时间:{{ modelValue }}</div>
      <div>默认展示的时间段:{{ mDefaultTime }}</div>
    </div>
    <table class="ex-calendar-table">
      <thead ref="theadRef">
        <th v-for="item in weeks" class="week-item">{{ item }}</th>
      </thead>
      <tbody ref="tbodyRef">
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
  reactive,
  useSlots,
  PropType,
  useTemplateRef,
  watch,
  onMounted,
  watchEffect,
  ref,
} from "vue";
import { useVModel } from "@vueuse/core";
import { formateDate } from "@/utils/date";
import { getCalendarData, CalendarOptions, offsetArr } from "./library/date";
import { DayInfo } from "@/types/components";

// 父组件中使用插槽即使是注释也会返回一个包含default属性的对象
// 不使用插槽时要保证父组件插槽位置不能有任何东西（注释也不行）
const slots = useSlots();
const props = defineProps({
  /**
   * @description 选中的时间
   * @param {FormateDateType}
   */
  modelValue: {
    type: [Array] as PropType<string[]>,
    default: () => new Date(),
  },
  /**
   * @description 默认要展示的月份或周的日期，格式要符合时间格式
   */
  defaultTime: {
    type: [String, Number, Date] as PropType<string | number | Date>,
    default: () => new Date(),
  },
  /**
   * @description 绑定的值的格式
   * @description
   * 组件内所有时间都会统一格式化为valueFormat的类型FormateDateType时间格式
   */
  valueFormat: {
    type: String as PropType<FormateDateType>,
    default: () => "yyyy-MM-dd",
  },
  /**
   * @description 组件整体高度
   *为月模式时，组件整体高度生效
   */
  height: {
    type: [Number],
  },
  /**
   * @description 为周模式时，单元格高度生效
   */
  cellHeight: {
    type: [Number],
  },
  /**
   * @description 显示的是一周还是一个月
   */
  mode: {
    type: String as PropType<CalendarOptions["mode"]>,
    default: "month",
  },
  /**
   * @description 周起始日：值为1-7,1为周一，7为周日
   */
  firstDayOfWeek: {
    type: Number as PropType<CalendarOptions["firstDayOfWeek"]>,
    default: 0,
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
    type: [String],
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
    type: [String],
    default: "",
  },
});

const emits = defineEmits<{
  /**
   * @description 返回选中的时间
   */
  (e: "select", value: DayInfo[]): void;
  (e: "update:modelValue", value: string[]): void;
  (e: "update:defaultTime", value: string): void;
}>();
let mValue = useVModel(props, "modelValue", emits);
mValue.value = mValue.value.map((item) => {
  return formateDate(item, props.valueFormat);
});
let mDefaultTime = useVModel(props, "defaultTime", emits);
mDefaultTime.value = formateDate(mDefaultTime.value, props.valueFormat);
const calendarRef = useTemplateRef("calendarRef");
const headRef = useTemplateRef("headRef");
const theadRef = useTemplateRef("theadRef");
const tbodyRef = useTemplateRef("tbodyRef");
let cellHeight = ref(0);
/**
 * @description 获取一个单元格的高度
 */
const getCellHeight = () => {
  const headHeight = headRef.value?.offsetHeight || 0;
  const theadHeight = theadRef.value?.offsetHeight || 48;
  const calendarHeight = props.height || 570;
  let cHeight = calendarHeight - headHeight - theadHeight;

  // const trNum = (props.cellHeight =
  cHeight = cHeight / 7;
  return cHeight;
};

const orgWeeks = ["一", "二", "三", "四", "五", "六", "日"];
let weeks = ["一", "二", "三", "四", "五", "六", "日"];
watch(
  () => props.firstDayOfWeek,
  (value) => {
    weeks = offsetArr(orgWeeks, value ? value : 0);
  },
  {
    immediate: true,
  }
);
// 通过点击选中的日期
const selData = reactive<DayInfo[]>(
  mValue.value.map((item) => {
    return {
      day: 0,
      date: item,
      type: "",
      disabled: false,
    };
  })
);
watch(selData, (value) => {
  if (value.length) {
    mValue.value = value.map((item) => item.date);
  } else {
    mValue.value = [];
  }
});
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
// 一天的毫秒数
const dayStep = 60 * 60 * 24 * 1000;
/**
 * @description 根据value和type设置日历数据
 * @param value
 * value为数字时：
 *    props.mode为month时:
 *      1-下一月,-1-上一月,
 *    props.mode为week时:
 *      1-下一周,-1-上一周
 * value为字符串时：
 *    直接返回该字符串时间的日历数据
 * @example
 * -props.defaultTime：默认日期
 * -props.mode:week-周模式，month-月模式
 * 获取默认日期当月的日历数据
 * props.mode = 'month'
 * changeCalendar()
 *
 * 获取默认日期上一个月的日历数据
 * props.mode = 'month'
 * changeCalendar(-1)
 *
 * 获取默认日期下一个周的日历数据
 * props.mode='week'
 * changeCalendar(1)
 */
function changeCalendar(value: number = 0) {
  const { mode, valueFormat, firstDayOfWeek } = props;
  const time = mDefaultTime.value;
  let date = new Date(time);
  let month = date.getMonth();
  let monthDay = date.getDate();
  if (props.mode == "month") {
    date.setMonth(month + value);
    date.setDate(monthDay);
  } else if (props.mode == "week") {
    date.setDate(monthDay + value * 7);
  }
  // 最终展示的日历时间点
  mDefaultTime.value = formateDate(date, props.valueFormat);
  // 获取一维日历信息
  let list = getCalendarData(date, {
    mode,
    days: "full",
    valueFormat,
    firstDayOfWeek,
  });
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
  if (time < start || time > end || isHaving) {
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
 * @description  选择点击的日期信息
 * @param data 点击的单元格的日历信息
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
onMounted(() => {
  cellHeight.value = getCellHeight();
  changeHeight();
});
const changeHeight = () => {
  if (props.mode == "month") {
    let height = props.height || 600;
    calendarRef.value?.style.setProperty("--height", `${height}px`);
    tbodyRef.value?.style.setProperty("--cellHeight", `initial`);
    cellHeight.value = getCellHeight();
  } else if (props.mode == "week") {
    let height = props.cellHeight || cellHeight.value;
    calendarRef.value?.style.setProperty("--height", `initial`);
    tbodyRef.value?.style.setProperty("--cellHeight", `${height}px`);
  }
  changeCalendar();
};
/**
 * @description 监听设置的表格整体高度和单元格高度
 */
watchEffect(changeHeight);

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
  --height: initial;
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
      --cellHeight: initial;
      height: var(--cellHeight);
      tr {
        td {
          @include border();
          .calendar-item {
            --tdHeight: 100px;
            box-sizing: border-box;
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
