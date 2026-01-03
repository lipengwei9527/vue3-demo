<template>
  <div class="page">
    <svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10,10 100,10 100,50 190,50"
        fill="none"
        stroke="black"
        stroke-width="5"
        marker-end="url(#arrow1)"
      ></path>
      <defs>
        <!-- 箭头 -->
        <marker
          id="arrow1"
          viewBox="0 0 20 20"
          refX="10"
          refY="10"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 20,10 L 0 20" />
        </marker>
      </defs>
    </svg>
  </div>
</template>
<script name="SvgPage" setup lang="ts"></script>
<style lang="scss" scoped></style>
