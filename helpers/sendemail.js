import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const { POSTSERVER, POSTPASS } = process.env;

const nodemailerConfig = {
     host: "smtp.ukr.net",
  port: 465,
  secure: true,
    auth: {
        user: POSTSERVER,
        pass: POSTPASS
    }
};

const transporter = nodemailer.createTransport(nodemailerConfig);

export const sendEmail = async (data) => {
    const email = { ...data, from: POSTSERVER };
    await transporter.sendMail(email);
    return true; 
}

export default sendEmail;