const express = require("express")
const session = require("express-session")
const methodOverride = require("method-override")
const sequelize = require("./database/connection")
const Product = require("./models/product")
const User = require("./models/user")
const Cart = require("./models/cart")
const productRoutes = require("./routes/product-routes")
const usersRoutes = require("./routes/users-routes")
const path = require("path")
const app = express()

app.set("view engine" , "ejs")
app.set('views' , path.join(__dirname , "views"))


app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.use(express.static('public'))
app.use(session({
    secret:"kaboi",
    resave:false,
    saveUninitialized:false
}))
app.use(productRoutes)
app.use(usersRoutes)
app.use(function(req,res,next){
    if(!req.session.user){

        return console.log("NO USERS YET") 
    }

    req.user = req.session.user

    next()
})

app.get("/" , (req,res)=>{
    console.log(req.session)
    res.render("home.ejs")
})


Cart.belongsTo(Product)
Product.hasMany(Cart)
Cart.belongsTo(User)
User.hasMany(Cart)

sequelize.sync({alter:true}).then(()=>{

    console.log("Success..")
}).catch((err=>{
    console.log(err.message)
}))

app.listen(3000)