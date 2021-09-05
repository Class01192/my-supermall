<template>
  <div id="home">
   <nav-bar class="home-bar"><div slot="center">购物街</div></nav-bar>
    <tab-contral :title="['流行','新款','精选']"  
                  class="tab-contral-style fixed"
                  @tabClick="tabClick" 
                  v-show="isTabShow"
                  ref="tabContral1">
  </tab-contral>    
   <scroll class="content" ref="scroll" @scroll="contentScroll"  :probe-type="3" @pullingUp="loadMore" :pull-up-load="true">
   <home-comps :banners="banners" @swiperImageLoad="swiperImageLoad"></home-comps>
   <home-recommend :recommends="recommends"></home-recommend>
   <feature-view></feature-view>
    <tab-contral :title="['流行','新款','精选']"  
                  class="tab-contral-style" 
                  @tabClick="tabClick" 
                  ref="tabContral2">
  </tab-contral>    
   <goods-list :goods="showGoods"></goods-list>
   </scroll>
   <back-top @click.native="backTop" v-show="isShow"></back-top>    <!-- 监听自定义组件点击需要 .native -->
   </div>
</template>

<script>
// 这里放子组件
import HomeComps from './childComps/HomeComps.vue'
import HomeRecommend from './childComps/HomeRecommend.vue'
import FeatureView from './childComps/FeatureView.vue'

// 这放公共组件
import NavBar from '@/components/common/navbar/NavBar.vue'
import TabContral from '@/components/content/tabControl/TabControl.vue'
import GoodsList from '@/components/content/good/GoodsList'
import Scroll from '@/components/common/scroll/Scroll.vue'
import BackTop from '@/components/content/backtop/BackTop.vue';
这里时用来测试的
// 这里放网络请求
import {getHomeMultidate,getHomeGoods} from '@/network/home'     //如果模块中导出没有default,则导入时需要加{}

import {itemListenerMixin,isShowBackTop} from '@/common/mixin.js';  //导入混入中的公共代码

export default {
  name: "Home",
  components:{
   NavBar,
   HomeComps,
   HomeRecommend,
   FeatureView,
   TabContral,
   GoodsList,
   Scroll,
   BackTop
   },
   mixins:[itemListenerMixin,isShowBackTop],
  data() {
    return {
      banners:[],
      recommends:[],
      goods:{   //定义商品对象，用来储存请求过来的goods信息    //传递复杂数据类型要先设计数据结构
              'pop':{page:0, list:[]},   //定义数据的时候需要到引号
              'new':{page:0, list:[]},
              'sell':{page:0, list:[]}
    },
     currentType:'pop',  //设置默认type类型,
     isShow:false,
     tabOffsetTop:0,
     isTabShow:false, //决定tabcontaol是否吸顶
     saveY:0
     
    };
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created(){
     this.getHomeMultidate()
     this.getHomeGoods('pop')
     this.getHomeGoods('new')
     this.getHomeGoods('sell')
    
  },
  activated() {    //处于活跃状态的组件执行activated
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    
  },
  deactivated() {//处于不活跃状态的组件执行deactivated   
    this.saveY = this.$refs.scroll.getScrollY()*1   //调用scroll组件中的自定义getScrollY 方法，获取当前页面的y坐标  这里×1是为了将 this.saveY转换为数字类型
    this.$bus.$off('itemImgLoad',this.itemImgListener)  //this.$bus.$off取消全局监听事件，搭配混入mixin使用
  },
  methods: {
//获取商品信息
  tabClick(index){
    // console.log(index);
    switch(index){
      case 0:
        this.currentType = 'pop';
        break
      case 1:
        this.currentType = 'new';
        break
      case 2:
        this.currentType = 'sell';
        break
    }
    this.$refs.tabContral1.curentIndex=index
    this.$refs.tabContral2.curentIndex=index
  },
  
    contentScroll(position){
     this.isShow= (-position.y) > 1000
     this.isTabShow = (-position.y)>this.tabOffsetTop
  
    },
    loadMore(){
      this.$refs.scroll.finishPullUp()
      this.getHomeGoods(this.currentType )
    
    },
    swiperImageLoad(){
       this.tabOffsetTop = this.$refs.tabContral2.$el.offsetTop;
     //$el可以取出自定义组件中的内置方法
     },
    //网络请求相关方法 
   getHomeMultidate(){
     getHomeMultidate().then(res=>{
      this.banners=res.data.banner.list; //使用result储存从后台调用过来的数据
      this.recommends=res.data.recommend.list  
     })
  },
  getHomeGoods(type){
    const page = this.goods[type].page + 1
   getHomeGoods(type,page).then(res=>{
    this.goods[type].list.push(...res.data.list) //使用...res时无须显示数据个数    将...res.data.list中的数组中数据进行结构并赋值到另一个数组中
    this.goods[type].page +=1 
  })
  },
  },
};
</script>

<style  scoped>
#home{
  position: relative;
  top: 0;
  height: 100vh;  /* 视口高度*/
}
.home-bar{
  background-color: #fb7299;
  color: #fff;
}
.content{
   height: calc(100% - 44px); 

  overflow: hidden; 
 /* position: absolute;
  top: 44px;
  bottom: 49px;
  overflow: hidden;  */

}


</style>