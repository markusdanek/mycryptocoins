<template>
  <div>
    <div id="hero">
      <div class="container">
        <h1>myCrypto<span>Coins</span></h1>
        <p>A simple and fast portfolio app to give you an overview of your cryptocurrency assets.</p>
      </div>
    </div>
    <router-view/>
    <div id="footer">
      Developed by <a target="_blank" href="https://www.linkedin.com/in/madanek">Markus Danek</a>.
      Vue.js project on <a target="_blank" href="https://github.com/markusdanek/mycryptocoins">Github</a> available.
    </div>
  </div>
</template>

<style lang="scss">
  body {
    font-family: 'Poppins', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #FEFEFE;
    color: #2c3e50;
  }
  #hero {
    height: 30vh;
    padding: 60px 0;
    text-align: center;
    background-image: linear-gradient(150deg, #2d1582 0%, #19a0ff 100%);
    background-repeat: repeat-x;
    h1 {
      font-family: 'Poppins';
      font-size: 3rem;
      font-weight: 700;
      color: #FFF;
      margin-bottom: 0.5rem;
      span {
        color: #ffc107;
      }
    }
    p {
      color: rgba(255, 255, 255, 0.7);
    }
  }
  #footer {
    position: absolute;
    bottom: 5px;
    left: 0%;
    right: 0%;
    text-align: center;
    color: #CCC;
    font-size: 14px;
    a {
      text-decoration: none;
      color: inherit;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .container {
      padding: 20px 20px 0 20px;
    }
  }
</style>
