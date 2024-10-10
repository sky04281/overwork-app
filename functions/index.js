const functions = require('firebase-functions')
const nodemailer = require('nodemailer')

// 設定寄信服務的憑證，例如使用 Gmail
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'overwork.app@gmail.com',
        pass: 'oprljsktljudesgo',
    },
})

// Cloud Function 用於寄送郵件
exports.sendEmail = functions
    .region('asia-east1')
    .https.onRequest((req, res) => {
        const { to, subject, text } = req.body

        const mailOptions = {
            from: '"過負荷APP" <overwork.app@gmail.com>',
            to: to,
            subject: subject,
            text: text,
            https: text.replace(/\n/g, '<br>'),
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send(error.toString())
            }
            return res.status(200).send('Email sent: ' + info.response)
        })
    })
