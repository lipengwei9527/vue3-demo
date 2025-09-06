<template>
  <div class="ex-table" v-loading="model.loading">
    <!-- 搜索 -->
    <el-form
      v-size-ob="querySizeChange"
      v-if="model.queryConfig.length"
      :model="model.query"
      @submit.prevent="submitFn"
    >
      <div class="query-comps" ref="queryComps">
        <template v-for="(item, index) in model.queryConfig">
          <el-form-item>
            <component
              class="query-context"
              :is="item.compsName"
              v-model="model.query[item.label]"
              :config="{ index, ...item }"
            ></component>
          </el-form-item>
        </template>
      </div>
      <div class="query-btns">
        <el-button type="primary" @click="submitFn">搜索</el-button>
      </div>
    </el-form>
    <!-- 表格 -->
    <div class="table-container" ref="tableContainer">
      <el-table :data="model.tableData" ref="table" :height="tableHeight">
        <!-- 表格选择列 -->
        <el-table-column
          v-if="model.showSelection"
          type="selection"
        ></el-table-column>
        <!-- 表格序列 -->
        <el-table-column
          v-if="model.showIndex"
          type="index"
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
import { onMounted, PropType, useTemplateRef, watch, ref, computed } from "vue";
import xhr from "@/axios";
import {
  createTableConfig,
  TableConfig,
} from "@/components/ExTable/tableConfig";
import { useVModel } from "@vueuse/core";
const tableRef = useTemplateRef("table");
const paginationRef = useTemplateRef("pagination");
const queryCompsRef = useTemplateRef<HTMLDivElement>("queryComps");
defineExpose({
  tableRef,
  paginationRef,
});

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Object as PropType<TableConfig>,
    default: () => createTableConfig(),
  },
});
const model = useVModel(props, "modelValue", emits);
/**
 * @description 搜索栏一行最多有几个组件
 */
const setQueryCol = () => {
  // 搜索栏一行最多有几个组件
  let maxCol = 3;
  let col = model.value.queryConfig.length;
  col = col > maxCol ? maxCol : col;
  queryCompsRef.value?.style.setProperty("--col", col.toString());
};
onMounted(() => {
  setQueryCol();
});
const queryHeight = ref(0);
const tableHeight = computed(() => {
  // 分页高度32px
  return model.value.height - queryHeight.value - 32;
});
const querySizeChange = (rect: { width: number; height: number }) => {
  console.log("hegith");
  queryHeight.value = rect.height;
};
/**
 * @description 点击搜索按钮
 */
const submitFn = () => {
  getTableData(1);
  console.log("搜素", model.value.query);
};
/**
 *@description 调用接口获取字典数据
 */
const getDictApi = async (params?: object) => {
  return [];
  return xhr.post(model.value.tableApi, params);
};
getDictApi();
/**
 *@description 调用接口获取表格数据
 */
const getTableApi = async (params?: object) => {
  return [params];
  // return xhr.post(model.value.tableApi, params);
};
/**
 * @description 获取表格中的数据
 * @param currentPage
 * @param pageSize
 */
const getTableData = async (currentPage?: number, pageSize?: number) => {
  if (model.value.loading) return;
  model.value.loading = true;

  currentPage = currentPage || model.value.currentPage;
  model.value.currentPage = currentPage;
  pageSize = pageSize || model.value.pageSize;
  model.value.pageSize = pageSize;
  try {
    // 使用本地数据
    if (model.value.useLocal) {
      model.value.tableData = model.value.localData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      );
      return;
    }
    await getTableApi();
  } catch (error) {
    console.log("请求表格数据失败", error);
  } finally {
    model.value.loading = false;
  }
};

/**
 * @description 当前页改变
 * @param value 当前页的页数
 */
const currentPageChange = (value: number) => {
  getTableData(value);
};
/**
 * @description 表格一页显示的数量改变
 * @param value 当前页一共显示的数据的条数
 */
const pageSizeChange = (value: number) => {
  getTableData(1, value);
};
/**
 * @description 表格序列号
 * @param index
 */
const indexMethod = (index: number) => {
  return index + 1 + (model.value.currentPage - 1) * model.value.pageSize;
};
// 根据搜索列表的配置更新搜索的参数
watch(
  model.value.queryConfig,
  (newVal, _oldVal) => {
    let query: Record<string, any> = {};
    newVal.forEach((item) => {
      query[item.label] = item.value;
    });
    // 点击搜索抛出的搜索参数数据
    model.value.query = query;
    setQueryCol();
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style lang="scss" scoped>
.ex-table {
  // height: 100%;
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
      --col: 5;
      flex: 1;
      display: grid;
      grid-template-columns: repeat(var(--col), 1fr);
      gap: 10px;
      padding-right: 10px;
      .el-form-item {
        flex: 1;
        min-width: 200px;
        :deep(.el-form-item__content > *) {
          flex: 1;
        }
      }
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
