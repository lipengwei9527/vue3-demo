<template>
  <div class="ex-dialog">
    <el-dialog
      :model-value="visiable"
      title="Tips"
      width="500"
      :before-close="beforeCloseFn"
    >
      <span>This is a message</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="modelVisiable = false">Cancel</el-button>
          <el-button type="primary" @click="modelVisiable = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script name="ExDialog" setup lang="ts">
import { DoneFn } from "@/types/elementPlus";
import { useVModel } from "@vueuse/core";
const props = defineProps({
  visiable: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits<{
  (e: "update:visiable"): void;
  (e: "beforeClose", value: DoneFn): void;
}>();
const modelVisiable = useVModel(props, "visiable", emits);
const beforeCloseFn = (doneFn: DoneFn) => {
  emits("beforeClose", doneFn);
};
</script>
<style lang="scss" scoped></style>
