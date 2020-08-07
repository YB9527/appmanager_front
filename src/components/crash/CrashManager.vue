<template>
  <div>
    <el-table
      :data="crashs"
      stripe
      style="width: 100%">
      <el-table-column type="index" label="序号" width="60px">
        <template slot-scope="scope">
          {{scope.$index +1}}
        </template>
      </el-table-column>
      <el-table-column
        prop="userid"
        label="用户ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名称">
      </el-table-column>
      <el-table-column
        prop="versioncode"
        label="版本号数字">
      </el-table-column>
      <el-table-column
        prop="version"
        label="版本号">
      </el-table-column>
      <el-table-column
        label="闪退时间">
        <template slot-scope="scope">
          {{scope.row.datetime | dateTimeFormat}}
        </template>
      </el-table-column>
      <el-table-column
        label="详细信息"
        width="180">
        <template slot-scope="scope">
          {{ scope.row.info.length > 50 ? scope.row.info.substring(0,50)+"...": scope.row.info}}
        </template>
      </el-table-column>
      <el-table-column
        prop="phonename"
        label="手机品牌">
      </el-table-column>
      <el-table-column
        prop="phonetype"
        label="手机型号">
      </el-table-column>

      <el-table-column
        label="处理状态">
        <template slot-scope="scope">
          <el-switch
            disabled
            v-model="scope.row.ishandle"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>

      </el-table-column>

      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="info"
            @click="lookInfo(scope.$index, scope.row)">详情
          </el-button>
          <el-button
            size="mini"
            type="success"
            @click="handelCrash(scope.$index, scope.row)">处理
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="详情" width="50%" :visible.sync="dialog_crash_visible" top="2vh" center>
      <div>
        <CrashInfo :crash=dialog_crash></CrashInfo>
      </div>
    </el-dialog>
    <el-dialog title="处理crash" width="50%" :visible.sync="dialog_crash_handel_visible" top="2vh" center>
      <div>
        <el-form>
          <el-form-item label="版本号数字：" :label-width="formLabelWidth">
            <el-input disabled   v-model="dialog_crash.versioncode"></el-input>
          </el-form-item>
          <el-form-item label="版本号：" :label-width="formLabelWidth">
            <el-input disabled  v-model="dialog_crash.version"></el-input>
          </el-form-item>
          <el-form-item label="crash信息：" :label-width="formLabelWidth">
            <el-input disabled :rows="10" type="textarea" v-model="dialog_crash.info"></el-input>
          </el-form-item>
          <el-form-item label="处理信息：" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="dialog_crash.handlemessage"></el-input>
          </el-form-item>
          <el-form-item label="处理结果：" :label-width="formLabelWidth">
            <el-switch
              v-model="dialog_crash.ishandle"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialog_crash_handel_visible = false">取 消</el-button>
            <el-button type="primary"
                       @click="updateInDatabase(dialog_crash)">确定</el-button>
     </span>
    </el-dialog>
  </div>
</template>

<script>
  import ModelManager from '@/components/public/ModelManager'
  import CrashInfo from "./CrashInfo";
  import UrlManager from '@/components/public/UrlManager'

  export default {
    name: "CrashManager",
    components: {CrashInfo},
    data() {
      return {
        formLabelWidth: '100px',
        crashs: [],
        dialog_crash_visible: false,
        dialog_crash_handel_visible: false,
        dialog_crash: {},
        dialog_crash_index: {},
      }
    },
    created() {
      this.$store.commit("getCustom",{
        url:UrlManager.crashFindAllHost(),
        callback:datas=>{
          for (let i = datas.length -1; i >= 0; i--) {
            this.crashs.push(datas[i]);
          }
        }
      });
    },
    methods: {
      /**
       * 查看详细信息
       * @param index
       * @param crash
       */
      lookInfo(index, crash) {
        this.dialog_crash = crash;
        this.dialog_crash_visible = true;
      },
      handelCrash(index, crash) {
        this.dialog_crash = JSON.parse(JSON.stringify(crash));
        this.dialog_crash_handel_visible = true;
        this.dialog_crash_index = index;
      },
      updateInDatabase(dialog_crash) {
        this.$store.commit("postCustom",{
            url:UrlManager.crashUpdateByPOId(),
            po:dialog_crash,
            callback: data=>{
              this.crashs.splice(this.dialog_crash_index, 1, data);
              this.dialog_crash_handel_visible = false;
            }
        });
      }
    }
  }
</script>

<style scoped>

</style>
