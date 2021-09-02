<template>
  <div class="recommend">
    <div v-for="(item,i) in recommends" :key="i" class="recommend-item">
      <a :href="item.link" >
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a> 
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  props: {
    recommends:{
    type:Array,
          default(){
            return []
    }
  },
  methods: {},
}
}
</script>

<style  scoped>
.recommend{
  display: flex;
  width: 100%;
  background-color: #fff;
  text-align: center;
  padding: 10px 0  20px;
  border-bottom: 8px solid #eee;
}
.recommend-item{
   flex: 1;
   font-size: 14px;
 
}
img{
  width: 90%;
 
}
</style>