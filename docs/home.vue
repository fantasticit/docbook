<template>
  <div class="home">
    <img src="./doc.png" alt="">
    <h1>Docbook</h1>
    <p>静态文档站生成工具</p>
    <el-button type="primary" round @click="go">开始使用 <i class="el-icon-right"></i></el-button>
  </div>
</template>

<script>
export default {
  methods: {
    go() {
      this.$router.push('/doc')
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;

  img {
    display: inline-block;
    width: 50%;
    height: auto;
  }

  button {
    margin-top: 2rem;
  }
}
</style>
