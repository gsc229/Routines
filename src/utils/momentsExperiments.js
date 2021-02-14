const moment = require('moment')

const now = moment()

const value = now.startOf('month').startOf('week').format('ddd MMM Do YYY')

console.log({value})