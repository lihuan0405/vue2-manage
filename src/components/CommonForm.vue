<template>
  <el-form ref="form" label-width="100px" :model="form" :inline="inline">
    <el-form-item
      v-for="item in formLabel"
      :key="item.label"
      :label="item.label"
    >
      <el-input
        v-if="item.type === 'input'"
        :placeholder="'请输入' + item.label"
        v-model="form[item.model]"
      ></el-input>

      <el-switch
        v-if="item.type === 'switch'"
        v-model="form[item.model]"
      ></el-switch>

      <el-date-picker
        v-if="item.type === 'date'"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="请选择日期"
        v-model="form[item.model]"
      >
        <!-- 2. value-format 可以控制日期显示的格式 -->
      </el-date-picker>

      <el-select
        v-if="item.type === 'select'"
        placeholder="请选择"
        v-model="form[item.model]"
      >
        <el-option
          v-for="item in item.opts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <!--   3.  如果上述条件都不满足，则定义插槽 slot -->
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "CommonForm",
  props: {
    //  1.  表示 什么框 [{label: , type: , model: }]
    formLabel: Array,
    //  1.1  form 中的数据进行了双向绑定，可更改
    form: Object,
    inline: Boolean,
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>