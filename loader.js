const s = require('./config/server')
require('./config/database')
require('./config/routes')(s) //passando server por parametro
