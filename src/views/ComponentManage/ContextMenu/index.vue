<template>
  <div class="us-context-menu">
    <ex-context-menu
      :menu="[{ label: '菜单1' }, { label: '菜单2' }]"
      @select="select"
    >
      <div class="item box1">111</div>
    </ex-context-menu>
    <ex-context-menu
      @select="select"
      :menu="[{ label: '菜单3' }, { label: '菜单4' }]"
    >
      <div class="item box2">222</div>
    </ex-context-menu>
    <ex-context-menu
      @select="select"
      :menu="[{ label: '菜单5' }, { label: '菜单6' }, { label: '菜单7' }]"
    >
      <div class="item box3">
        333
        <ex-context-menu
          @select="select"
          :menu="[{ label: '菜单8' }, { label: '菜单9' }, { label: '菜单10' }]"
        >
          <div class="box4">444</div>
        </ex-context-menu>
      </div>
    </ex-context-menu>
  </div>
</template>

<script setup name="ContextMenu" lang="ts">
function select<T>(item: T) {
  console.log(item);
}
</script>

<style lang="scss" scoped>
.us-context-menu {
  display: flex;
  justify-content: space-between;
  height: 100%;

  .ex-context-menu {
    flex: 1;
  }

  .item {
    height: 100%;
  }

  .box1 {
    background-color: red;
  }

  .box2 {
    background-color: green;
  }

  .box3 {
    background-color: blue;
  }

  .box4 {
    width: 50px;
    height: 50px;
    background-color: yellow;
  }
}
</style>
