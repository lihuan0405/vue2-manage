<template>
  <div ref="echarts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: {
    isAxisChart: {
      type: Boolean,
      default: true,
    },
    charData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: [],
        };
      },
    },
  },
  data() {
    return {
      axisOption: {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
        ],
        series: [],
      },
      normalOption: {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [],
      },
      echart: null,
    };
  },
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption;
    },
  },

  watch: {
    //   1.  数据变化 表格需要重新绘制
    charData: {
      handler: function () {
        this.initChart();
      },
      //   1.1  数据首次变化 也需要重新绘制
      deep: true,
    },
  },
  methods: {
    initChart() {
      this.initcharData();
      if (this.echart) {
        this.echart.setOption(this.options);
      } else {
        this.echart = echarts.init(this.$refs.echarts);
        this.echart.setOption(this.options);
      }
    },
    initcharData() {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.charData.xData;
        this.axisOption.series = this.charData.series;
      } else {
        this.normalOption.series = this.charData.series;
      }
    },
  },
};
</script>

<style>
</style>