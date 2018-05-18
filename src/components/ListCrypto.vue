<template>
  <div>
    <pre>{{ $data }}</pre>

    <div v-for="price in crypto_prices" :key="price.name">
     Price: {{price}}
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: mapGetters([
    'crypto_prices'
  ])
}
</script>

<style lang="css">
</style>
