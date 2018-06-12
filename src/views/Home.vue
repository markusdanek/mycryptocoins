<template>
  <div class="home">
    <AddCrypto />
    <ListCrypto />

    <div class="container">
      <div class="debugging">
        <b-collapse :open="false" class="card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">State</p>
          </div>
          <div class="card-content">
            <div class="content">
              <pre>{{ getCoins }}</pre>
            </div>
          </div>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import AddCrypto from '@/components/AddCrypto'
  import ListCrypto from '@/components/ListCrypto'

  export default {
    name: 'home',
    components: {
      AddCrypto,
      ListCrypto
    },
    computed: {
      ...mapGetters(['getCoins'])
    },
  }
</script>

<style lang="scss">
  .debugging {
    display: none;
    margin-top: 100px;
  }
</style>
