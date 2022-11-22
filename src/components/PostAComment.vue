<template>
  <div>
    <div class="mdui-fab-wrapper popUpLayers"  id="exampleFab">
      <v-but @click="ISshutDown = !ISshutDown">关闭</v-but>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="less" scoped>
.popUpLayers {
  background-color: whitesmoke;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  transition:  all 0.5s;
}
</style>