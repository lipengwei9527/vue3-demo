<template>
  <div class="page" v-size-ob="sizeChange">
    <ExTable ref="table" v-model="tableCfg">
      <template #dyn_id="{ row }">
        {{ row.dyn_id }}
      </template>
    </ExTable>
  </div>
</template>
<script name="TablePage" setup lang="ts">
import { createTableConfig } from "@/components/ExTable/tableConfig";
const tableCfg = createTableConfig({
  queryConfig: [
    { label: "label1", value: "value1", compsName: "ExInput" },
    { label: "label2", value: "value2", compsName: "ExInput" },
    { label: "label3", value: "value3", compsName: "ExInput" },
    { label: "label4", value: "value4", compsName: "ExInput" },
    { label: "label5", value: "value5", compsName: "ExInput" },
  ],
  columns: [
    { prop: "name", label: "姓名" },
    { prop: "age", label: "年龄" },
  ],
});
const sizeChange = (rect: Rect) => {
  tableCfg.value.height = rect.height;
};
</script>
<style lang="scss" scoped></style>
