const express = require("express")
const session = require("express-session")
const methodOverride = require("method-override")
const sequelize = require("./database/connection")
const Product = require("./models/product")
const flash = require("connect-flash")
const Order = require("./models/order")
const User = require("./models/user")
const Cart = require("./models/cart")
const nodemailer = require("nodemailer")
const productRoutes = require("./routes/product-routes")
const usersRoutes = require("./routes/users-routes")
const shopRoutes = require("./routes/shop-routes")
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
app.use(flash())
app.use(usersRoutes)

app.use(async function(req,res,next){

if(!req.session.user){

    console.log("no users yet")

    next()
}else{

    req.user = await User.findByPk(req.session.user.id)

    res.locals.userid = req.user.id
    res.locals.isAdmin = req.user.isAdmin
    next()

}
})
app.use(async function(req,res,next){

    await Cart.destroy({where:{productId:null}}).then(()=>{

        console.log("destoeyed")
    })

    next()
})
app.use(shopRoutes)
app.use(productRoutes)


app.get("/" , (req,res)=>{
    console.log(req.user)
    res.render("home.ejs")
})


Cart.belongsTo(Product)
Product.hasMany(Cart)
Cart.belongsTo(User)
User.hasMany(Cart)
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsTo(Product)
Product.hasMany(Order)

sequelize.sync({alter:true}).then(()=>{

    console.log("Success..")
}).catch((err=>{
    console.log(err.message)
}))

app.listen(3000)