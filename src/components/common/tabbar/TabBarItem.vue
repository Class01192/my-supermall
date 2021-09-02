<template>
  <!--所有的item都展示同一个图片, 同一个文字-->
  <div class="tab-bar-item" @click="itemClick">
   <div v-if="!isActive"><slot name="item-icon"></slot></div>    <!--  //当isActive为false时，显示该样式 -->
   <div v-else><slot name="item-icon-active"></slot></div>      <!-- //反之，当isActive为false时，显示该样式 -->
   <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    computed: {
      isActive() {
        // /home -> item1(/home) = true
        // /home -> item1(/category) = false
        // /home -> item1(/cart) = true
        // /home -> item1(/profile) = true
        // this.$route.path.indexOf(this.path),判断当前处于活跃状态组件的path，是否与从父组件得到的path一致
        return this.$route.path.indexOf(this.path) !== -1      
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        //点击后组件页面跳转，push可以实现跳转后返回，replace返回按钮则无法使用
        // console.log(this.path);
         this.$router.replace(this.path)    //这里是通过this.$router.replace('url')实现页面跳转，不需要router-link
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
