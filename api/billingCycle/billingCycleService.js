const _ = require('lodash')
const BillingCycle = require('./billingCycle')

BillingCycle.methods(['get', 'post', 'put', 'delete']) //node-restuful cria todos os servicos rest
// get -> consultar
//post -> inserir
//put -> atualizar
//delete -> excluir
BillingCycle.updateOptions({new: true, runValidators: true})
//new sempre mostrar o novo
//runValidators valida a cada put

BillingCycle.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)
function sendErrorsOrNext(req, res, next){
  const bundle = res.locals.bundle

  if(bundle.errors){
    var errors = parseErrors(bundle.errors)
    res.status(500).json({errors})
  } else {
    next()
  }
}

function parseErrors(nodeRestfulErrors){
  const errors = []
  _.forIn(nodeRestfulErrors, error => errors.push(error.message))
  return errors
}

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
