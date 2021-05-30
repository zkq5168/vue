<template>
    <div class="simple-home">
        <simple-header></simple-header>
        <router-view></router-view>
        <simple-footer></simple-footer>
    </div>
</template>

<script>
import SimpleHeader from '@/components/SimpleHeader'
import SimpleFooter from '@/components/SimpleFooter'
// import NavHeader from '@/components/NavHeader'
// import NavFooter from '@/components/NavFooter'

export default {
    name: 'SimpleHome',
    components: {
        SimpleHeader,
        SimpleFooter
    }
}
</script>
