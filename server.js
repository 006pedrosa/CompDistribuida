var express = require('express')
var app = express();
var bodyParser = require('body-parser')

//CONFIGURACAO DO BODY-PARSER
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//PORTA QUE SERA UTILIZADA PARA RECEBER A CONEXÃO
var port = process.env.port || 8000;

//Criando uma instancia da rota via express
var router = express.Router();

router.get('/', function(req, res){
    res.json({message: "Conectando no aplicataivo de registro de pagamentos"})
});

//PADRAO DE PRE-FIXO DA ROTA
app.use('/pagamentoapi', router);

app.listen(port);
console.log("Iniciando api pela porta "+ port); 