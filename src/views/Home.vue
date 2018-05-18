<template>
  <div class="home">
    <AddCrypto />
    <ListCrypto />
  </div>
</template>

<script>
import AddCrypto from '@/components/AddCrypto'
import ListCrypto from '@/components/ListCrypto'

export default {
  name: 'home',
  components: {
    AddCrypto,
    ListCrypto
  }
}
</script>
