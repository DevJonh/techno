export default {
    filters: {
        numeroPreco(valor) {
            let novoValor = Intl.NumberFormat('pt-br', {
                style: 'currency',
                currency: 'BRL'
            }).format(valor)
            if (isNaN(novoValor)) {

                return novoValor
            }
            //valor.toLocaleString("pt-BR", {
            //  style: "currency",
            //currency: "BRL"
            // });

        }
    },

}