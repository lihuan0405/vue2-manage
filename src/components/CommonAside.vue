<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#426ab3"
    text-color="#fff"
    active-text-color="#e2bb07"
  >
    <!--   4.1  插值表达式（可以放简单的逻辑运算），显示不同的文字 -->
    <h3>{{ isCollapse ? "后台" : "通用后台管理" }}</h3>

    <el-menu-item
      v-for="item in noChildren"
      :index="String(item.path)"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu
      v-for="item in hasChildren"
      :index="String(item.path)"
      :key="item.path"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group
        v-for="(subitem, subindex) in item.children"
        :key="subitem.path"
      >
        <el-menu-item @click="clickMenu(subitem)" :index="String(subindex)">{{
          subitem.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

<script>
export default {
  data() {
    return {
      // //   1.  控制 侧边栏 是否展开
      // isCollapse: true,
      //  2.1  假设 meau 是后端返回来的JSON 数据
      menu: [
        // {
        //   path: "/",
        //   name: "home",
        //   label: "首页",
        //   icon: "s-home",
        //   url: "Home/Home",
        // },
        // {
        //   path: "/mall",
        //   name: "mall",
        //   label: "商品管理",
        //   icon: "video-play",
        //   url: "MallManage/MallManage",
        // },
        // {
        //   path: "/user",
        //   name: "user",
        //   label: "用户管理",
        //   icon: "user",
        //   url: "UserManage/UserManage",
        // },
        // {
        //   label: "其他",
        //   icon: "location",
        //   children: [
        //     {
        //       path: "/page1",
        //       name: "page1",
        //       label: "页面1",
        //       icon: "setting",
        //       url: "Other/PageOne",
        //     },
        //     {
        //       path: "/page2",
        //       name: "page2",
        //       label: "页面2",
        //       icon: "setting",
        //       url: "Other/PageTwo",
        //     },
        //   ],
        // },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //  3.  点击路由跳转
    clickMenu(item) {
      this.$router.push({
        name: item.name,
      });
      //  3.1 直接把 menu 的每一项都推进来了，修改了 state的数据
      this.$store.commit("selectMenu", item);
    },
  },
  // 2.  用计算属性 来渲染菜单名称
  computed: {
    noChildren() {
      return this.asyncMenu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.asyncMenu.filter((item) => item.children);
    },
    isCollapse() {
      //   4.  注意这个写法 要先写 state 再写 tab
      return this.$store.state.tab.isCollapse;
    },
    asyncMenu() {
      console.log(this.$store.state.tab.menu);
      return this.$store.state.tab.menu;
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu {
  height: 100vh;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>