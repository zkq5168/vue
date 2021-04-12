<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
}
</script>

<style>
/* * {
  margin: 0;
  padding: 0;
} */

body {
  background-color: #eee;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
  color: #000;
}

/* a:hover {
  color: rgb(72, 60, 185);
} */
</style>