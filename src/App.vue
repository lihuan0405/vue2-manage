<template>
  <div id="app">
    <router-link to="/main"></router-link>
    <!-- 路由占位符 -->
    <router-view> </router-view>
  </div>
</template>

<script>
import Main from "./components/Main.vue";

export default {
  name: "App",
  component: {
    Main,
  },
};
</script>

<style>
/*  1.  去除白边 */
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
  /* overflow-y: hidden; */
}
</style>
