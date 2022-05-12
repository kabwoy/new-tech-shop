const Sequelize = require("sequelize")
const sequelize = new Sequelize("new-tech" , "root" , "kaboi" , {dialect:"mysql" , host:"localhost"})
module.exports = sequelize