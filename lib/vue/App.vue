<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <Header :logo="logo" :navs="navs" />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'app',
  components: {
    Header,
  },
  data() {
    return {
      logo: this.$config.logo || 'Logo',
      navs: this.$config.navs || [],
    };
  },
  mounted () {
    //  [App.vue specific] When App.vue is finish loading finish the progress bar
    this.$Progress.finish()
  },
  created () {
    this.$Progress.start()
    this.$router.beforeEach((to, from, next) => {
      if (to.hash) {
        next()
      } else {
        if (to.meta.progress !== undefined) {
          let meta = to.meta.progress
          this.$Progress.parseMeta(meta)
        }
        this.$Progress.start()
        next()
      }
    })
    this.$router.afterEach((to, from) => {
      this.$Progress.finish()
    })
  }
};
</script>

<style lang="scss">
@import './styles/index.scss';
</style>
