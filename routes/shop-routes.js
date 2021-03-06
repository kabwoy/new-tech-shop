const express = require("express")
const Cart = require("../models/cart")
const Product = require("../models/product")
const Order = require("../models/order")
const mailer = require("../util/mailer")
const nodemailer = require("nodemailer")
const isAuth = require("../middleware/isAuth")
const pdfDocument = require("pdfkit")
const createTable = require("../util/pdf-service")
const fs = require("fs")
const User = require("../models/user")

const router = express.Router()

// router.get("/getcart" , function(req,res){

//     res.render("shop/cart")

// })
router.use(isAuth)
router.post("/addtocart/:id" , async function(req,res){
    let currentQuantity = 1;
    await Cart.findOne({where:{productId:req.body.prodid ,userId:req.user.id}}).then(async(product)=>{
        if(product){

            console.log("Product EXISTS")

            console.log(product)

            product.quantity = product.quantity + 1

            product.save().then(()=>{

                res.redirect("/getcart")
            })

        }else{

             Cart.create({userId:req.params.id , productId:req.body.prodid}).then(()=>{

            res.redirect("/getcart")
        })

        }

    })

    // console.log(existingProduct)

    // }else if(existingProduct.length<=0){


        // Cart.create({userId:req.params.id , productId:req.body.prodid}).then(()=>{

        //     res.redirect("/getcart")
        // })


    //  }
  
    

    
})

router.get("/getcart" , async function(req,res){

    if(!req.session.isAuthenticated){

        return res.redirect("/users/login")
    }

        await Cart.findAll({include:Product , where:{userId:req.user.id}}).then((data)=>{
            
            if(data.length <= 0){

                return res.render("shop/nocart")
            }


            res.render("shop/cart" , {data})
        })
        

        // console.log(Object.keys(cart.__proto__))


    // console.log(Object.keys(req.user.__proto__))
})

router.post("/orders" , async function(req,res){
    const results = await Order.findOne({where:{productId:req.body.productid , userId:req.user.id}})
    if(results){

        return console.log("order exists")
    }

    console.log(req.body)

    var quantity = await Cart.findByPk(req.body.cartid)
    var price = await Product.findByPk(req.body.productid)

        Order.create({
            userId:req.user.id,
            quantity:quantity.quantity,
            productId:quantity.productId,
            total:price.price*quantity.quantity
            })
            .then(async()=>{

                await Product.findByPk(req.body.productid).then((product)=>{

                    console.log(product)

                    product.quantity = product.quantity - quantity.quantity

                    product.save().then(()=>{

                        res.send("inventory updated")
                    })

                    mailer(req.user.email)


                })
            })


})

router.get("/test" , (req,res)=>{



    Order.findAll({include:Cart , where:{cartId:2}}).then((data)=>{

       Product.findByPk(data[0].cart.productId).then(product=>console.log(product.price*data[0].cart.quantity))


    })

})

router.get("/cart/clear/:id" , function(req,res){
    Cart.destroy({where:{userId:req.params.id}}).then(()=>{
        console.log("cart cleared");
        res.redirect("/getcart")
    })
})

router.get("/showorders" , async (req, res)=>{
    Order.findAll({include:Product, where:{userId:req.user.id}}).then(async (orders)=>{
        let d = []
        let total = 0
        orders.map(val=>(total = total + val.total,d.push([val.product.name , val.product.price , val.quantity , val.total])))
        createTable(d,req.user.id , total).then((mes)=>{
            res.render("shop/showorders" , {orders})
        })

        
    })
})

// router.get("/download" , (req ,res)=>{
//     res.download(`recipt-${req.user.id}`)
// })

router.get("/download" , (req,res)=>{
    res.download(`recipt-${req.user.id}`)
})
module.exports = router
