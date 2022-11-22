<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          Click Me
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          公告
        </v-card-title>

        <v-card-text>
          <br>
          <h2 style="color: red;">软件会登录官方账号</h2>
          <br>
          <h2 style="color: red;">本软件不会收集任何用户数据(确定即同意)</h2>
          <br>
          <strong>
            本站所出品软件仅为开源工具，并非改变数据类软件，也不会收集任何用户数据，严禁利用本软件侵犯他人隐私权，如软件使用者不能遵守此规定，
            请立即删除，对于因用户使用本软件而造成自身或他人隐私泄露，等任何不良后果，均由用户自行承担，软件作者不负任何责任。
            如果用户不接受本协议，请立即删除。</strong
          >
         
          <ul>
             <h3>#####已知Bug#####</h3>
            <li>评论页可能点赞失败</li>
            <li>部分界面会因为物理返回键而失效</li>
            <li>部分用户的评论未能显示</li>
            <li>部分用户发布的图片未能显示</li>
            <li>部分用户发布的视频未能完整显示</li>
            <li>部分用户发布的视频未能完整显示</li>
            <li>对评论点赞显示可能出现问题(实际功能完好)</li>
             <h3>#####暂未做功能#####</h3>
              <li>个人中心</li>
              <li>表情</li>
             <li>回复评论</li>
             <li>自动签到</li>
             <li>修改资料</li>
             <li>搜索帖子</li>
             <li>分享帖子(本站)</li>
          </ul>
         
          
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: true,
    };
  },
};
</script>

<style lang="less" scoped>

</style>