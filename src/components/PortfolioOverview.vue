<template>
  <div class="columns coin-item">
    <div class="column is-two-fifths" v-for="(value, key) in getCoins">
      <img :src="imageUrl(value.symbol)" alt="" width="40" />
      {{value.amount}} {{value.symbol}}
    </div>

    <div class="column" v-for="(value, key) in getCoins">
      Purchase Date <br/>
      {{value.purchasedate | formatDate}}
    </div>

    <div class="column" v-for="(value, key) in getCoins">
      <div v-for="(asdf, key) in value.historic">
        <div v-for="(as, key) in asdf" v-if="key==0">
          Current value <br/>
          {{as.value}}
        </div>
      </div>
    </div>

    <div class="column" v-for="(value, key) in getCoins">
      <span @click="removeCrypto(value)">Remove</span>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
  }
</script>

<style lang="css">
</style>
