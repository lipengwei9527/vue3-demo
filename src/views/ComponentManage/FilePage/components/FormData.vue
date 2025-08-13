<template>
  <div class="form-data">
    <el-button @click="download" type="primary">下载文件</el-button>
  </div>
</template>
<script name="FormData" setup lang="ts">
const download = () => {
  const context = "hello  world";
  const blob = new Blob([context], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "hello.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
</script>
<style lang="scss" scoped></style>
