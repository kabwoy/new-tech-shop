const express = require("express")
const methodOverride = require("method-override")
const sequelize = require("./database/connection")
const Product = require("./models/product")
const productRoutes = require("./routes/product-routes")
const usersRoutes = require("./routes/users-routes")
const path = require("path")
const app = express()

app.set("view engine" , "ejs")
app.set('views' , path.join(__dirname , "views"))


app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.use(express.static('public'))
app.use(productRoutes)
app.use(usersRoutes)

app.get("/" , (req,res)=>{
    res.render("home.ejs")
})
sequelize.sync().then(()=>{

    console.log("Success..")
})
app.listen(3000)