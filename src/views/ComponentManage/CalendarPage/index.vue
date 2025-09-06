<template>
  <div class="page">
    <ExCalendar
      v-model="value"
      mode="month"
      :height="600"
      period
      :cellHeight="24"
      :start-time="'2025-09-01'"
      :ban-time="['2025-09-10']"
      :end-time="'2025-09-20'"
      @select="selectFn"
    >
    </ExCalendar>
    <!-- <template v-slot="{ data }">
    {{ data.day }}
  </template> -->
  </div>
</template>
<script name="CalendarPage" setup lang="ts">
import { DayInfo } from "@/types/components";
import { ref } from "vue";
let value = ref(new Date());
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
