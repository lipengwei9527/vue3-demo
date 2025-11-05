<template>
  <div class="page">
    <el-button type="primary" @click="changeMonth(-1)">上月</el-button>
    <el-button type="primary" @click="changeMonth(1)">下月</el-button>
    <el-button
      type="primary"
      @click="mode = mode == 'month' ? 'week' : 'month'"
    >
      {{ mode }}模式
    </el-button>
    <el-button type="primary" @click="period = !period">
      时间{{ period ? "段" : "点" }}
    </el-button>
    <ExCalendar
      ref="calendarRef"
      v-model="time"
      v-model:defaultTime="defaultTime"
      :mode="mode"
      :period="period"
      :height="570"
      :valueFormat="'yyyy-MM-dd'"
      :cellHeight="10"
      :startTime="pointTime + '-03'"
      :banTime="[pointTime + '-08', pointTime + '-18']"
      :endTime="pointTime + '-25'"
      :firstDayOfWeek="1"
      @select="selectFn"
    >
      <template v-slot="{ data }">
        <div>{{ data.date }}</div>
      </template>
    </ExCalendar>
  </div>
</template>
<script name="CalendarPage" setup lang="ts">
import { DayInfo } from "@/types/components";
import { formateDate } from "@/utils/date";
import { computed, ref, useTemplateRef } from "vue";
let time = ref([formateDate(new Date())]);
let defaultTime = ref(formateDate(new Date()));
let mode = ref<"week" | "month">("week");
let pointTime = computed(() => {
  let t = new Date();
  let year = t.getFullYear();
  let month = t.getMonth() + 1;
  return `${year}-${month}`;
});
function selectFn(data: DayInfo[]) {
  console.log(`selectFn->data`, data);
}
let period = ref(true);
const calendarRef = useTemplateRef("calendarRef");
const changeMonth = (value: number) => {
  calendarRef.value?.changeCalendar(value);
};
</script>
<style lang="scss" scoped>
.calendar-page {
  height: 100%;
  display: grid;
  grid-template-rows: 1fr;
}
</style>
