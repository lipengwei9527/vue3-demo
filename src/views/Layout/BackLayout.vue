<template>
  <div class="back-layout">
    <div class="nav-bar">
      <ExMenu
        mode="horizontal"
        :data="topMenus.menus"
        :defaultActive="topMenus.activeIndex"
        @select="selectTopFn"
      ></ExMenu>
    </div>
    <ExMenu
      class="side-bar"
      mode="vertical"
      :data="sideMenus.menus"
      :defaultActive="sideMenus.activeIndex"
      :defaultOpeneds="sideMenus.openedMenus"
      @select="selectSideFn"
    ></ExMenu>
    <div class="main">
      <router-view> </router-view>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script setup name="BackLayout" lang="ts">
import { CreateRouterManager } from "@/utils/dealRoute";
import { useAppStore } from "@/store/app";
import { computed } from "vue";

const appStore = useAppStore();
const topMenus = computed(() => appStore.topMenus);
const sideMenus = computed(() => appStore.sideMenus);

// 跳转路由
const routerManager = new CreateRouterManager();

const selectTopFn = (index: string) => {
  appStore.setTopActiveIndex(index);
  appStore.setSideMenus(index);
};
const selectSideFn = (index: string) => {
  appStore.setSideActiveIndex(index);
  routerManager.navigateTo(index);
};
</script>
<style lang="scss" scoped></style>
