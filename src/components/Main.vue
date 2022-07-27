<template>
  <div>
    <el-container style="height: 100%">
      <el-aside width="auto"><common-aside></common-aside></el-aside>
      <el-container>
        <el-header> <common-header></common-header> </el-header>
        <common-tag></common-tag>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "./CommonAside.vue";
import CommonHeader from "./CommonHeader.vue";
import CommonTag from "./CommonTag.vue";
export default {
  name: "MyHome",
  components: { CommonAside, CommonHeader, CommonTag },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.el-header {
  // position: relative;
  // height: 60px;
  background-color: #295cab;
}
// .el-aside {
//   display: block;
//   position: absolute;
//   left: 0;
//   top: 0;
//   bottom: 0;
// }
// .el-main {
//   overflow-y: scroll;
// }
.el-main {
  padding-top: 0;
}
</style>