function newCrashPo() {
  return {
    id: "",
    userid: "",//用户id
    username: "",//用户名称
    datetime: "",//crash日期时间  是 毫秒值
    info: "",//详细信息
    phonetype: "",//手机型号
    ishandle: false,//是否已处理
    handlemessage: "",//是否已处理
    version: "",
    versioncode: 0,
  }
}

exports.newCrashPo = newCrashPo;
