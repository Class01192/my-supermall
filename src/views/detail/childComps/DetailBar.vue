<template>
  <div id="DetailBar">
    <nav-bar>
      <div slot="left" @click="backClick" class="back"><img src="@/assets/img/common/back.svg" alt=""></div>
      <div slot="center" class="center" >  
        <div v-for="(item,index) in title" 
            :key="index" class="center-bar" 
            :class="{isActive:currentIndex == index}" 
            @click="titleClick(index)">
          {{item}}
        </div>

      </div>

    </nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar';

export default {
  name: "DetailBar",
  components:{
    NavBar,
  },
  created() {},
  data() {
    return {
      title:["商品","参数","评论","推荐"],
      currentIndex:0
    };
  },
  props: {},
  methods: {
    backClick(){
      this.$router.go(-1)    // this.$router.back（）这两个方法均可以实现点击回退
    },
   titleClick(index){
      this.currentIndex = index
      this.$emit("titleClick",index)
    }
  },
};
</script>

<style scoped>
.center{
  display: flex;
}
.center-bar{
  flex: 1;
}
.isActive{
  color: #fb7299;
}
.back{
  margin-top: 8px;
}
</style>