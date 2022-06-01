const {Sequelize} = require("sequelize")
const sequelize = require("../database/connection")

const  User = sequelize.define("user" , {

    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },

    username:{

        type: Sequelize.STRING,
        allowNull: false

    },

    email:{
        type:Sequelize.STRING,
        allowNull:false,

    },

    password:{

        type:Sequelize.TEXT,
        allowNull:false,

    },

    firstname:{

        type:Sequelize.STRING,
        allowNull:false
    },

    lastname:{

        type:Sequelize.STRING,
        allowNull:false,
    },

    contact:{

        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports = User