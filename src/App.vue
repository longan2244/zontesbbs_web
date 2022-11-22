<template>
<div>
 
  <v-app>
    <v-main>
      <keep-alive>
      <router-view/>
      </keep-alive>
    </v-main>
  </v-app>
</div>

</template>
<script>
// import { component } from 'vue/types/umd'

export default {
  name: 'App',

  data: () => ({
    //
  }),

}
</script>
