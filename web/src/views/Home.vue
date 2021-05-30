<template>
  <div class="home">
    <router-view></router-view>
    <nav-header></nav-header>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'

export default {
  name: 'Home',
  components: {
    NavHeader,
    NavFooter
  }
}
</script>

<style scoped>

</style>
