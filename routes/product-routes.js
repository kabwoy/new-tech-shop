const express = require("express")

const Product = require("../models/product")

const router = express.Router()

const category = ["storage" , "desktop" , "laptops"]

router.get("/products" , async(req,res)=>{

    Product.findAll({}).then((alldata)=>{

        console.log(alldata)

        res.render("products/index" ,{alldata})

    })


})

router.get("/products/new" , async(req,res)=>{

    res.render("products/new" , {category})
})

router.post("/products" , async(req,res)=>{

    const {name , price ,description , image , category } = req.body

    Product.create({
        name:name,
        price:price,
        description:description,
        image:image,
        category:category
    }).then(()=>{

        console.log("Added")

        res.redirect("/products")
    })
})

router.get("/products/:id" , async function (req,res) {

    Product.findByPk(req.params.id).then((data)=>{

        console.log(data)

        res.render("products/show" , {data})

    })

})
module.exports = router