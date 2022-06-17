const express = require("express")
const User = require("../models/user")
const bcrypt = require("bcryptjs")

const router = express.Router()

router.get("/users/signup" , async(req,res)=>{

    res.render("users/signup")
})

router.post("/signup" , async(req,res)=>{

    const {username , email , password , firstname , lastname , contact} = req.body

    console.log(username)

    if(!username || !email || !firstname ||!lastname || !contact || password.length < 6){

        return console.log("all fields must be valid")
    }

    const user = await User.findAll({where:{email:email}})



    if(user.length>0){
        return console.log("email exists")
    }

    const hashedPassword = await bcrypt.hash(password , 10)

    User.create({username:username , email:email, password:hashedPassword , firstname:req.body.firstname , lastname:lastname , contact:contact}).then(()=>{

        res.redirect("users/login")

    }).catch((err=> console.log(err.message)))

   

})

router.get("/users/login" , async(req,res)=>{

    res.render("users/login")
})

router.post("/login" , async function(req,res){

    const {email , password} = req.body

    User.findAll({where:{email:email}}).then(async ([result])=>{

        if(!result){

            return console.log("Email not Found")
        }

        const rightpassword = await bcrypt.compare(password , result.password)

        if(!rightpassword){

            return console.log("Wrong Password")
        }


            req.session.isAuthenticated = true


            req.session.user = result

           
            res.redirect("/")

    })


})



module.exports = router