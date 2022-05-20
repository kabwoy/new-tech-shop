const Sequelize = require("sequelize")
const sequelize = new Sequelize("newtech" , "kabwoy" , "password" , {dialect:"mysql" , host:"localhost"})
module.exports = sequelize