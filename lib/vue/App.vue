<template>
  <div id="app">
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
};
</script>

<style lang="scss">
@import './styles/index.scss';
</style>
