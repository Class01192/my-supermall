<template>
  <div id="detail">
    <detail-bar class="detail-bar" @titleClick="titleClick" ref="bar"></detail-bar>
    <better-scroll class="content" ref="scroll" @scroll="contralScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods=" recommend" ref="goods"></goods-list>
    </better-scroll>
    <back-top @click.native="backTop" v-show="isShow"></back-top>    <!-- 监听自定义组件点击需要 .native -->
    <detail-bottom-bar @addToCart="addToCart" ></detail-bottom-bar>
    
  </div>
</template>

<script>
import DetailBar from './childComps/DetailBar.vue';
import DetailSwiper from './childComps/DetailSwiper.vue';
import DetailBaseInfo from './childComps/DetailBaseInfo';
import DetailShopInfo from './childComps/DetailShopInfo';
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
import DetailParamInfo from './childComps/DetailParamInfo';
import DetailCommentInfo from './childComps/DetailCommentInfo';
import DetailBottomBar from './childComps/DetailBottomBar';

import BetterScroll from '../../components/common/scroll/Scroll.vue';
import GoodsList from '@/components/content/good/GoodsList.vue';
import BackTop from '@/components/content/backtop/BackTop.vue';



import {getDetail, Goods,Shop,GoodsParam,getRecommend } from '@/network/detail.js';

import { debounce } from '@/common/utils.js'
import {itemListenerMixin,isShowBackTop} from '@/common/mixin.js';  //导入混入中的公共代码
export default {
  name: "Detail",
  components:{
   DetailBar,
   DetailSwiper,
   DetailBaseInfo,
   DetailShopInfo,
   BetterScroll,
   DetailGoodsInfo,
   DetailParamInfo,
   DetailCommentInfo,
   GoodsList,
   BackTop,
   DetailBottomBar
  },
   mixins:[itemListenerMixin,isShowBackTop],
  data() {
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommend:[],
      themeTopY:[],
      getthemeTopY:null,    //为防抖定义一个函数名
      currentIndex:0,

    }
  },
  created() {
    this.iid=this.$route.params.iid       //通过this.$route.params 可以获得url中传入的参数 
    getDetail(this.iid).then(res=>{  //请求详情中的数据
      const data = res.result
     this.topImages = data.itemInfo.topImages
     this.goods =new Goods(data.itemInfo,data.columns,data.shopInfo.services)  //展示商品信息，并将砸乱的商品信息整个成到一个对象中进行应用
     this.shop =new Shop(data.shopInfo)//展示商家信息
     this.detailInfo = data.detailInfo   //获取商品详细信息
     this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
     if(data.rate.cRate != 0){
        this.commentInfo = data.rate.list[0]
     }
    })
    getRecommend().then(res=>{
      this.recommend = res.data.list
    }),
    this.getthemeTopY = debounce(()=>{   //在这里利用防抖，定义getthemeTopY函数，分别获取商品参数、评论、商品推荐页面坐标
      this.themeTopY.push(0)
      this.themeTopY.push(this.$refs.param.$el.offsetTop)
      this.themeTopY.push(this.$refs.comment.$el.offsetTop)
      this.themeTopY.push(this.$refs.goods.$el.offsetTop)
       this.themeTopY.push(Number.MAX_VALUE)
    })
  },
  destroyed(){
this.$bus.$off('itemImgLoad',this.itemImgListener)  //页面销毁后，取消全局鉴定组件取消全局监听事件
  },
methods: {
  imageLoad(){
    this.$refs.scroll.refresh()
    this.getthemeTopY()   //当页面图片加载完成后，调用该函数，找到商品参数、评论、和商品推荐对应的坐标
  },  
  contralScroll(position){

    //这里控制页面滚动到对应位置是，头部导航栏标题与之对应
    const positionY = -position.y
   let length = this.themeTopY.length
   for(let i=0;i<length-1;i++){
     if(this.currentIndex !== i&&(positionY >=this.themeTopY[i]&&positionY<this.themeTopY[i+1])){
      this.currentIndex= i
      this.$refs.bar.currentIndex = this.currentIndex
     }
   }
   //这个控制回到顶部按键是否显示
     this.isShow= (-position.y) > 1000
  },
  titleClick(index){
    this.$refs.scroll.scrollTo(0,-this.themeTopY[index],500)
  },
  addToCart(){
   //这里将要添加至购物车的商品信息进行保存
    const product={}
    product.image = this.topImages[0];
    product.title = this.goods.title;
    product.desc =this.goods.desc;
    product.iid=this.iid;
    product.price=this.goods.realPrice
    //这里将保存后的商品信息，上传至vuex中，进行集中管理
    this.$store.dispatch('addToCart',product)//then(res=>{
// //       this.addToCart(product).then(()=>{
// //  this.$toast.show(res,2000)
// //  console.log(this.$toast);
// //       })
     
//       this.message = res
//       this.isShow = true
//       setTimeout(()=>{
//         this.message = ''
//       this.isShow = false
//       // },2000)
// //     //   // console.log(res);
//     })  //调用store中的action方法
  }
},
  
}
   
</script>

<style  scoped>
#detail{
  position: relative;
  top: 0;
  z-index: 9;
  background-color:#fff;
  height: 100vh;
}

.content{
 /* position: absolute;
 top: 44px;
  bottom: 49px; */
  height: calc(100% - 93px);   /*注意： 使用calc时，运算符号前后一定要加空格 */
  overflow: hidden; 
}


</style>