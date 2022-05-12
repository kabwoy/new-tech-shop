const express = require("express")

const router = express.Router()

router.get("/products" , async(req,res)=>{

    res.render("products/index")
})

router.get("/products/new" , async(req,res)=>{

    res.render("products/new")
})

module.exports = router