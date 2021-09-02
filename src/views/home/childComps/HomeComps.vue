<template>
  <div>
    <swiper>
      <swiper-item v-for="(item,i) in banners" :key="i">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="swiperImageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from '@/components/common/swiper';

export default {
  name: "HomeSwiper",
  components:{
    Swiper,
    SwiperItem

  },
  props: {
    banners:{
        type:Array,
          default(){
            return []
  }
    }
  },
  data() {
    return {
      isLoad:false
    }
  },
  methods: {
    swiperImageLoad(){
      
      if(!this.isLoad){
         this.$emit("swiperImageLoad")   //不要乱加空格
         this.isLoad = true
      }
    
    }
  },
    
 
}
</script>

<style  scoped></style>