<template>
  <div class="ex-form">
    <!-- :model="formData" -->
    <el-form class="form-container" ref="formContainer">
      <!-- @submit.prevent="submitFn" -->
      <DiyContainer v-model:config="containerCfg"></DiyContainer>
    </el-form>
    <!-- <div class="ex-form-btn">
      <el-button @click="submitFn" type="primary">提交</el-button>
    </div> -->
  </div>
</template>
<script name="ExForm" setup lang="ts">
import { reactive, ref } from "vue";
import { useDraggable } from "vue-draggable-plus";
import type {
  DiyFormItemType,
  DiyContainerType,
  ExFormConfigType,
} from "@/types/components";
// import { setExFormItemClass, addSelf } from "./util";
type FormData = Record<string, any>;
import cfg from "./config";
const containerCfg = ref<DiyContainerType[]>(cfg.containerCfg);

// const formContainer = ref(null);
// 容器拖拽功能
// useDraggable(formContainer, formConfig, {
//   animation: 200,
//   handle: ".diy-container",
// });
// 容器中的表单项相互之间的拖拽，不同容器之间也可以拖拽
// for (let index = 0; index < formConfig.value.length; index++) {
//   useDraggable(
//     `.drag-form-item-${index + 1}`,
//     ref(formConfig.value[index].config),
//     {
//       animation: 200,
//       group: "form-item",
//       // 拖拽结束时触发的事件
//       onEnd: (ev) => {
//         console.log(`拖拽结束`, ev);
//       },
//     }
//   );
// }
// const
// useDraggable(`.form-container`, formConfig.value[0].config, {
//   animation: 200,
// });

// 获取表单配置项中的formDate及其默认值
// const configToFormData = (
//   configData: (DiyContainerType | DiyFormItemType)[]
// ): FormData => {
//   let obj: FormData = {};
//   configData.forEach((item) => {
//     if (item.type != "DiyContainer") {
//       obj[item.field] = item.value;
//     } else if (item.config) {
//       obj = Object.assign(obj, configToFormData(item.config));
//     } else {
//       return obj;
//     }
//   });
//   return obj;
// };
// const formData = reactive(configToFormData(cfg.config));
const emitChangeFn = (e: any) => {
  console.log(`output->change`, e);
};
// const submitFn = () => {
//   console.log(`output->提交`, formData);
// };
</script>
<style lang="scss" scoped>
.ex-form {
  height: 100%;
  overflow: auto;
}
</style>
