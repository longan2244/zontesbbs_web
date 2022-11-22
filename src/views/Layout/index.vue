<template>
<Navigation></Navigation>
        <!-- <router-link to="/bbs/userinfo">
          <v-avatar>
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
        </router-link> -->
</template>

<script>
import Navigation from "@/components/Navigation";
export default {
  components: {
    Navigation,
  },
};
</script>

<style scoped lang="less">
.v-application a {
  // color: #ffff !important;
}
.toptiele {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
}
.toptiele {
  background-color: white !important;
  // color: #ffff !important;
}
</style>
