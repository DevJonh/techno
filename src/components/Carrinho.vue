<template>
  <div id="modal" v-if="aberto">
    <div class="carrinho">
      <button class="close" @click="fecharCarrinho">X</button>
      <h2>Carrinho</h2>
      <div class="list-car" v-if="listItem.length">
        <ul>
          <li v-for="(item, index) in listItem" :key="index">
            <p>{{item.nome}}</p>
            <p class="price">{{item.preco | numeroPreco}}</p>
            <button class="remove" @click="removerItem(index)">X</button>
          </li>
        </ul>
        <p class="carrinho_total">{{totalCarrinho | numeroPreco}}</p>
        <button class="carrinho_finalizar">Finalizar Compra</button>
      </div>
      <p v-else>O carrinho está vazio.</p>
    </div>
  </div>
</template>

<script>
//import barramento from "../barramento";
import mixins from "../mixins";
export default {
  props: {
    aberto: Boolean,
    carrinho: Array,
    product: Boolean,
    totalCarrinho: Number
  },
  mixins: [mixins],
  data() {
    return {
      listItem: [],
      abrirCarrinho: true,
      produtos: false
    };
  },
  filters: {
    numeroPreco(valor) {
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
    }
  },

  methods: {
    fecharCarrinho() {
      this.abrirCarrinho = false;
      this.$emit("carrinhoFechou", this.abrirCarrinho);
    },
    removerItem(index) {
      this.listItem.splice(index, 1);
    }
  },

  //watch: {
  //listItens() {
  //window.localStorage.itens = JSON.stringify(this.listItem);
  //barramento.qtdCarrinho(this.listItem);
  //}
  //},
  created() {
    this.listItem = this.carrinho;
  }
};
</script>

<style scoped>
#modal::before {
  content: "";
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}
#modal {
  box-sizing: border-box;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0px;
  left: 0px;
  width: 100%;
  padding: 20px;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2);
}
.carrinho {
  position: relative;
  margin: 80px auto;
  background: #ffffff;
  padding: 40px;
  max-width: 80%;
  width: 100%;
  animation: fadeInDown 0.3s forwards;
}
.close {
  border-radius: 50%;
  border: 2px solid #000;
  width: 30px;
  height: 30px;
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 1rem;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.carrinho h2 {
  margin-bottom: 10px;
  padding-bottom: 20px;
  border-bottom: 2px solid #000000;
}
.remove {
  position: absolute;
  right: 40px;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  background: transparent;
}
.price {
  text-align: right;
  margin-right: 30px;
}
.carrinho_total {
  text-align: right;
  padding: 10px 50px 10px 0;
  margin-bottom: 20px;
  border-bottom: 2px solid #000;
}
.carrinho_finalizar {
  display: block;
  margin-left: auto;
  background: #000;
  cursor: pointer;
  color: #ffffff;
  font-size: 1rem;
  padding: 10px 25px;
  border: none;
  font-family: "Noto Serif";
}
.carrinho li {
  list-style: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>