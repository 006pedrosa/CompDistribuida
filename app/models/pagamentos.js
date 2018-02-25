var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
* Pagamento:
*   id: int
*   valor: Number
*   data_pagamento: Date
*   tipo_pagamento: string
*/

var PagamentoSchema = new Schema({
    valor: Number,
    data_pagamento: Date,
    tipo_pagamento: String
});

module.exports = mongoose.model('Pagamento', PagamentoSchema);