<template>
  <div class="modal" v-if="produto">
    <div class="modal_container">
      <button class="close" @click="fecharModal">X</button>
      <div class="img">
        <img :src="detalhes.img" :alt="detalhes.nome" />
      </div>
      <div class="desc">
        <span>{{detalhes.preco | numeroPreco}}</span>
        <h2>{{detalhes.nome}}</h2>
        <p>{{detalhes.descricao}}</p>
        <button v-if="detalhes.estoque > 0" @click="addItem">Adicionar Item</button>
        <button v-else class="modal_btn esgotado" disabled>Produto Esgotado</button>
        <div class="avaliacoes">
          <h2>Avaliações</h2>
          <ul>
            <li v-for="(avaliacao, index) in detalhes.avaliacoes" :key="index">
              <p>{{avaliacao.descricao}}</p>
              <p class="autor">{{avaliacao.nome}} | {{avaliacao.estrelas}} estrelas</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="alerta" v-show="mensagemAlerta !== null">
      <p class="alerta_mensagem">{{mensagemAlerta}}</p>
    </div>
  </div>
</template>

<script>
import barramento from "../barramento";
import mixins from "../mixins";
//import barramento from "../barramento";
export default {
  mixins: [mixins],
  props: {
    detalhes: Object,
    produto: Boolean
  },
  data() {
    return {
      itens: [],
      mensagemAlerta: null
    };
  },
  methods: {
    fecharModal() {
      this.product = false;
      this.$emit("detalhesFechou", this.product);
    },
    addItem() {
      this.itens = this.detalhes;
      this.itens.estoque--;
      this.product = true;
      this.alerta(`${this.itens.nome} adicionado ao carrinho`);
      barramento.informar(this.itens);
    },
    alerta(mensagem) {
      this.mensagemAlerta = mensagem;
      setTimeout(() => {
        this.mensagemAlerta = null;
      }, 1500);
    }
  }
};
</script>

<style scoped>
.modal_container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  background: linear-gradient(to right, transparent 27%, white 27%);
  z-index: 1;
  align-items: end;
  padding: 50px 50px 50px 0;
  animation: fadeIn 0.3s forwards;
}
.modal {
  position: absolute;
  align-items: end;
  padding: 0px 50px 0px 0;
  animation: fadeIn 0.3s forwards;
  z-index: 10;
}
.close {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid #000;
  width: 30px;
  height: 30px;
  position: absolute;
  top: -10px;
  right: 10px;
  font-size: 1rem;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.img {
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2);
  margin-right: 40px;
}
.img img {
  max-width: 300px;
  display: block;
}
.desc {
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.desc span {
  margin: 150px 0 0px;
}
.desc h2 {
  z-index: -5;
  font-size: 3rem;
  text-align: left;
  margin: 0 0 40px;
}
.desc p {
  text-align: left;
}
.desc button {
  margin-top: 40px;
  background: #000;
  cursor: pointer;
  color: #ffffff;
  border: none;
  font-size: 1rem;
  padding: 10px 25px;
  font-family: "Noto Serif";
}
.modal_btn.esgotado {
  background: #808080;
}
.avaliacoes h2 {
  font-size: 1.75rem;
  margin: 40px 0 10px;
}

.avaliacoes li {
  list-style: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px 0 20px;
  text-align: left;
}

.avaliacoes p {
  color: rgba(0, 0, 0, 0.7);
  margin: 20px 0 5px 0;
}
.avaliacoes .autor {
  font-weight: bold;
  color: #000;
  margin-top: 0;
}

.alerta_mensagem {
  background: #ffffff;
  display: inline-block;
  padding: 20px 40px;
  border: 2px solid black;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2);
}
.alerta {
  position: absolute;
  top: -100px;
  left: 0px;
  z-index: 10;
  width: 100%;
  text-align: center;
  display: block;
  animation: fadeInDown 0.3s forwards;
}
@keyframes fadeInDown {
  from {
    transform: translate3d(0, -30px, 0);
    opacity: 0;
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0px, 0);
  }
}
</style>