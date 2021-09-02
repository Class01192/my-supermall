<template>
  <div v-if="Object.keys(commentInfo).length !==0" class="comment-info">
    <div class="info-heard">
      <div class="heard-title">用户评价</div>
      <div class="heard-more">   
         <!-- @click="" -->
        更多
        <i class="arow-right">
        </i>
      </div>
    </div>

    <div class="info-user">
      <img src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created|showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img src="item" v-for="(item,index) in commentInfo.images" :key="index" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from '@/common/utils.js'
export default {
  name: "DetailcommentInfo",
  created() {},
  data() {
    return {};
  },
  props: {
    commentInfo:{
      type:Object,
      defaule(){
        return {}
      }
    }
  },
  filters:{   //
    showDate:function(value){
      let date = new Date(value*1000);
        return formatDate(date,'YYYY/MM/dd')
    }
  },
  methods: {},
};
</script>

<style  scoped>
.comment-into{
  padding:5px 12px;
  color: #333;
  border-bottom: 5px solid #f2f5f8;
}
.info-heard{
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgba(0,0,0,.1);
}
.heard-title{
  float: left;
  font-size: 15px;
}
.heard-more{
  float: right;
  margin-right: 10px;
  font-size: 13px;
}
.info-user{
  padding: 10px 0 5px;
}
.info-user img{
  width: 42px;
  height: 48px;
  vertical-align: middle;
  border-radius: 50%;
}
.info-user span{
  position: relative;
  font-size: 18px;
  top: 10px;
  margin-left: 10px;
}
.info-detal{
  padding: 0 5px 15px;
}
.info-detal p{
  font-size: 14px;
  color: #777;
  line-height: 1.5;
}
.info-detal .info-other{
  font-size: 12px;
  color:#999;
  margin-top: 10px;
}
.info-other .date{
  margin-right: 8px;
}
.info-imgs{
  margin-top: 10px;
}
.info-imgs img{
  width: 70px;
  height: 70px;
  margin-right: 5px;
}
</style>