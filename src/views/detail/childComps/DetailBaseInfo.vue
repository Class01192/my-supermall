<!--这个是商品信息展示组件-->
<template>
<!-- v-if="Object.keys(goods).length先判断goods对象是或否为0 -->
  <div v-if="Object.keys(goods).length !==0" class="base-info">
    <div class="info-titel"><h4>{{goods.title}}</h4></div>
   <div class="info-price">
     <span class="n-price">{{goods.newPrice}}</span>
     <span class="o-price">{{goods.oldPrice}}</span> 
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
 </div>
  <div class="info-other">
   <span>{{goods.columns[0]}}</span>
   <span>{{goods.columns[1]}}</span>
   <span>{{goods.services[goods.services.length-1].name}}</span>
 </div>
<div class="info-service">
  <span class="info-service-item" v-for="i in goods.services.length-1" :key="i">
<img :src="goods.services[i-1].icon" >
<span>{{goods.services[i-1].name}}</span> 
</span>
 </div>  

  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  created() {},
  data() {
    return {};
  },
  props: {
    goods:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods: {},
};
</script>

<style  scoped>
.base-info{
  margin-top: 15px;
  padding: 0 8px;
  color:#999;
  border-bottom: 5px solid #f2f5f8;
}
.info-titel{
  color: #222;
}
.info-price{
  margin-top: 10px;
}
.info-price .n-price{
  font-size: 24px;
  color:skyblue;
}
.info-price .o-price{
  font-size: 13px;
  margin-left: 5px;
  color: pink;
  text-decoration: line-through;
}
.info-price .discount{
  font-size: 12px;
  padding: 2px 5px;
  color: #fff;
  background-color: var(--color--high--text);
  border-radius: 8px;
  margin-left: 5px;
  position: relative;
  top:-8px;
}
.info-other{
  margin-top:15px;
  line-height: 30px;
  display: flex;
  font-size: 13px;
  border-bottom: 1px solid rgba(100,100,.1);
  justify-content: space-between;

}
.info-service{
  display: flex;
  flex-wrap: wrap;
 
  line-height: 60px;
}
.info-service-item{
  flex: 50%;
   justify-content: space-around;
  font-size: 14px;
}
.info-service-item img{
  width: 14px;
  height: 14px;
  position: relative;
  top: 2px;
}
</style>