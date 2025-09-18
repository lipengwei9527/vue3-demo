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
  reactive,
  useSlots,
  PropType,
  useTemplateRef,
  watch,
  onMounted,
  defineExpose,
} from "vue";
import { useVModel } from "@vueuse/core";
import { formateDate } from "@/utils/date";
import moment from "moment";
import { getCalendarData } from "./library/date";
import { DayInfo } from "@/types/components";

// 父组件中使用插槽即使是注释也会返回一个包含default属性的对象
// 不使用插槽时要保证父组件插槽位置不能有任何东西（注释也不行）
const slots = useSlots();
const props = defineProps({
  // 要展示的时间
  modelValue: {
    type: [Date, String],
    default: () => new Date(),
  },
  // 组件整体高度
  height: {
    type: [Number],
  },
  // 日历单元格高度
  cellHeight: {
    type: [Number],
    default: () => 400,
  },
  /**
   * 显示的是一周还是一个月
   */
  mode: {
    type: String as PropType<"month" | "week">,
    default: "month",
  },
  // 选择的是时间段还是时间点:true-时间段，false-时间点
  period: {
    type: Boolean,
    default: false,
  },
  // 禁止选择的开始时间
  startTime: {
    type: [String, Date],
    default: "",
  },
  // 可以选的的时间段中不可选择的时间
  banTime: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  // 禁止选择的结束时间
  endTime: {
    type: [String, Date],
    default: "",
  },
});

const emits = defineEmits(["select", "update:modelValue"]);
let modelValue = useVModel(props, "modelValue", emits);
const calendarRef = useTemplateRef("calendar");
// const theadRef = useTemplateRef("head");
// const headRef = useTemplateRef("thead");
// const tbodyRef = useTemplateRef("tbody");
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
 * @description 切换日历月份
 * @param value 当前月份的上一个月还是下一个月
 * @param type month
 */
const changeMonth = (
  value: number = 0,
  type: moment.DurationInputArg2 = "month"
) => {
  // modelValue.value月份的往前或往后value时间的月份
  const date = formateDate(
    moment(modelValue.value).subtract(value, type).toString(),
    "YYYY-MM"
  );
  modelValue.value = date;
  orgData.length = 0;
  orgData.push(...getCalendarData(date));
  calendarData.length = 0;
  calendarData.push(...toTreeCalendarData(orgData));
};
changeMonth();

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
  changeMonth,
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
