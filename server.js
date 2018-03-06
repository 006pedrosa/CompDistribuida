var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Pagamento = require('./app/models/pagamentos');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://pedrosa:963258741@ds143678.mlab.com:43678/heroku_38gx7b12', {
    useMongoClient:true
});
//CONFIGURACAO DO BODY-PARSER
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//PORTA QUE SERA UTILIZADA PARA RECEBER A CONEXÃO
app.set('port', (process.env.PORT || 5000));

//Criando uma instancia da rota via express
var router = express.Router();

router.route('/pagamentos')

//POST - CRIAR PAGAMENTO NO BANCO
  .post(function(req, res){
      var pagamento = new Pagamento();

      pagamento.valor = req.body.valor;
      pagamento.data_pagamento = Date.now();
      pagamento.tipo_pagamento = req.body.tipo_pagamento;

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

router.route('/pagamentos/:pagamento_id')

  //PROCURA APENAS POR UM PAGAMENTO DADO UM DETERMINADO ID
  .get(function(req, res){
      Pagamento.findById(req.params.pagamento_id, function(error, pagamento){
          if(error){
              res.send('Id do pagamento não encontrado');
          }else{
            res.json(pagamento);
          }
      });
  })

  //ATUALIZA UM PAGAMENTO
  .put(function(req, res){

    Pagamento.findById(req.params.pagamento_id, function(error, pagamento){
        if(error){
            res.send('Id do pagamento não encontrado');
        }else{
            if(req.body.valor != null){
                pagamento.valor = req.body.valor;
            }
            if(req.body.tipo_pagamento != null){
                pagamento.tipo_pagamento = req.body.tipo_pagamento;
            }
          pagamento.save(function(error){
              if(error){
                res.send('Erro ao tentar alterar o pagamento ' + error);
              }else{
                res.json({message: 'Pagamento alterado!'});  
              }
          });
        }
    });

  })

  .delete(function(req, res){
      
    Pagamento.remove({
        _id: req.params.pagamento_id
    }, function(error){
        if(error){
            res.send("Id do pagamento não encontrado : " + error);
        }else{
            res.json({message: 'Pagamento excluído!'});
        }
    
    });
  })

  router.route('/pagamentos/findinterval/:data_pagamento')

 .get(function(req, res){
     Pagamento.find({data_pagamento: {
        $gte: Date.parse(req.params.data_pagamento),
        $lt: Date.now()
      }
    }).exec(function(error, pagamentos){
        if(error){
            res.send("Intervalo inválido : " + error);
        }else{
            res.json(pagamentos);
        }
    })
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

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
console.log("Iniciando api pela porta "+ port); 