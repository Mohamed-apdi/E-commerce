import nodemailer from 'nodemailer';
import asyncHandler from 'express-async-handler';
import { email, pass } from '../config/config.js';


// send mail

export const sendMail = asyncHandler( async (data,req,res) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: 'maxamedcabdifitaax33@gmail.com',
          pass:'mhqw uofg yxlb fsuq',
        },
      });
      
      try {
        const info = await transporter.sendMail({
            from: '"Hey 👻" <maxamedcabdifitaax33@gmail.com>',
            to: data.to,
            subject: data.subject,
            text: data.text,
            html: data.html,
        });
    } catch (error) {
        console.error("Error sending email:", error);
    }
});