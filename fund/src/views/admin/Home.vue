<template>
  <div>
    <nav-header></nav-header>
    <div class="main">
      <nav-menu class="left"></nav-menu>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from '@/components/admin/NavHeader'
import NavFooter from '@/components/admin/NavFooter'
import NavMenu from '@/components/admin/NavMenu'

export default {
  components: {
    NavHeader,
    NavFooter,
    NavMenu
  }
}
</script>

<style scoped>
.main {
  display: flex;
  min-height: 650px;
}

.left {
  flex: 1;
}

.right {
  flex: 5;
  margin: 10px 0 10px 10px;
  background-color: #fff;
  padding: 10px;
}
</style>