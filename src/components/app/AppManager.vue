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
        prop="version"
        label="更新版本号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="levelContent"
        label="更新内容">
      </el-table-column>

      <el-table-column
        label="强制更新"
        width="180">
        <template slot-scope="scope">
          <el-switch
            disabled
            v-model="scope.row.force"
            active-color="#13ce66"
            inactive-color="#ff4949"/>
        </template>
      </el-table-column>

      <el-table-column
        prop="url"
        label="下载网址">
      </el-table-column>
      <el-table-column
        prop="uploaddate"
        label="上传日期">
      </el-table-column>
      <el-table-column
        prop="downloadcount"
        label="下载次数">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="info"
            @click="editApp(scope.$index, scope.row)">编辑
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
  </div>
</template>

<script>
  import AppInfo from '@/components/app/AppInfo'
  import AppVersion from '@/components/app/AppVersion'

  export default {
    name: "AppManager",
    components: {AppInfo,},
    data() {
      return {
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
    created() {
      this.appversions.push(AppVersion.newAppVersion());
      this.appversions.push(AppVersion.newAppVersion());
      this.appversions.push(AppVersion.newAppVersion());
    },
    methods: {
      /**
       * 删除app
       * @param index
       * @param appversion
       */
      deleteApp(index, appversion) {
        this.$store.commit("confirm", {
          message: "确定要删除这个app吗？",
          callback: falg => {
            if (falg) {
              this.appversions.splice(index, 1);
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

        let errors = AppVersion.checkAddError(appversion);
        if (errors.length > 0) {
          this.$store.commit("showMessageBox", {
            message: errors.toString(),
            type: "error"
          });
          return;
        }
       if(this.dialog_state.state === 0){
          //新增
         let param = new FormData();

        //通过append向form对象添加数据
         param.append("file", appversion.file);
         appversion.file="";//清除文件
         param.append("appversion", appversion);

         this.$store.commit("postFiles", {
           url: this.$store.getters.getHost() + "uploadApp", formData: param, callback: (resultdata) => {
             if (resultdata.status === "Success") {
                result = JSON.parse(resultdata.json);
               this.dialog_appversion_visible = false;
               this.appversions.push(result.appversion);
             } else {
               this.$store.commit("notify", {type: resultdata.status, message: resultdata.message})
             }
           }
         });
       }else if(this.dialog_state.state === 1){
          //编辑
         this.appversions.splice(this.dialog_state.index,1,appversion)
         this.dialog_appversion_visible = false;
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
      /**
       * 检查 appversion 的正确性
       * @param appversion
       * @return boolean
       */
      check(appversion) {

      }
    }
  }
</script>

<style scoped>

</style>
