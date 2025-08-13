<template>
  <div class="calendar-page">
    <ExCalendar v-model="value" @select="selectFn"> </ExCalendar>
  </div>
</template>
<script name="CalendarPage" setup lang="ts">
import { ref } from "vue";
let value = ref<Date>(new Date());
function selectFn(data: DayInfo[]) {
  console.log(`output->data`, data);
}
</script>
<style lang="scss" scoped>
.calendar-page {
  height: 100%;
  display: grid;
  grid-template-rows: 1fr;
}
</style>
