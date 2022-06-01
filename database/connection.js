const {Sequelize} = require("sequelize")
const sequelize = new Sequelize("newtech" , "root" , "kaboi" ,{dialect:"mysql" , host:"localhost"})
module.exports = sequelize