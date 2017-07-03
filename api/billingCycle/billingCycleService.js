const BillingCycle = require('./BillingCycle')

BillingCycle.methods(['get', 'post', 'put', 'delete']) //node-restuful cria todos os servicos rest
// get -> consultar
//post -> inserir
//put -> atualizar
//delete -> excluir
BillingCycle.updateOptions({new: true, runValidators: true})
//new sempre mostrar o novo
//runValidators valida a cada put

BillingCycle.route('count', function(req, res, next){
  BillingCycle.count(function(error, value){
    if(error) {
      res.status(500).json({errors: [error]})
    } else {
      res.json({value})
    }
  })
})
module.exports = BillingCycle
