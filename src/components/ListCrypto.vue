<template>
  <div>
    <div v-for="(value, propertyName, index) in getHistoCurrencies">
      {{value.symbol}} - {{value.amount}} - <span @click="removeCrypto(value)">Remove</span>
    </div>
    <!-- <pre>
      {{getHistoCurrencies}}
    </pre> -->
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'list-crypto',
    computed: {
      ...mapGetters(['getCurrencies', 'getHistoCurrencies'])
    },
    methods: {
      removeCrypto(crypto){
        this.$store.dispatch('REMOVE_CRYPTO', crypto);
      }
    }
  }
</script>

<style lang="scss">
</style>
