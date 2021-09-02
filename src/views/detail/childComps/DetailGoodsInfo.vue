<!--这个是商品详细信息展示组件-->
<template>
  <div v-if="Object.keys(detailInfo).length !==0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
<div class="desc">{{detailInfo.desc}}</div>
<div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <!-- @load="imgLoad" -->
      <img  v-for="(item,index) in detailInfo.detailImage[0].list" :key="index"  :src="item" @load="imgLoad">   
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  created() {},
  data() {
    return {
      counter:0,
      imagesLength:0

};
  },
  props: {
    detailInfo:{
      type:Object,
      defaule(){
        return {}
      }
    }
  },
  methods: {
    imgLoad(){
      // 判断，当所有属性都加载后再向外传递一次方法
       if(++this.counter === this.imagesLength){    //让计数器每次加1,直到监听到计数器大小等于detailInfo中要加载图片数目的时候再向外传递自定义方法
        this.$emit('imageLoad')
       }
    }, 
  },
  watch:{  //watch可以监听组件中某个数据的变化
      detailInfo(){
      this.imagesLength = this.detailInfo.detailImage[0].list.length   //获取图片个数
      }
    }
};
</script>

<style scoped>
.goods-info{
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}
.info-desc{
  padding: 0 15px;
}
.info-desc .start, .info-desc .end{
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}
.info-desc .start{
  float: left;
}
.info-desc .end{
  float: right;
}
.info-desc .start::before,.info-desc .end::after{
  content:'';
  position: absolute;
  width:5px; 
  height: 5px;
  background-color: #333;
  bottom: 0;
}
.info-desc .end::after{
  right: 0;
}
.info-desc .desc{
  padding: 15px 0;
  font-size: 14px;
}
.info-key{
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}
.info-list img{
  width: 100%;
}
</style>