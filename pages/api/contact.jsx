import multer from "multer";
import { mailOptions, transporter } from "../../config/nodemailer";
import axios from "axios";
import { secretKey } from "../../config/reCaptha";
import NodeClam from "clamscan";

const CONTACT_MESSAGE_FIELDS = {
  vacancy: "Vacancy",
  name: "Name",
  email: "Email",
  select: "Select",
  company: "Company",
  phone: "Phone",
  linkedin: "LinkedIn",
  message: "Message",
};

const generateEmailContent = (data) => {
  const stringData = Object.entries(data).reduce((str, [key, val]) => {
    if (CONTACT_MESSAGE_FIELDS[key] && val !== undefined) {
      return `${str}${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`;
    }
    return str;
  }, "");

  const htmlData = Object.entries(data).reduce((str, [key, val]) => {
    if (CONTACT_MESSAGE_FIELDS[key] && val !== undefined) {
      return `${str}<h3 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS[key]}</h3><p class="form-answer" align="left">${val}</p>`;
    }
    return str;
  }, "");

  return {
    text: stringData,
    html: `<!DOCTYPE html><html> <head> <title></title> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}@media screen and (max-width: 525px){.wrapper{width: 100% !important; max-width: 100% !important;}.responsive-table{width: 100% !important;}.padding{padding: 10px 5% 15px 5% !important;}.section-padding{padding: 0 15px 50px 15px !important;}}.form-container{margin-bottom: 24px; padding: 20px; border: 1px dashed #ccc;}.form-heading{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 400; text-align: left; line-height: 20px; font-size: 18px; margin: 0 0 8px; padding: 0;}.form-answer{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 300; text-align: left; line-height: 20px; font-size: 16px; margin: 0 0 24px; padding: 0;}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style> </head> <body style="margin: 0 !important; padding: 0 !important; background: #fff"> <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px;  max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; " ></div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 10px 15px 30px 15px" class="section-padding" > <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table" > <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td style=" padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > <h2>New Contact Message</h2> <div class="form-container">${htmlData}</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>`,
  };
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 8 * 1024 * 1024, 
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Incorrect file format"));
    }
    if (file.size > 5 * 1024 * 1024) {
      return cb(new Error("The file size exceeds the maximum limit (5MB)."));
    }
    cb(null, true);
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const checkRecaptchaAndFields = async (recaptchaToken) => {
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;
  try {
    const response = await axios.post(verificationUrl);
    return response.data.success;
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return false;
  }
};

export default async function handler(req, res) {
  try {
    await new Promise((resolve, reject) => {
      upload.single("file")(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    const recaptchaValid = await checkRecaptchaAndFields(req.body.recaptcha);
    if (!recaptchaValid) {
      res.status(400).json({ error: "Invalid reCAPTCHA" });
      return;
    }

    let attachments = [];
    if (req.file) {
      const clamscanConfig = {
        remove_infected: true,
        quarantine_infected: "./quarantine",
      };
      const clamscan = await new NodeClam().init(clamscanConfig);
      const { isInfected } = await clamscan.isInfected(req.file.buffer);

      if (isInfected) {
        res.status(400).json({ error: "File is infected" });
        return;
      }

      attachments.push({
        filename: req.file.originalname,
        content: req.file.buffer,
      });
    }

    await transporter.sendMail({
      ...mailOptions,
      ...generateEmailContent(req.body),
      subject: req.body.email,
      attachments,
    });

    res.status(200).send("Email sent successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
}
