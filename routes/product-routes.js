const express = require("express")

const Product = require("../models/product")

const router = express.Router()

const category = ["storage" , "desktop" , "laptops"]

router.get("/products" , async(req,res)=>{

    Product.findAll({}).then((alldata)=>{

        // console.log(alldata)

        res.render("products/index" ,{alldata , message:req.flash('info')})

    })


})

router.get("/products/new" , async(req,res)=>{

    res.render("products/new" , {category})
})

router.post("/products" , async(req,res)=>{

    const {name , price ,description , image , quantity, category } = req.body

    Product.create({
        name:name,
        price:price,
        description:description,
        image:image,
        quantity:quantity,
        category:category
    }).then(()=>{

        console.log("Added")

        res.redirect("/products")
    })
})

router.get("/products/:id" , async function (req,res) {

    Product.findByPk(req.params.id).then((data)=>{

        // console.log(data)

        req.products = data

        // console.log(Object.keys(req.products.__proto__))

        res.render("products/show" , {data})

    })

})

router.get("/products/:id/edit" , async(req,res)=>{

    Product.findByPk(req.params.id).then((data)=>{

        console.log(data)

        res.render("products/edit" , {category , data})
    })


})

router.put("/products/:id" , async(req , res)=>{

    Product.findByPk(req.params.id).then(async(data)=>{
        data.name = req.body.name
        data.price = req.body.price
        data.description = req.body.description
        data.category = req.body.category
        data.image = req.body.image
        await data.save().then(()=>{
            res.redirect("/products")
        })
    })
})

router.delete("/products/:id" , async(req,res)=>{

    Product.findByPk(req.params.id).then(async(data)=>{

        return data.destroy()
    }).then(()=>{
        req.flash('info' , 'Product Deleted Successfully')
        res.redirect("/products")
    })
})
module.exports = router