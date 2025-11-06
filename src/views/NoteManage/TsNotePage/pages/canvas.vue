<template>
  <div class="canvas-page">
    <canvas ref="cvs"></canvas>
  </div>
</template>
<script name="canvasPage" setup lang="ts">
import { useTemplateRef, onMounted } from "vue";
const cvs = useTemplateRef("cvs");

const initCvs = () => {
  if (!cvs.value) return;
  const ctx = cvs.value.getContext("2d");
  cvs.value.width = 900;
  cvs.value.height = 500;
  // cvs.value.style.width = "900px";
  // cvs.value.style.height = "500px";
  cvs.value.style.border = "1px solid black";
  if (!ctx) return;
  ctx.beginPath();
  ctx.arc(50, 50, 20, Math.PI / 2, -(Math.PI / 3));
  ctx.stroke();
};
onMounted(() => {
  initCvs();
});
</script>
<style lang="scss" scoped></style>
