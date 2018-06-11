<template>
  <div class="container">
    <div id="nav">
      <h1>myCryptoCoins</h1>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Poppins', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  text-align: center;
  padding: 30px;
  h1 {
    font-size: 2rem;
    color: #377dff;
    font-weight: 700;
  }
}
</style>
