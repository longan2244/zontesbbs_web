<template>
  <div>
    <v-list dense nav class="py-0">
      <v-list-item two-line :class="'px-0'">
        <v-list-item-avatar>
          <img :src="avatar" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ NickName }}</v-list-item-title>
          <v-list-item-subtitle>{{ SignaTure }}</v-list-item-subtitle>
          <v-list-item-subtitle
            >共有 {{ Followers }}个追随者 <br />
            共有{{ Following }}个关注</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <!-- //按钮 -->
      <div class="buttonGroupsU">
        <v-list-item
          @click.stop="quit(item.title)"
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>
  </div>
</template>

<script>
import bus from "@/tool/EventBus.js";
import { userinfoAPI } from "@/API/bbs/index";
export default {
  data() {
    return {
      Followers:0,
      Following:0,
      items: [
        { title: "签到", icon: "mdi-flag" },
        { title: "关注", icon: "mdi-account-multiple" },
        { title: "粉丝", icon: "mdi-account-star" },
        { title: "帖子", icon: "mdi-clipboard-check-multiple-outline" },
        { title: "编辑资料", icon: "mdi-pencil-outline" },
        { title: "设置", icon: "mdi-cog-outline" },
        { title: "退出登录", icon: "mdi-close-circle-outline" },
      ],
      avatar: "",
      NickName: "",
      SignaTure: "签名也是一种态度...",
    };
  },
  methods: {
    // 获取用户基本信息资料
    getinitinfo() {
      try {
        bus.$on("userinfo", async (info) => {
          let { data } = await userinfoAPI(0, info.UserCode, 0);
          //  设置基本资料
          this.setuserinfo(data.MainPage[0]);
        });
      } catch (error) {
        console.log(error);
      }
    },
    //设置基本资料
    setuserinfo(data) {
      //console.log(data);
      // console.log(data);
      this.avatar = data.UserProfile;
      this.NickName = data.NickName;
      this.SignaTure = data.SignaTure;
      this.Followers=data.Followers;
      this.Following=data.Following;
      // localStorage.setItem("usercode",data.UserId)
    },
    //退出
    bt(title){
      switch(title){
        case "退出登录":
          this.quit()
        break
      }
    },
    quit(){
      localStorage.clear()
      this.$router.push("/")
    }
  },

  created() {
    this.getinitinfo();
  },
};
</script>

<style lang="less" scoped>
.v-list--nav .v-list-item {
  padding: 14px;
}
</style>