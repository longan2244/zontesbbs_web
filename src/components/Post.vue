<template>
  <div class="box">
    <!-- 作者文章 -->
    <div>
      <Posttiele @commentOnTheData="datasss" ref="table"></Posttiele>
    </div>
    <!-- 评论区 -->
    <div :key="messages.ID">
      <Userreviews :id="messages.ID"></Userreviews>
    </div>
    <!-- 用户评论点赞 -->
    <div class="mdui-fab-wrapper popUpLayers" v-if="ISshutDown" id="exampleFab">
      <SendAReplyToThePost
        :messages="messages"
        @delupWindow="type"
      ></SendAReplyToThePost>
    </div>
    <div class="mdui-fab-wrapper activateTheLayer" v-else id="exampleFab">
      <v-tabs fixed-tabs color="pink">
        <v-tab @click.stop="ISshutDown = !ISshutDown"
          >评论 {{ messages.CommentSum }}</v-tab
        >
        <v-tab @click.stop="likeadd"
          ><v-icon :color="messages.color" class="mr-1">mdi-heart</v-icon
          >{{ messages.LikeSum }}</v-tab
        >
      </v-tabs>
    </div>
  </div>
</template>
<script>
import Posttiele from "@/components/Postiele";
import Comments from "@/components/Comments";
import Userreviews from "@/components/Userreviews";
import SendAReplyToThePost from "@/components/SendAReplyToThePost";
import { likeMH } from "@/Public/PublicMethods.js";
// import bus from "@/tool/EventBus.js";
let that = this;
export default {
  data() {
    return {
      ISshutDown: false,
      messages: {},
    };
  },
  methods: {
    //获取点赞颜色
    like() {
      if (this.messages.likecolor == "white") {
        this.messages.likecolor == "#ccc";
      }
    },
    //增加点赞(后期修复bug，慎动)
    likeadd() {
      let add = {};
      likeMH(0, this.messages.ID)
        .then((resolve) => {
          let { data } = resolve;
          if (data.likeState == "add") {
            add = { color: "pink", LikeSum: data.likeSum };
          } else {
            add = { color: "#ccc", LikeSum: data.likeSum };
          }
          this.messages = { ...this.messages, ...add };
        })
        .catch((reject) => {});
    },
    //关闭弹窗
    type(booleanS) {
      this.ISshutDown = booleanS;
    },
    //儿组件传过来的messages
    datasss(val) {
      this.messages = val;
      this.like();
    },
  },
  components: {
    Posttiele,
    Comments,
    SendAReplyToThePost,
    Userreviews,
  },
  created() {
    that = this;
  },
  updated() {},
  // 暂时不会做
  mounted() {
    window.addEventListener("popstate", (e) => {
      e.preventDefault();
      this.ISshutDown = false;
    });
  },
};
</script>

<style lang="less" scoped>
.box {
  position: relative;
  margin-bottom: 120px;
}
/deep/.aaa {
  position: fixed !important;
  left: 0;
  bottom: 0;
  width: 100px;
  height: 20px;
}
.popUpLayers {
  background-color: #6200ea;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  transition: all 0.1s;
}
.activateTheLayer {
  background-color: white;
  width: 100vw;
  height: 56px;
  left: 0;
  bottom: 0;
  display: flex;
  padding-top: 0;
}
</style>


