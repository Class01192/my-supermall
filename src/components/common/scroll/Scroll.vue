<template>
  <div class="wrapper" ref="wrapper">
  <div class="content">
  <slot></slot>
</div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Scroll",
  data() {
    return {
      scroll:null,
    };
  },
  props:{
        probeType:{
         type:Number,
          default:0
            },
         pullUpLoad:{
           type:Boolean,
           default:false
         }
        },

  mounted() {  //在组件挂载完毕后加载
    this.scroll = new BScroll(this.$refs.wrapper,{
    click:true,
    pullUpLoad:this.pullUpLoad, //上拉加载更多
    probeType: this.probeType, //监听鼠标滚动事件  0和1表示不侦测，2手指在触摸时监听，但手指离开惯性滚动时不侦测，3只要滚动就侦测
    },
    )
    this.scroll.on('scroll',(position)=>{  //监听鼠标滚动事件
      this.$emit('scroll',position);  //自定义方法，scroll组件向外传递一个名为scroll的方法，并向外传出position参数
    })
    this.scroll.on('pullingUp',()=>{ //实现上拉加载更多
      this.$emit('pullingUp')
    })
  },
  methods: {
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)   //在这里定义一个滚动位置的方法  &&逻辑与，第一个为true才执行第二步，先判断scroll中是否有值
    },
    finishPullUp(){
        this.scroll.finishPullUp()  //finishPullUp better-scroll内置函数，实现重复上拉加载更多
    },
    refresh(){
      this.scroll&&this.scroll.refresh()   //这个方法可以刷新scrollHight,避免图片加载过程中上拉卡顿的问题
  },
  getScrollY(){
    return this.scroll?this.scroll.Y:0    //判断this.scroll.y是否有值，有值返回scroll.y，无值返回0
  }
  }
}
</script>

<style  scoped></style>