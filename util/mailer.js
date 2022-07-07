const nodemailer = require("nodemailer")

function mailer(email){

    const transport = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:"newtechke991@gmail.com",
            pass:"cuwdobsranmmuswt"
        }
    })
    var mailOptions = {
    
        from:"newtechke991@gmail.com",
        to:email,
        subject:"Order Placement",
        text:"Order Placed Successfully"
    
    }

    transport.sendMail(mailOptions).then((err , info)=>{
        console.log(info.response)
    })

}

module.exports = mailer


