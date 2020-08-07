<template>
  <!--app管理-->
  <div>
    <div style="float: left; padding-left: 20px">
      <el-button @click="showAddAppverionDialog" type="success" icon="el-icon-plus" circle></el-button>
      <!--<el-button type="danger" icon="el-icon-edit" circle></el-button>-->
    </div>
    <el-table
      :data="appversions"
      stripe
      style="width: 100%">
      <el-table-column type="index" label="序号" width="60px">
        <template slot-scope="scope">
          {{scope.$index +1}}
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="更新标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="versioncode"
        label="更新版本号数字"
        width="180">
      </el-table-column>
      <el-table-column
        prop="version"
        label="更新版本号"
        width="180">
      </el-table-column>

      <el-table-column
        label="更新内容"
        width="180">
        <template slot-scope="scope">
          {{ scope.row.levelcontent.length > 50 ? scope.row.levelcontent.substring(0,50)+"...": scope.row.levelcontent}}
        </template>
      </el-table-column>

      <el-table-column
        label="强制更新"
        width="100">
        <template slot-scope="scope">
          <el-switch
            disabled
            v-model="scope.row.isforce"
            active-color="#13ce66"
            inactive-color="#ff4949"/>
        </template>
      </el-table-column>

      <el-table-column
        prop="filename"
        label="文件名字">
      </el-table-column>
      <el-table-column
        prop="uploaddate"
        label="上传日期">
        <template slot-scope="scope">
          {{scope.row.uploaddate | dateTimeFormat}}
        </template>
      </el-table-column>
      <el-table-column
        label="下载次数">
        <template slot-scope="scope">


          <el-button
            size="mini"
            type="info"
            @click="lookDownUserInfo(scope.row.downusers)"> {{scope.row.downusers | downcount}}次
          </el-button>
        </template>

      </el-table-column>
      <el-table-column label="操作"  width="280">
        <template slot-scope="scope">

          <el-button
            size="mini"
            type="info"
            @click="editApp(scope.$index, scope.row)">编辑
          </el-button>


          <el-button
            size="mini"
            type="warning"
            @click="downApp(scope.$index, scope.row)">下载
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteApp(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="dialog_conten_info.title" width="500px" :visible.sync="dialog_appversion_visible" center>
      <div>
        <AppInfo :appversion=dialog_appversion :dialog_state="dialog_state"></AppInfo>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialog_appversion_visible = false">取 消</el-button>
            <el-button type="primary"
                       @click="saveOrUpdateInDatabase(dialog_appversion)">{{dialog_conten_info.okbutton}}</el-button>
     </span>
    </el-dialog>
    <el-dialog title="下载情况" width="500px" :visible.sync="dialog_downuser_visible" center>
      <el-table
        :data="downusers"
        stripe
        style="width: 100%">
        <el-table-column type="index" label="序号" width="60px">
          <template slot-scope="scope">
            {{scope.$index +1}}
          </template>
        </el-table-column>
        <el-table-column
          prop="user.loginName"
          label="用户账号"
         >
        </el-table-column>
        <el-table-column
          prop="user.userName"
          label="用户名称"
         >
        </el-table-column>
        <el-table-column
          prop="downcount"
          label="下载次数"
         >
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
  import AppInfo from '@/components/app/AppInfo'
  import AppVersion from '@/components/app/AppVersion'
  import UrlManager from '@/components/public/UrlManager'
  export default {
    name: "AppManager",
    components: {AppInfo,},
    data() {
      return {
        dialog_downuser_visible:false,
        dialog_appversion_visible: false,
        appversions: [],
        dialog_appversion_old: {},
        dialog_appversion: {},
        dialog_state:{
          state: 0,//0新增 ，1 编辑
          index:0,//
        },
        dialog_conten_info: {},
        dialog_content_add: {
          title: "app新增",
          okbutton: "添加"
        },
        dialog_content_edit: {
          title: "app删除",
          okbutton: "确定"
        }
      }
    },
    filters:{
      downcount(downusers){
        let count =0;
        if(downusers && downusers instanceof Array){
          for (let downuser of downusers){
            count += downuser.downcount;
          }
        }
        return count;
      }
    },
    created() {
      this.$store.commit("getCustom",{
        url:UrlManager.appFindAllHost(),
        callback:datas=>{
          for (let i = datas.length -1; i >= 0; i--) {
            this.appversions.push(datas[i]);
          }
        }
      });

    },
    methods: {
      /**
       * 删除app
       * @param index
       * @param appversion
       */
      deleteApp(index, appversion) {
        console.log(111,appversion.id);
        this.$store.commit("confirm", {
          msg: "确定要删除这个app吗？",
          callback: falg => {
            if (falg) {
              this.$store.commit("getCustom",{
                url:UrlManager.appDeleteByidHost()+appversion.id,
                callback: data=>{
                  this.appversions.splice(index, 1);
                  this.$store.commit("notify",{type:0,msg:"删除成功"})
                }
              });
            }
          }
        });
      },
      editApp(index, appversion) {
        this.dialog_appversion_old = appversion;
        this.dialog_appversion = JSON.parse(JSON.stringify(appversion));
        this.dialog_conten_info = this.dialog_content_edit;
        this.dialog_appversion_visible = true;
        this.dialog_state.index = index;
        this.dialog_state.state = 1;
      },
      /**
       * 删除或者保存 app 到后台数据库
       * @param appversion
       */
      saveOrUpdateInDatabase(appversion) {


       if(this.dialog_state.state === 0){
         let errors = AppVersion.checkAddError(appversion);
         if (errors.length > 0) {
           this.$store.commit("showMessageBox", {
             msg: errors.toString(),
             type: "error"
           });
           return;
         }

          //新增
         let param = new FormData();

        //通过append向form对象添加数据
         param.append("file", appversion.file);
         appversion.file="";//清除文件
         param.append("po",JSON.stringify(appversion));

         this.$store.commit("postFiles", {
           url: UrlManager.appSaveSingleHost(), formData: param, callback: (data) => {
               this.dialog_appversion_visible = false;
               this.appversions.push(data);
           }
         });
       }else if(this.dialog_state.state === 1){
         let errors = AppVersion.checkUpdateError(appversion);
         if (errors.length > 0) {
           this.$store.commit("showMessageBox", {
             msg: errors.toString(),
             type: "error"
           });
           return;
         }
          //编辑
         this.$store.commit("postCustom",{
           url:UrlManager.appUpdateByPOId(),
           po:appversion,
           callback: (data) => {
             this.appversions.splice(this.dialog_state.index,1,data);
             this.dialog_appversion_visible = false;
           }
         });

       }

      },
      /**
       * 弹出 添加 app 窗口
       */
      showAddAppverionDialog() {
        this.dialog_appversion = AppVersion.newAppVersion();
        this.dialog_conten_info = this.dialog_content_add;
        this.dialog_appversion_visible = true;
        this.dialog_state.state = 0;
      },
      lookDownUserInfo(downusers){
        this.dialog_downuser_visible= true;
        this.downusers= downusers;
      },
      //下载app
      downApp(index, appversion){
        window.location.href =UrlManager.appDownHost()+appversion.id;
        appversion.downloadcount = appversion.downloadcount+1;
        /*  this.$store.commit("getCustom",{
            url:UrlManager.appDownHost()+"?id="+appversion.id,
            callback:data=>{

            }
          });*/
      }
    }
  }
</script>

<style scoped>

</style>
