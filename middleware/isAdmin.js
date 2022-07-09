function isAdmin(req,res,next){

    if(req.user.isAdmin){
        next()
    }else{

        res.render("products/404")
    }
}

module.exports = isAdmin