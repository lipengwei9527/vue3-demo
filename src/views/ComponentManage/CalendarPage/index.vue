<template>
  <div class="calendar-page">
    <!-- <ExCalendar v-model="value" @select="selectFn"> </ExCalendar> -->
    日历组件使用页
  </div>
</template>
<script name="CalendarPage" setup lang="ts">
// import { useTemplateRef } from "vue";
// let value = useTemplateRef(new Date());
// function selectFn(data: DayInfo[]) {
//   console.log(`output->data`, data);
// }
</script>
<style lang="scss" scoped>
.calendar-page {
  height: 100%;
  display: grid;
  grid-template-rows: 1fr;
}
</style>
