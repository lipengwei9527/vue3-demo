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
import { getTableConfig } from "@/components/ExTable/tableConfig";

const tableCfg = ref({
  ...getTableConfig(),
  api: "123",
  query: {
    form: 1,
  },
});
// const table = useTemplateRef("table");
onMounted(() => {
  // console.log(`output->table.value  `, table.value);
});
</script>
<style lang="scss" scoped>
.table-page {
  height: 100%;
}
</style>
