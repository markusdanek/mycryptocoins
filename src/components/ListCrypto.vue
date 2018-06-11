<template>
  <div>
    <div v-for="(value, key) in getCoins">
      <img :src="imageUrl(value.symbol)" alt="" width="20" />
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
      State:
      {{getCoins}}
    </pre>
  </div>
</template>

<script>
  import _ from 'lodash'
  import {mapGetters} from 'vuex';
  import {images} from '../helpers/coinIcons';

  export default {
    name: 'list-crypto',
    computed: {
      ...mapGetters(['getCoins'])
    },
    methods: {
      imageUrl(symbol) {
        return _.get(images, symbol);
      },
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
