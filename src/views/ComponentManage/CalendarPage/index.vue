<template>
  <div class="page">
    <el-button type="primary" @click="changeMonth(1)">上月</el-button>
    <el-button type="primary" @click="changeMonth(-1)">下月</el-button>
    <el-button type="primary" @click="period = !period">点/段</el-button>

    <ExCalendar
      ref="calendarRef"
      v-model="value"
      mode="month"
      :period="period"
      :height="570"
      :cellHeight="24"
      :start-time="'2025-09-01'"
      :ban-time="['2025-09-10']"
      :end-time="'2025-09-20'"
      @select="selectFn"
    >
      <template v-slot="{ data }">
        <div>{{ data.day }}</div>
        <div>{{ data.day }}</div>
        <div>{{ data.day }}</div>
        <div>{{ data.day }}</div>
        <div>{{ data.day }}</div>
        <div>{{ data.day }}</div>
        <div>{{ data.day }}</div>
        <div>{{ data.day }}</div>
        <div>{{ data.day }}</div>
        <div>{{ data.day }}</div>
        <div>{{ data.day }}</div>
      </template>
    </ExCalendar>
  </div>
</template>
<script name="CalendarPage" setup lang="ts">
import { DayInfo } from "@/types/components";
import { ref, useTemplateRef } from "vue";
let value = ref(new Date());
function selectFn(data: DayInfo[]) {
  console.log(`output->data`, data);
}
let period = ref(true);
const calendarRef = useTemplateRef("calendarRef");
const changeMonth = (value: number) => {
  calendarRef.value?.changeMonth(value);
};
</script>
<style lang="scss" scoped>
.calendar-page {
  height: 100%;
  display: grid;
  grid-template-rows: 1fr;
}
</style>
