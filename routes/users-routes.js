const express = require("express")

const router = express.Router()

router.get("/users/signup" , async(req,res)=>{

    res.render("users/signup")
})

router.post("/signup" , async(req,res)=>{

    const {username , email , password , firstname , lastname , contact} = req.body

    if(!username || !email || !password || !firstname ||!lastname || !contact || !password.length < 6){

        return res.send("all fields must be valid")
    }


})

module.exports = router