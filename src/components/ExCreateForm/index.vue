<template>
  <div class="ex-create-form">
    <FormTopBar></FormTopBar>
    <FormSideBar></FormSideBar>
    <FormMain></FormMain>
    <FormFooter></FormFooter>
  </div>
</template>
<script name="ExCreateForm" setup lang="ts">
import FormSideBar from "./components/FormSideBar.vue";
import FormTopBar from "./components/FormTopBar.vue";
import FormMain from "./components/FormMain.vue";
import FormFooter from "./components/FormFooter.vue";
</script>
<style lang="scss" scoped></style>
