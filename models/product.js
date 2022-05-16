const Sequelize = require("sequelize")
const sequelize = require("../database/connection")

const Product = sequelize.define("product" , {

    id:{

        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
        
    },

    name:{

        type:Sequelize.STRING,
        allowNull:false,

    },

    price:{

        type:Sequelize.INTEGER,
        allowNull:false,  
    },

    image:{

        type:Sequelize.TEXT,
        allowNull:true,


    },

    description:{

        type:Sequelize.TEXT,
        allowNull:false

    },

    category:{

        type:Sequelize.STRING,
        allowNull:false
    },

})

module.exports = Product
