<template>
  <div class="ex-table" v-loading="model.loading">
    <!-- 搜索 -->
    <el-form :model="model.query" @submit.prevent="submitFn">
      <div class="query-comps">
        <template v-for="(item, index) in model.queryConfig">
          <el-form-item>
            <component
              class="query-context"
              :is="item.compsName"
              v-model="model.query[item.label]"
              :config="{ index, ...item }"
              @update="updateQueryCfgFn"
            ></component>
          </el-form-item>
        </template>
      </div>
      <div class="query-btns">
        <el-button type="primary" @click="submitFn">搜索</el-button>
      </div>
    </el-form>
    <!-- 表格 -->
    <div
      class="table-container"
      ref="tableContainer"
      v-size-ob="tableSizeChange"
    >
      <el-table :data="model.tableData" ref="table" :height="model.height">
        <!-- 表格选择列 -->
        <el-table-column
          :type="model.showSelection ? 'selection' : ''"
        ></el-table-column>
        <!-- 表格序列 -->
        <el-table-column
          :type="model.showIndex ? 'index' : ''"
          label="序号"
          width="60"
          :index="indexMethod"
        >
        </el-table-column>
        <!-- 表格内容列 -->
        <el-table-column
          v-for="(item, index) in model.columns"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :show-overflow-tooltip="model.showOverflowTooltip"
        >
          <template #default="{ row }">
            <!-- 表格内容单元格插槽 -->
            <slot
              v-if="model.colSlots.includes(item.prop)"
              :name="item.prop"
              :row="row"
            ></slot>
            <!-- 内容单元格默认显示字段 -->
            <div v-else>{{ row[item.prop] }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        ref="pagination"
        :total="model.total"
        :background="model.background"
        :layout="model.layout.join(',')"
        :current-page="model.currentPage"
        v-model:page-size="model.pageSize"
        @update:current-page="currentPageChange"
        @update:page-size="pageSizeChange"
        :page-sizes="model.pageSizes"
      ></el-pagination>
    </div>
  </div>
</template>
<script name="ExTable" setup lang="ts">
import { onMounted, PropType, useTemplateRef, watch } from "vue";
// import { getData } from "@/axios/test";
import {
  createTableConfig,
  TableConfig,
} from "@/components/ExTable/tableConfig";
import { useVModel } from "@vueuse/core";
const table = useTemplateRef("table");
const pagination = useTemplateRef("pagination");
defineExpose({
  table,
  pagination,
});

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Object as PropType<TableConfig>,
    default: () => createTableConfig(),
  },
});
const model = useVModel(props, "modelValue", emits);

onMounted(() => {});
const tableSizeChange = (rect: { width: number; height: number }) => {
  model.value.height = rect.height;
};
const submitFn = () => {
  console.log("搜素");
  // getTableData(1);
};
const getTableData = async (currentPage?: number, pageSize?: number) => {
  console.log(`output->获取表格数据`);
  if (model.value.loading) return;
  model.value.loading = true;
  model.value.currentPage = currentPage || model.value.currentPage;
  model.value.pageSize = pageSize || model.value.pageSize;
  try {
    // await getData({ a: 1 });
  } catch (error) {
    console.log("请求表格数据失败", error);
  } finally {
    model.value.loading = false;
  }
};
const currentPageChange = (value: number) => {
  getTableData(value);
};
const pageSizeChange = (value: number) => {
  getTableData(1, value);
};
const indexMethod = (index: number) => {
  return index + 1 + (model.value.currentPage - 1) * model.value.pageSize;
};
// 根据搜索列表的配置更新搜索的参数
watch(
  model.value.queryConfig,
  (newVal, _oldVal) => {
    console.log("newVal", newVal);
    let query: Record<string, any> = {};
    newVal.forEach((item) => {
      query[item.label] = item.value;
    });
    model.value.query = query;
  },
  {
    immediate: true,
    deep: true,
  }
);
const updateQueryCfgFn = () => {};
</script>

<style lang="scss" scoped>
.ex-table {
  height: 100%;
  display: grid;
  grid-template-areas:
    "el-form el-form"
    "table-container table-container"
    "pagination-container pagination-container";
  grid-template-columns: 10fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 10px;
  .el-form {
    grid-area: el-form;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .query-comps {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      padding-right: 10px;
      gap: 10px;
    }
  }
  .table-container {
    grid-area: table-container;
    overflow: auto;
  }
  .pagination-container {
    grid-area: pagination-container;
    .el-pagination {
      justify-content: end;
    }
  }
}
</style>
