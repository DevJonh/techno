<template >
  <div class="produtos">
    <li
      @click="abrirModal(item.id)"
      v-for="item in listaProdutos"
      :key="item.id"
      class="produto"
      :id="item.id"
    >
      <img :src="item.img" :alt="item.nome" :class="item.id" />
      <div :class="item.id" class="info">
        <p :class="item.id">{{item.preco | numeroPreco}}</p>
        <h2 :class="item.id">{{item.nome}}</h2>
      </div>
    </li>

    <ProdutoDetalhes
      :detalhes="detalhes"
      :produto="produto"
      @detalhesFechou="produto = $event"
      class="details"
    ></ProdutoDetalhes>
  </div>
</template>

<script>
import ProdutoDetalhes from "./ProdutoDetalhes.vue";
import mixins from "../mixins";
//import barramento from "../barramento";
export default {
  components: { ProdutoDetalhes },
  mixins: [mixins],
  data() {
    return {
      listaProdutos: [],
      detalhes: {},
      carrinho: [],
      produto: false
    };
  },
  methods: {
    fetchProdutos() {
      fetch("api/produtos.json")
        .then(Response => Response.json())
        .then(p => (this.listaProdutos = p));

      return this.listaProdutos;
    },
    fetchProduto(id) {
      fetch(`./api/produtos/${id}/dados.json`)
        .then(r => r.json())
        .then(r => (this.detalhes = r));

      return this.detalhes;
    },
    abrirModal(id) {
      //const id = this.listaProdutos.map(p => p.id);
      this.fetchProduto(id);
      this.produto = true;
      //window.scrollTo({
      //top: 0,
      //behavior: "smooth"
      //});
    }
  },
  created() {
    this.fetchProdutos();
  }
};
</script>

<style scoped>
.produtos {
  width: 80%;
  margin: 90px auto 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.produto {
  width: 900px;
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 0;
  cursor: pointer;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.1);
}
.produto:hover {
  background: rgba(0, 0, 0, 0.1);
}
.produto img {
  width: 300px;
  max-width: 100%;
  margin-right: 40px;
}
.produto .info h2 {
  font-size: 48px;
}
.produto .info p {
  font-size: 16px;
  text-align: left;
}
.details::before {
  content: "";
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate3d(50px, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0px, 0, 0);
  }
}
</style>