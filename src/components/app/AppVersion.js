function newAppVersion() {
  return {
    id:0,
    title: "App更新",//更新标题
    levelcontent: "",//更新内容
    version: "",//版本号
    versioncode: "",//版本号数字
    isforce: false,//是否强制更新
    uploaddate: "",//上传日期
    downusers: [],//下载人员
    filename: "",
    file: "",//上传的文件
    filelength:0,//文件大小

  }
};
exports.newAppVersion = newAppVersion;

function checkUpdateError(appversion) {
  let errors = [];
  if (!appversion) {
    errors.push("没有传检查的对象过来！！！");
    return errors;
  }
  let checkArray = [
    {key: 'title', error: '标题没有填写'},
    {key: 'levelcontent', error: '更新内容没有填写'},
    {key: 'version', error: '版本号没有填写'},
    {key: 'versioncode', error: '版本号数字没有填写'},
  ];

  for (let i = 0; i < checkArray.length; i++) {
    let value = appversion[checkArray[i].key];
    if (value === undefined || value.trim() == "") {
      errors.push(checkArray[i].error);
    }
  }
  return errors;
};

function checkAddError(appversion) {
  let errors = checkUpdateError(appversion)
  let file = appversion.file;
  if (!file) {
    errors.push("没有添加上传文件！！！")
  }
  return errors;
};

exports.checkAddError = checkAddError;
exports.checkUpdateError = checkUpdateError;
