<template>
    <div style="margin:0 auto;width:300px;height:500px">
      <div  >
        <H2>登录界面</H2>
        <el-input
          placeholder="请输入账号"
          prefix-icon="el-icon-user"
          v-model="user.username"
          clearable
        >
        </el-input>
        <el-input
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          v-model="user.password"
          show-password
        >
        </el-input>
      </div>
      <div style="text-align: right">
        <el-button  @click="login(user)" type="primary" >登录</el-button>
      </div>

    </div>
</template>

<script>
    export default {
        name: "Login",
      data(){
          return{
              user:{
                username:"",
                password:"",
              }
          }
      },
      created(){

      },
      methods:{
          login(user){
              console.log(user);
              if(user.username == "yanbo" && user.password == "123456"){
                this.$store.commit("setUser",user);
                this.$store.commit("notify",{
                  title: "登录成功",
                  type:"success"
                })
              }else{
                this.$store.commit("notify",{
                  title: "登录失败",
                  type:"error"
                })
              }
          }
      }
    }
</script>

<style scoped>
  .el-input{
    margin-bottom: 20px;
  }
</style>
