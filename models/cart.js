const {Sequelize , DataTypes} = require("sequelize")
const sequelize = require("../database/connection")

const Cart = sequelize.define("cart" , {

    id:{

        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },

    quantity:{

        type:Sequelize.INTEGER,
        defaultValue:1,
    }
   
})

module.exports = Cart