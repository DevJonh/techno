<template>
  <div id="app">
    <app-header></app-header>
    <produtos></produtos>
  </div>
</template>

<script>
import AppHeader from "./components/Header.vue";
import Produtos from "./components/Produtos.vue";
//import barramento from "./barramento";
export default {
  props: { carrinho: Array },
  name: "App",
  components: {
    AppHeader,
    Produtos
  },
  methods: {
    //checarLocalStorage() {
    //if (window.localStorage.carrinho) {
    //barramento.dadosCarrinho(itens => {
    // window.localStorage.itens = JSON.stringify(itens);
    //});
    //this.itens = JSON.parse(window.localStorage.itens);
    //}
    //}
  }
  //created() {
  //this.checarLocalStorage();
  //}
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Noto Serif";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background: linear-gradient(to right, #1a1a1a 30%, #ffffff 30%);
}
</style>
