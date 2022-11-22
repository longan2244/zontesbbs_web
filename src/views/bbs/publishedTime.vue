
:title="title"<template>
  <div>
    <!-- 上拉刷新 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- 按照发布时间 -->
      <List
        v-for="(item, index) in BlogList"
        :key="index"
        :CommentSum="item.CommentSum"
        :CreateTime="item.CreateTime"
        :ID="item.ID"
        :LikeSum="item.LikeSum"
        :MotoMsg="item.MotoMsg"
        :MyMotorCard="item.MyMotorCard"
        :NickName="item.NickName"
        :PicURL="item.PicURL"
        :PicturePath="item.PicturePath"
        :ShareSum="item.ShareSum"
        :UserCode="item.UserCode"
        :UserProfile="item.UserProfile"
        :VideoPath="item.VideoPath"
        :VideoURL="item.VideoURL"
        :ViewTime="item.ViewTime"
        :forumUserType="item.forumUserType"
        :iContent="item.iContent"
        :iLevel="item.iLevel"
        :isMyBlog="item.isMyBlog"
        :mType="item.mType"
        :shopUserType="item.shopUserType"
        :vcTile="item.vcTile"
        :isLikeBlog="item.isLikeBlog"
        :title="item.vcTile"
      ></List>
</van-list>
  </div>
</template>

<script>
import List from "@/components/List.vue";
import { getbbslistfortimeAPI } from "@/API/bbs/index.js";
export default {
  data() {
    return {
      // 下拉刷新
      list: [],
      loading: false,
      finished: false,
      //数据
      BlogList: [],
      lastID: "0",
    };
  },
  methods: {
    async onLoad() {
      if (this.ID != "0") {
        let { data } = await getbbslistfortimeAPI(this.lastID);
        this.BlogList = [...this.BlogList, ...data.BlogList];
        this.lastID = data.lastID;
        this.loading = false;
      }
    },
  },
  created() {
    // this.onLoad();
  },
  components: {
    List,
  },
};
</script>

<style>
/* // :LikeSum="item.LikeSum"
      // :NickName="item.NickName"
      // :PicURL="item.PicturePath"
      // :UserCode="item.UserCode"
      // :UserProfile="item.UserProfile"
      // :VideoURL="item.VideoURL"
      // :ViewTime="item.ViewTime" */
</style>
  