import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport";

import mjml2html from "mjml";
import Handlebars from "handlebars";

import * as url from "url";
import path from "path";
import fs from "fs/promises";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

const getMjmlData = async (fileName) => {
  const filePath = path.join(__dirname, "../", "mjml", `${fileName}.mjml`);
  const fileString = await fs.readFile(filePath, "utf-8");
  return mjml2html(fileString, {
    filePath: filePath,
  }).html;
};

export const sendPasswordReset = async (username, useremail, link) => {
  try {
    const resetPasswordMjml = await getMjmlData("reset-password");
    const template = Handlebars.compile(resetPasswordMjml);
    const resetPasswordHtml = template({ name: username, link: link });
    await transporter.sendMail({
      to: useremail,
      from: "salehub@ziadessam.com",
      subject: "Password reset",
      html: resetPasswordHtml,
    });
  } catch (err) {
    console.log(err);
  }
};
