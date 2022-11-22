<template>
  <div class="tabs">
    <v-tabs>
      <van-tabbar route :fixed="false">
        <v-tab
          ><van-tabbar-item to="/bbs/index/responseTime"
            >回复时间</van-tabbar-item
          ></v-tab
        >





   





        <v-tab
          ><van-tabbar-item to="/bbs/index/publishedTime"
            >发布时间</van-tabbar-item
          ></v-tab
        >
      </van-tabbar>
    </v-tabs>

    <div class="mdui-container">
      <div class="mdui-fab-wrapper" id="fab">
        <!-- //发布 -->
        <v-speed-dial
          v-model="fab"
          :top="top"
          :bottom="bottom"
          :right="right"
          :left="left"
          :direction="direction"
          :open-on-hover="hover"
          :transition="transition"
        >
          <template v-slot:activator>
            <v-btn v-model="fab" color="pink accent-2" dark fab>
              <v-icon v-if="fab">mdi-chevron-up</v-icon>
              <v-icon v-else>mdi-plus</v-icon>
            </v-btn>
          </template>
           <!-- //发布图片-->
          <v-btn  @click.stop="sendAnImageArticle()" fab dark small color="green">
            <v-icon>mdi-camera</v-icon>
          </v-btn>
          <v-btn fab dark small color="indigo">
              <!-- //发布视频 -->   
            <router-link to="/demo"><v-icon color="white">mdi-video</v-icon></router-link>
          </v-btn>
          <v-btn @click.stop="topFunction" fab dark small color="red">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-speed-dial>
      </div>
    </div>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>



<script>
import Navigation from "@/components/Navigation";
export default {
    components: {
    Navigation,
  },
  data() {
    return {
      direction: "top",
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: "slide-y-reverse-transition",
    };
  },
  methods: {
    // 点击按钮，返回顶部
    topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    // 发送图像文章
    sendAnImageArticle(){
        this.$router.push("/sendAnImageArticle")
    }
  },
};
</script>

<style lang="less" scoped>
.jiahao {
  background: pink;
}
.mdui-ripple {
  padding: 8px;
}
.tabs {
  // padding-top: 64px;
}
</style>