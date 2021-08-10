<template>
    <div class="container">
        <Header></Header>
        <router-view></router-view>
        <Footer></Footer>
    </div>

</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  components: { Header },
    name: "Home",
    components: {
        Header,
        Footer
    }
}

</script>
