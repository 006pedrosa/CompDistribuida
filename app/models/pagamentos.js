import { Double } from '../../../../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/bson';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
* Pagamento:
*   id: int
*   valor: double
*   data_pagamento: date
*   tipo_pagamento: string
*/

var PagamentoSchema = new Schema({
    valor: Number,
    data_pagamento: Date,
    tipo_pagamento: String
});

module.exports = mongoose.model('Pagamento', PagamentoSchema);