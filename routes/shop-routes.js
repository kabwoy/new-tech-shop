const express = require("express")
const Cart = require("../models/cart")
const Product = require("../models/product")
const User = require("../models/user")

const router = express.Router()

// router.get("/getcart" , function(req,res){

//     res.render("shop/cart")

// })

router.post("/addtocart/:id" , async function(req,res){

    let q = 1

    const existingProduct =  await Cart.findOne({where:{productId:req.body.prodid}})

    if(existingProduct){


        await Cart.findByPk(existingProduct.id).then((data)=>{

            data.quantity =data.quantity+1

            data.save().then(()=>{

                res.redirect("/getcart")

               
            })
        })
    }else{


        Cart.create({userId:req.params.id , productId:req.body.prodid}).then(()=>{

            res.redirect("/getcart")
        })


    }
  
    

    
})

router.get("/getcart" , async function(req,res){


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