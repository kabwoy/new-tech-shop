const Sequelize = require("sequelize")
const sequelize = require("../database/connection")

sequelize.define("sales",{

    id:{

        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    }

    

})