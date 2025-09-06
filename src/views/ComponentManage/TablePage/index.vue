<template>
  <div class="table-page">
    <!-- <el-button>getInfo</el-button> -->
    <ExTable ref="table" v-model="tableCfg">
      <template #dyn_id="{ row }">
        {{ row.dyn_id }}
      </template>
    </ExTable>
  </div>
</template>
<script name="TablePage" setup lang="ts">
import { onMounted, ref } from "vue";
import { createTableConfig } from "@/components/ExTable/tableConfig";

const tableCfg = ref(
  createTableConfig({
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
  })
);
// const table = useTemplateRef("table");
onMounted(() => {
  // console.log(`output->table.value  `, table.value);
});
</script>
<style lang="scss" scoped>
.table-page {
  height: 100%;
  overflow: auto;
}
</style>
