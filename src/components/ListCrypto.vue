<template>
  <div>
    <div v-for="(value, key) in getCoins">
      {{value.symbol}} - {{value.amount}}
      <div v-for="(asdf, key) in value.historic">
        <div v-for="(as, key) in asdf">
          <div v-if="key==0">
            {{as.value}} - <span @click="removeCrypto(value)">Remove</span>
          </div>
        </div>
      </div>
    </div>

    <pre>
      {{getCoins}}
    </pre>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'list-crypto',
    computed: {
      ...mapGetters(['getCoins'])
    },
    methods: {
      cryptoState(){
        console.log(this.$store.state.crypto);
      },
      removeCrypto(crypto){
        this.$store.dispatch('REMOVE_CRYPTO', crypto);
      }
    },
    mounted() {
      this.cryptoState();
    }
  }
</script>

<style lang="scss">
</style>
