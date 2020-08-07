function baseHost() {
  return "http://127.0.0.1:3333/";
}
function appHost() {
  return baseHost()+"app/";
}
function  appFindAllHost() {
  return appHost()+"findall";
}
function  appFindByIdHost() {
  return appHost()+"findbyid?";
}
function  appSaveSingleHost() {
  return appHost()+"saveappversion";
}
function  appDownHost() {
  return appHost()+"downloadapp?id=";
}
function  appDeleteByidHost() {
  return appHost()+"deletebyid?id=";
}

function  appUpdateByPOId() {
  return appHost()+"appupdatebypoid";
}

function  crashHost() {
  return baseHost()+"crash/";
}
function  crashFindAllHost() {
  return crashHost()+"findall";
}
function  crashUpdateByPOId() {
  return crashHost()+"crashupdatebypoid";
}


exports.baseHost = baseHost;
exports.appHost = appHost;
exports.appFindAllHost = appFindAllHost;
exports.appFindByIdHost = appFindByIdHost;
exports.crashHost = crashHost;
exports.crashFindAllHost = crashFindAllHost;
exports.appSaveSingleHost = appSaveSingleHost;
exports.appDownHost = appDownHost;
exports.appDeleteByidHost = appDeleteByidHost;
exports.crashUpdateByPOId = crashUpdateByPOId;
exports.appUpdateByPOId = appUpdateByPOId;
