<template>
  <!--单条信息详细页面-->
  <div>
    <el-form>
      <el-form-item label="用户ID：" :label-width="formLabelWidth">
        <el-input v-model="crash.userid" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户名称：" :label-width="formLabelWidth">
        <el-input v-model="crash.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="闪退时间：" :label-width="formLabelWidth">
        <el-input  readonly :value="crash.datetime | dateTimeFormat" disabled></el-input>

      </el-form-item>
      <el-form-item label="详细信息：" :label-width="formLabelWidth">
        <el-input   :rows="10" type="textarea" v-model="crash.info" ></el-input>
      </el-form-item>
      <el-form-item label="手机品牌：" :label-width="formLabelWidth">
        <el-input  v-model="crash.phonename" disabled></el-input>
      </el-form-item>
      <el-form-item label="手机型号：" :label-width="formLabelWidth">
        <el-input  v-model="crash.phonetype" disabled></el-input>
      </el-form-item>
      <el-form-item label="已处理：" :label-width="formLabelWidth">
        <el-switch
          disabled
          v-model="crash.ishandle"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "CrashInfo",
    props: ['crash'],
    data() {
      return {
        formLabelWidth: '100px',
      }
    },
    created() {

    },
    methods: {
      formatCardNumber(datetime){
        console.log(1111);
        return 123;
       },
    }
  }
</script>

<style scoped>

</style>
