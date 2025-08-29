<template>
  <div class="form-main">
    <ExForm v-model:formConfig="formCfg"></ExForm>
  </div>
</template>
<script name="FormMain" setup lang="ts">
import { defineProps, PropType, ref } from "vue";
import { DiyContainerType } from "@/types/components";
import { useVModel } from "@vueuse/core";
const props = defineProps({
  formConfig: {
    type: Array as PropType<DiyContainerType[]>,
    required: true,
  },
});
// const emits = defineEmits<{
//   (e: "update:formConfig"): void;
// }>();
// const formCfg = useVModel(props, "formConfig", emits);
const formCfg = ref<DiyContainerType[]>(props.formConfig);
</script>
<style lang="scss" scoped></style>
