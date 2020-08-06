function newCrashPo() {
  return{
      userid:"",//用户id
      username:"",//用户名称
      datetime:"",//crash日期时间
      info:"     <el-form>\n" +
        "      <el-form-item label=\"用户ID：\" :label-width=\"formLabelWidth\">\n" +
        "        <el-input v-model=\"crash.userid\" disabled></el-input>\n" +
        "      </el-form-item>\n" +
        "      <el-form-item label=\"用户名称：\" :label-width=\"formLabelWidth\">\n" +
        "        <el-input v-model=\"crash.username\" disabled></el-input>\n" +
        "      </el-form-item>\n" +
        "      <el-form-item label=\"闪退时间：\" :label-width=\"formLabelWidth\">\n" +
        "        <el-input v-model=\"crash.datetime\" disabled></el-input>\n" +
        "      </el-form-item>\n" +
        "      <el-form-item label=\"详细信息：\" :label-width=\"formLabelWidth\">\n" +
        "        <el-input v-model=\"crash.info\" disabled></el-input>\n" +
        "      </el-form-item>\n" +
        "      <el-form-item label=\"手机信号：\" :label-width=\"formLabelWidth\">\n" +
        "        <el-input v-model=\"crash.phonetype\" disabled></el-input>\n" +
        "      </el-form-item>\n" +
        "    </el-form>",//详细信息
      phonetype:"",//手机型号
      ishandle:false,//是否已处理
      handlemessage:"",//是否已处理
  }
}
exports.newCrashPo = newCrashPo;
