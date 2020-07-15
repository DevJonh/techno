import Vue from 'vue'
export default new Vue({
    methods: {

        informar({
            nome,
            preco,
        }) {
            this.$emit('receberItem', {
                nome,
                preco,
            })
        },
        armazenar(callback) {
            this.$on('receberItem', callback)
        },
        qtdCarrinho([itens]) {
            this.$emit('estadoCarrinho', [itens])
        },
        dadosCarrinho(callback) {
            this.$on('estadoCarrinho', callback)
        }
    },
})