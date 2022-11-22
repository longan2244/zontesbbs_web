<template>
  <div>
    <!-- 头部 -->
    <div class="mdui-appbar">
      <div style="display: none">
        <Loding></Loding>
      </div>
      <div class="mdui-toolbar mdui-color-theme">
        <a href="javascript:;" class="mdui-btn mdui-btn-icon">
          <i class="mdui-icon material-icons">menu</i>
        </a>
        <a href="javascript:;" class="mdui-typo-headline">登录</a>
      </div>
    </div>
    <!-- 登录 -->
    <div class="loginbox">
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">账号</label>
        <input
          v-model="name"
          class="mdui-textfield-input"
          type="text"
          required
        />
        <div class="mdui-textfield-error">账号不能为空</div>
      </div>
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">密码</label>
        <input
          v-model="pwd"
          class="mdui-textfield-input"
          type="text"
          required
        />
        <div class="mdui-textfield-error">密码不能为空</div>
      </div>
      <span class="mdui-clearfix mdui-p-a-2">
        <button
          class="
            loginbt
            mdui-btn
            mdui-btn-raised
            mdui-btn-dense
            mdui-color-theme-accent
            mdui-ripple
            mdui-float-right
          "
          @click="login"
        >
          登录
        </button></span
      >
    </div>
    <!-- <router-link to="/bbs"><button>按钮</button></router-link> -->
    <br />
    <br />
    <br />
    <br />
    <Snackbar ref="child"></Snackbar>
  </div>
</template>
<script>
import Loding from "@/components/loding.vue";
import Snackbar from "@/components/snackbar.vue";
import { loginAPI } from "@/API/bbs/index.js";
export default {
  data() {
    return {
      name: "",
      pwd: "",
    };
  },
  methods: {
    async login() {
      if (this.name == "" || this.pwd == "") {
        return this.msg("用户名或密码不能为空");
      }
      let { data: res } = await loginAPI(this.name, this.pwd);
      if (res.result == "fail") return this.msg(res.failmsg);
      if (res.status == "0") {
        this.msg("成功登录");
        // 登录成功处理
        this.loginOK(res);
      }
    },
    loginOK(res) {
      //保存token
      localStorage.setItem("token", res.Nodetoken);
      //保存升仕摩托车token
      localStorage.setItem("ZTtoken", res.data.SingnCode);
      //保存登录状态
      // localStorage.setItem("isLogin", res.data.isLogin);
      //保存用户名
      localStorage.setItem("usercode", res.data.UserCode);
      // 跳转
      this.$router.push("/bbs/index/responseTime");
    },
    msg(str) {
      this.$refs.child.prinsnackbar(str, true);
    },
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$router.push("/bbs/index/responseTime");
    }
  },
  components: {
    Loding,
    Snackbar,
  },
};
</script>

<style lang="less" scoped>
.loginbox {
  padding: 20px;
}
</style>
