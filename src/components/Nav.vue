<template>
    <!--导航栏-->
    <div>
      <el-menu :default-active="activeIndex"  router class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="/main/appmanager" >App升级管理</el-menu-item>
        <el-menu-item index="/main/crashmanager">闪退反馈信息</el-menu-item>
      </el-menu>
      <router-view style="margin-top: 10px"/>
    </div>
</template>

<script>
    export default {
        name: "Nav",
      data() {
        return {
          activeIndex: '1',
        };
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style scoped>

</style>
