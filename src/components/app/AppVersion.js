function newAppVersion() {
  return {
    id:0,
    title: "App更新",//更新标题
    levelContent: "",//更新内容
    version: "",//版本号
    force: false,//是否强制更新
    uploaddate: "",//上传日期
    downloadcount: 0,//下载次数
    url: "",
    file: "",//上传的文件
  }
};
exports.newAppVersion = newAppVersion;

function checkAddError(appversion) {
  let errors = [];
  if (!appversion) {
    errors.push("没有传检查的对象过来！！！");
    return errors;
  }
  let checkArray = [
    {key: 'title', error: '标题没有填写'},
    {key: 'levelContent', error: '更新内容没有填写'},
    {key: 'version', error: '版本号没有填写'},
  ];

  for (let i = 0; i < checkArray.length; i++) {
    let value = appversion[checkArray[i].key];
    if (value === undefined || value.trim() == "") {
      errors.push(checkArray[i].error);
    }
  }
  let file = appversion.file;
  if (!file) {
    errors.push("没有添加上传文件！！！")
  }
  return errors;
};
exports.checkAddError = checkAddError;
