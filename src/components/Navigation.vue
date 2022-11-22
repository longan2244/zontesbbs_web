<template>
<div class="navbox">
    <v-card>
    <!-- 状态栏 -->
    <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->
    <!-- 头部 -->
    <v-app-bar height="56" color="deep-purple accent-4" dark prominent>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Zontes吧</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <span class="mdmag">
          <v-icon>mdi-bell-outline</v-icon>
          <v-badge color="pink" :content="unreadSum"></v-badge>
        </span>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <!-- 侧边栏 -->
      <Myinfo></Myinfo>
    </v-navigation-drawer>
    <!-- 路由文件 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </v-card>
</div>
</template>


<script>
import Myinfo from "@/components/Myinfo";
import bus from "@/tool/EventBus.js";
export default {
  data() {
    return {
      drawer: null,
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" },
      ],
      // 未读消息
      unreadSum:'0'
    };
  },
  methods: {
    // 得到消息
    getMSg() {
      try {
        bus.$on("userMSg", (MSg) => {
         this.setMSg(MSg)
        });
      } catch (error) {}
    },
    //设置消息
    setMSg(MSg) {
      // unreadAT;
      // unreadCM;
      // unreadLikeSum;
      this.unreadSum=MSg.unreadSum
    },
  },
  created() {
    this.getMSg();
  },
  components: {
    Myinfo,
  },
};
</script>

<style lang="less" scoped>
.v-toolbar__content {
  height: 56px !important;
}
.mdmag {
  margin-bottom: 2px;
}
.navbox>div{
  min-height: 100vh;
  // width: 100vh;
}
</style>

