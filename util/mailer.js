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
        text:"Order Placed Successfully",
        attachments:[]
    
    }

    transport.sendMail(mailOptions).then((err , info)=>{
        console.log("Mail sent")
    }).catch(err => console.log(err.message))

}

module.exports = mailer


