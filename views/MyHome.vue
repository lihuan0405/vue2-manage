<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="useImg" alt="" />
          <div class="userinfo">
            <p class="name">Cherry</p>
            <p class="access">管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间 <span>2022</span></p>
          <p>上次登录地点 <span>四川成都</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 456px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            v-for="(val, index) in tableLabel"
            :key="index"
            :prop="index"
            :label="val"
          >
          </el-table-column
        ></el-table>
      </el-card>
    </el-col>
    <el-col style="margin-top: 20px" :span="16">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <!-- 4.  ES6 模板字符串拼接 -->
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <Echarts style="height: 280px" :char-data="echartData.order"></Echarts>
        <!-- <div style="height: 280px" ref="echart"></div> -->
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <Echarts style="height: 240px" :char-data="echartData.user"></Echarts>
          <!-- <div style="height: 260px" ref="userEcharts"></div> -->
        </el-card>
        <el-card style="height: 260px">
          <Echarts
            style="height: 240px"
            :char-data="echartData.video"
            :is-axis-chart="false"
          ></Echarts>
          <!-- <div style="height: 240px" ref="vedioEcharts"></div> -->
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getHome } from "../api/data.js";
//  3. 一次性全部导入模块的全部变量就可以使用
// import * as echarts from "echarts";
//  5.  调用封装好的 my-echarts 组件
import Echarts from "@/components/MyEcharts.vue";

export default {
  components: { Echarts },
  data() {
    return {
      useImg: require("../src/assets/images/user.jpg"),
      // tableData: [
      //   {
      //     name: "oppo",
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800,
      //   },
      //   {
      //     name: "vivo",
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800,
      //   },
      //   {
      //     name: "苹果",
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800,
      //   },
      //   {
      //     name: "小米",
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800,
      //   },
      //   {
      //     name: "三星",
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800,
      //   },
      //   {
      //     name: "魅族",
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800,
      //   },
      // ],
      tableData: [],
      tableLabel: {
        name: "手机型号",
        todayBuy: "今日购买",
        monthBuy: "今月购买",
        totalBuy: "共计",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  mounted() {
    //  3.  调用 data.js 里面封装好的接口
    getHome().then((res) => {
      const { code, data } = res;
      // console.log(data);
      if (code == 20000) {
        this.tableData = data.tableData;
        const order = data.orderData;
        const xData = order.date;
        // 3.1 得到了所有品牌的名字 就是属性值
        const keyArray = Object.keys(order.data[0]);
        const series = [];
        //  3.2 这里key就是品牌名
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });
        //  4.  组装 option 的值  不封装组件的话
        // const option = {
        //   xAxis: {
        //     data: xData,
        //   },
        //   yAxis: {},
        //   legend: {
        //     data: keyArray,
        //   },
        //   series,
        //   tooltip: {},
        // };
        // const E = echarts.init(this.$refs.echart);
        // E.setOption(option);

        this.echartData.order.xData = xData;
        this.echartData.order.series = series;

        //  2.  下方柱状图
        // const userOption = {
        //   legend: {
        //     // 图例文字颜色
        //     textStyle: {
        //       color: "#333",
        //     },
        //   },
        //   grid: {
        //     left: "20%",
        //   },
        //   // 提示框
        //   tooltip: {
        //     trigger: "axis",
        //   },
        //   xAxis: {
        //     type: "category", // 类目轴
        //     data: data.userData.map((item) => item.date),
        //     axisLine: {
        //       lineStyle: {
        //         color: "#17b3a3",
        //       },
        //     },
        //     axisLabel: {
        //       interval: 0,
        //       color: "#333",
        //     },
        //   },
        //   yAxis: [
        //     {
        //       type: "value",
        //       axisLine: {
        //         lineStyle: {
        //           color: "#333",
        //         },
        //       },
        //     },
        //   ],
        //   color: ["skyblue", "#b6a2de"],
        //   series: [
        //     {
        //       name: "新增用户",
        //       data: data.userData.map((item) => item.new),
        //       type: "bar",
        //     },
        //     {
        //       name: "活跃用户",
        //       data: data.userData.map((item) => item.active),
        //       type: "bar",
        //     },
        //   ],
        // };
        // const userE = echarts.init(this.$refs.userEcharts);
        // userE.setOption(userOption);

        this.echartData.user.xData = data.userData.map((item) => item.date);
        this.echartData.user.series = [
          {
            name: "新增用户",
            data: data.userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: data.userData.map((item) => item.active),
            type: "bar",
          },
        ];

        //  3.  下方饼图
        // const videoOption = {
        //   tooltip: {
        //     trigger: "item",
        //   },
        //   color: [
        //     "#0f78f4",
        //     "#dd536b",
        //     "#9462e5",
        //     "#a6a6a6",
        //     "#e1bb22",
        //     "#39c362",
        //     "#3ed1cf",
        //   ],
        //   series: [
        //     {
        //       type: "pie",
        //       data: data.videoData,
        //     },
        //   ],
        // };
        // const vedioE = echarts.init(this.$refs.vedioEcharts);
        // vedioE.setOption(videoOption);
        this.echartData.video.series = [
          {
            type: "pie",
            data: data.videoData,
          },
        ];
      }
    });
  },
};
</script>

<style>
/*  1. 这里的很多样式由 main.js 中引入了 assets/less 中的样式 */
</style>