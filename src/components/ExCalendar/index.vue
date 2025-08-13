<template>
  <div class="ex-calendar">
    <div>
      <el-button type="primary" @click="changeModelValue(1)">上月</el-button>
      <el-button type="primary" @click="changeModelValue(-1)">下月</el-button>
    </div>
    <div class="calendar-head">{{ modelValue }}</div>
    <table class="ex-calendar-table">
      <thead>
        <th v-for="item in weeks" class="week-item">{{ item }}</th>
      </thead>
      <tbody>
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
import { reactive, useSlots, PropType } from "vue";
import { getCalendarData } from "./library/date";
import { useVModel } from "@vueuse/core";
import { formateDate } from "@/utils/date";
import moment from "moment";
// 父组件中使用插槽即使是注释也会返回一个包含default属性的对象
// 不使用插槽时要保证父组件插槽位置不能有任何东西（注释也不行）
const slots = useSlots();
const props = defineProps({
  // 要展示的月份的时间
  modelValue: {
    type: [Date, String],
    default: () => new Date(),
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

const weeks = ["一", "二", "三", "四", "五", "六", "日"];
const selected = reactive<DayInfo[]>([]);
// 要渲染的日历数据
let calendarData = reactive<DayInfo[][]>([]);
const setCalendarItemClass = (item: DayInfo) => {
  return {
    "calendar-item": true,
    "pre-month": item.type == "pre",
    "next-month": item.type == "next",
    allow: !isBanFn(item),
    ban: isBanFn(item),
    selected: isSelectedFn(item),
  };
};
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
const changeModelValue = (
  value: number = 0,
  type: moment.DurationInputArg2 = "month"
) => {
  // modelValue.value月份的往前或往后value时间的月份
  const date = formateDate(
    moment(modelValue.value).subtract(value, type).toString(),
    "YYYY-MM"
  );
  modelValue.value = date;
  calendarData.length = 0;
  calendarData.push(...toTreeCalendarData(getCalendarData(date)));
};
changeModelValue();

// 该日是否不可选择
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

// 判断该日期是否选中
const isSelectedFn = (data: DayInfo): boolean => {
  if (selected.find((item) => item.date == data.date)) {
    return true;
  }
  return false;
};
// 选择点击的日期
const selectDayFn = (data: DayInfo) => {
  if (data.disabled) return;
  if (selected.length != 0 && selected.find((item) => item.date == data.date)) {
    selected.length = 0;
    return;
  }
  selected.length = 0;
  selected.push(data);
  emits("select", selected);
};
</script>

<style lang="scss" scoped>
@mixin border {
  border-top: 1px solid var(--el-border-color);
  border-left: 1px solid var(--el-border-color);
}
// hover及选中的样式
@mixin hover_and_selected() {
  z-index: 10;
  background-color: #ecf5ff;
  color: #79bbff;
  border-color: #79bbff;
}
.ex-calendar {
  user-select: none;
  display: grid;
  grid-template-rows: auto auto 1fr;
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
            height: 100%;
            overflow: scroll;
            cursor: pointer;
            padding: 8px;
            &::-webkit-scrollbar {
              width: 4px;
              height: 4px;
              padding: 0 4px;
            }
          }
          .pre-month,
          .next-month {
            color: #999;
          }
          // 允许选择的hover样式
          .allow:hover {
            @include hover_and_selected();
          }
          // 选中的样式
          .selected {
            @include hover_and_selected();
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
