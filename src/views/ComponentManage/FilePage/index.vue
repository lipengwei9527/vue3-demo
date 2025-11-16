<template>
  <div class="page">
    <div class="h3">单文件上传：</div>
    <input ref="fileInput" type="file" id="fileInput" @change="changeFn" />
    <el-button @click="singleBtn">上传</el-button>

    <div>base64上传：</div>
    <input ref="base64FileInput" type="file" id="base64FileInput" />
    <el-button type="primary" @click="base64Btn"> 上传 </el-button>
    <div>二进制上传：</div>
    <input ref="binaryFileInput" type="file" id="binaryFileInput" />
    <el-button @click="binaryBtn">上传</el-button>
    <FormData></FormData>
  </div>
</template>
<script name="FilePage" setup lang="ts">
import { useTemplateRef } from "vue";
import { uploadFormData, uploadBase64, uploadBinary } from "@/axios/file";
import { cutFile } from "@/utils/file";
import FormData from "./components/FormData.vue";
const fileInput = useTemplateRef("fileInput");
const base64FileInput = useTemplateRef("base64FileInput");
const binaryFileInput = useTemplateRef("binaryFileInput");
const changeFn = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  console.log(file);
  if (!file) return;
  const res = await cutFile(file);
  console.log(res);
};
// const fileInputList = ref<File[]>([]);
const singleBtn = async () => {
  const file = fileInput.value?.files?.[0];
  if (!file) return;
  uploadFormData(file)
    .then((res) => {
      console.log(`output->res`, res);
    })
    .catch((error) => {
      console.log(`output->error`, error);
    });
};
const base64Btn = async () => {
  const file = base64FileInput.value?.files?.[0];
  if (!file) return;
  uploadBase64(file);
};
const binaryBtn = async () => {
  const file = binaryFileInput.value?.files?.[0];
  if (!file) return;
  uploadBinary(file);
};
</script>
<style lang="scss" scoped></style>
