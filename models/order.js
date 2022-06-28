const Sequelize = require("sequelize")
const sequelize = require("../database/connection")

const Order = sequelize.define("order" , {

    id:{

        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
    },

    quantity:{

        type:Sequelize.INTEGER,
        allowNull:false,
    }


})

module.exports = Order