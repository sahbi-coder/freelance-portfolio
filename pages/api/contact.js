import nodemailer from "nodemailer";
export default function handler(req, res) {
  const contact = req.body;
  const output = `   
     <p>you have new contact</p>
     <h3><Contact Details/h3>
     <ul>
     <li>Name: ${contact.name} ${contact.lastName}</li>
     <li>Message: ${contact.message}</li>
     <li>Eamil: ${contact.email}</li>
     </ul>
    `;

  try {
    async function sendMail() {
      let transporter = nodemailer.createTransport({
        service: "outlook",
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      });

      let info = await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: "oussema.jedda@gmail.com",
        subject: "oussama jedda website new contact",
        html: output,
      });
    }
    sendMail()
    res.status(200).send("message sent");
  } catch {
    res.status(500).send('message not sent')
  }
}
