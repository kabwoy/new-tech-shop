const express = require("express")
const Cart = require("../models/cart")
const Product = require("../models/product")
const User = require("../models/user")

const router = express.Router()

// router.get("/getcart" , function(req,res){

//     res.render("shop/cart")

// })

router.post("/addtocart/:id" , async function(req,res){
  
    Cart.create({userId:req.params.id , productId:req.body.prodid , quantity:"1"}).then(()=>{

        console.log("Item Added To Cart")
    })

    
})

router.get("/test" , function(req,res){

    req.user.getCarts().then(async(cart)=>{

        await Cart.findAll({include:Product , where:{userId:req.user.id}}).then((data)=>{
            console.log(data[0].product)

            res.render("shop/cart" , {data})
        })
        

        // console.log(Object.keys(cart.__proto__))
    })

    // console.log(Object.keys(req.user.__proto__))
})

module.exports = router