const nodemailer = require("nodemailer");

const Email = process.env.USER_EMAIL;
const Pass = process.env.EMAIL_PASS;

module.exports = {
  async send(req, res) {
    const data = req.body;

    const smtpTransport = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        user: Email,
        pass: Pass
      }
    });
    smtpTransport.sendMail(
      {
        //email options
        from: `Eu <${Email}>`,
        to: `Eu <${Email}>`, // receiver
        subject: "Emailing with nodemailer", // subject
        html: `Produto: ${data.produto}
        <br>
        Codigo: ${data.code}
        ` // body (var data which we've declared)
      },
      function(error, info) {
        //callback
        if (error) {
          res.status(400).json("Unable to send email");
        } else {
          res.status(201).json("Message sent");
        }
        smtpTransport.close();
      }
    );
  }
};
