<template>
  <div class="page">
    <ExTable ref="table" v-model="tableCfg"> </ExTable>
    <!-- <template #dyn_id="{ row }">
        {{ row.dyn_id }}
      </template> -->
  </div>
</template>
<script name="TablePage" setup lang="ts">
import { createTableConfig } from "@/components/ExTable/tableConfig";
const tableCfg = createTableConfig({
  queryConfig: [
    { label: "label1", defaultValue: "", compsName: "ExInput" },
    { label: "label2", defaultValue: "", compsName: "ExInput" },
    { label: "label3", defaultValue: "", compsName: "ExInput" },
    // { label: "label4", value: "value4", compsName: "ExInput" },
    // { label: "label5", value: "value5", compsName: "ExInput" },
  ],
  columns: [
    { prop: "name", label: "姓名" },
    { prop: "age", label: "年龄" },
  ],
});
</script>
<style lang="scss" scoped></style>
