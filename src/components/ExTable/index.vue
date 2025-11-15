<template>
  <div class="ex-table" v-loading="model.loading">
    <!-- 搜索 -->
    <el-form
      v-if="model.queryConfig.length"
      v-size-ob="(rect:Rect) => sizeChange(rect)"
      :model="model.query"
      @submit.prevent="submitFn"
    >
      <div class="query-comps">
        <template v-for="(item, index) in model.queryConfig">
          <el-form-item>
            <component
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
    <el-table :data="model.tableData" :max-height="tableHeight">
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
    <!-- 分页 -->
    <el-pagination
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
</template>
<script name="ExTable" setup lang="ts">
import { PropType, watch, ref } from "vue";
import xhr from "@/axios";
import {
  createTableConfig,
  type TableConfig,
} from "@/components/ExTable/tableConfig";
import { useVModel } from "@vueuse/core";
const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Object as PropType<TableConfig>,
    default: () => createTableConfig(),
  },
});
const model = useVModel(props, "modelValue", emits);
const tableHeight = ref(0);
const sizeChange = (rect: Rect) => {
  tableHeight.value = model.value.maxHeight - rect.offsetHeight;
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
  () => model.value.queryConfig,
  (newVal, _oldVal) => {
    let query: Record<string, any> = {};
    newVal.forEach((item) => {
      query[item.label] = item.defaultValue;
    });
    // 点击搜索抛出的搜索参数数据
    model.value.query = query;
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style lang="scss" scoped>
.ex-table {
  display: grid;
  grid-template-areas:
    "el-form el-form"
    "el-table el-table"
    "el-pagination el-pagination";
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr auto;
  .el-form {
    grid-area: el-form;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .query-comps {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 10px;
      padding-right: 10px;
      .el-form-item {
        :deep(.el-form-item__content > *) {
          flex: 1;
        }
      }
    }
  }
  .el-table {
    grid-area: el-table;
  }
  .el-pagination {
    grid-area: el-pagination;
    justify-content: flex-end;
    padding: 10px 0;
  }
}
</style>
