const express = require("express")
const sequelize = require("./database/connection")
const Product = require("./models/product")
const productRoutes = require("./routes/product-routes")
const path = require("path")
const app = express()

app.set("view engine" , "ejs")
app.set('views' , path.join(__dirname , "views"))

app.use(express.urlencoded({extended:true}))
app.use(productRoutes)


sequelize.sync({force:true}).then(()=>{

    console.log("Success..")
})
app.listen(3000)