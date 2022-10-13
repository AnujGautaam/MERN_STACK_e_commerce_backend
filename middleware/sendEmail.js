const nodemailer = require("nodemailer")


var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "97aa5afcf599b8",
    pass: "3b3530fdce218e"
    }
  });


  //   this is for logging in to the server side of the mail 

//   creating a function for sending the emails 

const sendingEmail = async(mailOptions)=>{
    let info = await transport.sendMail({
    from:mailOptions.from,
    to:mailOptions.to,
    subject:mailOptions.subject,
    text:mailOptions.text,
    html:mailOptions.html

    })

// mailOptions should not be in an object form or else it will create an error

    
}

module.exports = sendingEmail
