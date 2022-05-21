const express = require("express")

const router = express.Router()

router.get("/users/signup" , async(req,res)=>{

    res.render("users/signup")
})

module.exports = router