var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Pagamento = require('./app/models/pagamentos');

mongoose.connect('mongodb://pedrosa:963258741@ds143678.mlab.com:43678/heroku_38gx7b12', {
    useMongoClient:true
});

//CONFIGURACAO DO BODY-PARSER
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//PORTA QUE SERA UTILIZADA PARA RECEBER A CONEXÃO
var port = process.env.port || 8000;

//Criando uma instancia da rota via express
var router = express.Router();

router.route('/pagamentos')

//POST - CRIAR PAGAMENTO NO BANCO
  .post(function(req, res){
      var pagamento = new Pagamento();

      pagamento.valor = req.body.valor;
      pagamento.data_pagamento = Date.now();
      pagamento.tipo_pagamento = req.body.tipo;

      pagamento.save(function(error){
        if(error){
            res.send('Erro ao tentar salvar o pagamento ' + error);
        }else{        
            res.json({message: 'Pagamento salvo!'});
        }

      });
  })

  //GET ALL - SELECIONAR TODOS OS DADOS DE PAGAMENTO DO BANCO
  .get(function(req, res){
        Pagamento.find(function(error, pagamentos){
            if(error){
                res.send('Erro ao tentar salvar o pagamento ' + error);
            }else{        
                res.json(pagamentos);
            }
        });
  });

router.use(function(req, res, next){
    console.log('Midleware executando');
    next();
});

router.get('/', function(req, res){
    res.json({message: "Conectando no aplicativo de registro de pagamentos"})
});

//PADRAO DE PRE-FIXO DA ROTA
app.use('/pagamentoapi', router);

app.listen(port);
console.log("Iniciando api pela porta "+ port); 