<template>
  <div class="header">
    <img src="@/assets/techno.svg" />
    <div @click="abrir" class="carrinho">
      <p>{{totalCarrinho | numeroPreco}}| {{itens.length}}</p>
    </div>
    <carrinho
      :aberto="abrirCarrinho"
      :carrinho="itens"
      :totalCarrinho="totalCarrinho"
      :produtos="product"
      @carrinhoFechou="abrirCarrinho = $event"
    ></carrinho>
  </div>
</template>

<script>
import Carrinho from "./Carrinho.vue";
import barramento from "../barramento";
import mixins from "../mixins";
export default {
  components: { Carrinho },
  mixins: [mixins],
  data() {
    return {
      itens: [],
      abrirCarrinho: false,
      product: ""
    };
  },
  computed: {
    totalCarrinho() {
      let total = 0;
      if (this.itens.length) {
        this.itens.forEach(item => {
          total += item.preco;
        });
      }
      return total;
    }
  },
  methods: {
    abrir() {
      this.abrirCarrinho = true;
    }
  },

  created() {
    barramento.armazenar(itens => {
      this.product = true;
      this.itens.push(itens);
    });
  }
};
</script>

<style scoped>
.header {
  width: 72%;
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
  padding: 0 30px;
}
.header img {
  width: 80px;
}
.carrinho {
  font-size: 18px;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
}
.carrinho span {
  font-weight: 400;
  vertical-align: inherit;
}
.carrinho p {
  margin-right: 35px;
  vertical-align: inherit;
}
.carrinho p::after {
  content: url("../assets/carrinho.svg");
  position: absolute;
  right: 5px;
}
</style>