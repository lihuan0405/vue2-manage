<template>
  <div>
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
      class="login-container"
    >
      <h3 class="login_title">后台系统登录</h3>
      <el-form-item
        label="用户名"
        label-width="80px"
        prop="username"
        class="username"
        ><el-input
          type="input"
          v-model="form.username"
          auto-complete="off"
          placeholder="请输入用户名"
        ></el-input
      ></el-form-item>
      <el-form-item label="密码" label-width="80px" prop="password"
        ><el-input
          type="password"
          v-model="form.password"
          auto-complete="off"
          placeholder="请输入密码"
        ></el-input
      ></el-form-item>
      <el-form-item class="login_submit">
        <el-button type="primary" @click="login" class="login_submit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import Mock from "mockjs";
import { getMenu } from "../api/data.js";
export default {
  data() {
    return {
      form: {},
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 3,
            message: "用户名格式不正确，不得小于3个字符",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      //   4.2  调用接口 根据身份信息获取不同菜单栏展示
      getMenu(this.form).then((res) => {
        console.log(res, "res");
        console.log("this.$router", this.$router);
        if (res.code === 20000) {
          //   console.log("hhh");
          this.$store.commit("clearMenu");
          this.$store.commit("setMenu", res.data.menu);
          this.$store.commit("setToken", res.data.token);
          this.$store.commit("addMenu", this.$router);
          this.$router.push({ name: "home" });
        } else {
          this.$message.warning(res.data.message);
        }
      });
      //  4.  随机生成一串数字
      //   const token = Mock.random.guid();
      //   this.$store.commit("setToken", token);
      //   this.$router.push({ name: "home" });
    },
  },
};
</script>

<style lang="less" scoped>
// body {
//   background-color: pink;
// }
.login-container {
  border-radius: 15px;
  // //    1.   背景 裁剪的内边距
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  h3 {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #505458;
  }
}
.login_submit {
  margin: 10px auto 0 auto;
}
</style>