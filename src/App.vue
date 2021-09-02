<template>
  <div id="app">
    <keep-alive exclude="Detail">
     <router-view></router-view>
    </keep-alive>
   
    <main-tab-bar ></main-tab-bar>
  </div>
</template>

<script>

import MainTabBar from "./components/content/mainTabbar/MainTabBar.vue"

export default {
  name: 'App',
  methods: {
   
  },
  components:{
   MainTabBar,
  
  }
}
</script>
<style >
   @import "./assets/css/base.css";   /* 注意这里的  ;  不能省 */
</style>