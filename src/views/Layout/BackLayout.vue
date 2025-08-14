<template>
  <div class="back-layout">
    <div class="nav-bar">
      <ExMenu
        mode="horizontal"
        type="navMenus"
        :data="navMenus.menus"
        :defaultActive="navMenus.activeIndex"
        @select="selectNavFn"
      ></ExMenu>
    </div>
    <ExMenu
      class="side-bar"
      mode="vertical"
      type="sideMenus"
      :data="sideMenus.menus"
      :defaultActive="sideMenus.activeIndex"
      :defaultOpeneds="sideMenus.openedMenus"
      @select="selectFn"
    ></ExMenu>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script setup name="BackLayout" lang="ts">
import { useCustomRouter } from "@/utils/dealRoute";
import { useAppStore } from "@/store/app";
import { computed } from "vue";
const appStore = useAppStore();
const sideMenus = computed(() => appStore.sideMenus);
const navMenus = computed(() => appStore.navMenus);
const { navigateTo } = useCustomRouter();
navigateTo(sideMenus.value.activeIndex);
// 跳转路由
const selectNavFn = (key: string) => {
  console.log(`output->selectNavFn`, key);
  appStore.setSideMenus(key);
};
const selectFn = (key: string) => {
  console.log(`output->selectNavFn`, key);
  navigateTo(key);
};
</script>

<style lang="scss" scoped></style>
