const nodemailer = require("nodemailer")

const sendMail = async (options) => {

    const messageTransport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.AUTH_EMAIL,
            pass:process.env.AUTH_PASS
        }
    })

    const details = {
        from:process.env.AUTH_EMAIL,
        to:options.email,
        subject:options.subject,
        text:options.message
    }

    await messageTransport.sendMail(details)
}

module.exports = sendMail


