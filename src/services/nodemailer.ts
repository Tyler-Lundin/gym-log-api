import nodemailer from 'nodemailer';

const sendEmail = async (to: string, text: string) => {
	console.log( 'send email' );
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT) || 587,
	secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, 
      pass: process.env.SMTP_PASS,
    },
  });

  transporter.verify((error, success) => {
	  if (error) console.log({ error });
	  else console.log({ success });
  });
  transporter.sendMail({
	to, 
	subject: 'Verification Code',
	text,
	html: `<b>${text}</b>`,
  });


}


export default sendEmail;
