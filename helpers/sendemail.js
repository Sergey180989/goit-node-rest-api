import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const { POSTPASS } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "smark1809@meta.ua",
    pass: POSTPASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

export const sendEmail = async (data) => {
  const email = { ...data, from: "smark1809@meta.ua" };
  await transporter.sendMail(email);
  return true;
};

export default sendEmail;
