const express = require("express")
const Cart = require("../models/cart")
const Product = require("../models/product")
const User = require("../models/user")

const router = express.Router()

// router.get("/getcart" , function(req,res){

//     res.render("shop/cart")

// })

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

module.exports = router