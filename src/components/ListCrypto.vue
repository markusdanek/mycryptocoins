<template>
  <div>
    <!-- <pre>
      {{ $data }}
    </pre> -->
    <div v-for="crypto in getCurrencies" :key="crypto.symbol">
      <div v-for="coin in crypto" :key="coin.symbol">
        {{coin.symbol}} - {{coin.price}}
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: mapGetters([
    'getCurrencies'
  ])
}
</script>

<style lang="scss">
</style>
