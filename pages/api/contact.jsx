import multer from "multer";
import { mailOptions, transporter } from "../../config/nodemailer";
import fs from "fs";

import axios from "axios";
import { secretKey} from "../../config/reCaptha";
import admin from "firebase-admin";
// import {initializeFirebase} from "../../config/firebase";
import { initializeApp, getApp, getApps } from "firebase-admin/app"; // Инициализация Firebase приложения
import { uploadBytesResumable } from "firebase/storage";
import { ref, getStorage } from 'firebase-admin/storage';
const serviceAccount = require('../../key.json');
const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
  apiKey: "AIzaSyBJKXMOYI6KodbnJhJHAH3wsjFznYhQ-pw",
  authDomain: "sparkling-website.firebaseapp.com",
  projectId: "sparkling-website",
  storageBucket: "sparkling-website.appspot.com",
  messagingSenderId: "450613401211",
  appId: "1:450613401211:web:fa8b1b0c3511e9b1da34de",
  measurementId: "G-RB288H6HFL"
};

// Check if Firebase app is already initialized

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// Get the default Firebase app instance
const firebaseApp = getApp();

// Get the Firebase Storage instance using the app instance
const storage = getStorage(firebaseApp);
const bucket = storage.bucket();
const CONTACT_MESSAGE_FIELDS = {
  vacancy: "Vacancy",
  name: "Name",
  email: "Email",
  select: "Select",
  company: "Company",
  phone: "Phone",
  linkedin: "Linkdin",
  message: "Message",

};

const generateEmailContent = (data) => {
  const stringData = Object.entries(data).reduce((str, [key, val]) => {
    if (CONTACT_MESSAGE_FIELDS[key] && val && val !== undefined) {
      return `${str}${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`;
    }
    return str;
  }, "");

  const htmlData = Object.entries(data).reduce((str, [key, val]) => {
    if (val && CONTACT_MESSAGE_FIELDS[key] && val  !== undefined) {

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
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    
    },
    
    filename: function (req, file, cb) {
      cb(null, 'cv');
    },
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  }),
  fileFilter: function (req, file, cb) {
  
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Incorrect file format"));
    }

   
    if (file.size > 5 * 1024 * 1024) {
      return cb(new Error("The file size exceeds the maximum limit (5MB)."));
    }


    else cb(null, true);
  },
  
  limits:{
    fileSize: 5000000 }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
 
  try {
    await new Promise((resolve, reject) => {
      upload.single("file")(req, res, (err) => {
        if (err) {
          return { success: false };
        }
        resolve(null);
      });
    });

    const recaptchaToken = req.body.recaptcha; 
    if (!recaptchaToken) {
      throw new Error("Missing reCAPTCHA token");
    }

   
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;

    const response = await axios.post(verificationUrl); 
    if (!response.data.success) {
      throw new Error("Invalid reCAPTCHA token");
    }

    if (!req.body.name || !req.body.email) {
      throw new Error("Missing required fields in request body");
      
    }
    if ( req.file) {
      const clamscanConfig = {
        remove_infected: true,
        quarantine_infected: "./quarantine",
      };
      const NodeClam = require("clamscan");
      const ClamScan = new NodeClam().init(clamscanConfig);

      ClamScan.then(async (clamscan) => {
        try {
            await clamscan.isInfected(
            req.file
          );
     
        } catch (err) {
          return { success: false };
        }
      }).catch((err) => {

      });
    }
    let attachments = [];

    const file = req.file;
   
    if (file) {
   
      const filePath = "upload/" + file.originalname;
      var  fileRef = bucket.file(filePath);
    
      // Upload the file
      const uploadTask = fileRef.createWriteStream({
        metadata: {
          contentType: file.mimetype, 
        },
      });
          // Write the file buffer to the stream
          uploadTask.end(file.buffer);
      await new Promise((resolve, reject) => {
        uploadTask.on('finish', resolve);
        uploadTask.on('error', reject);

      });
   
   
      var [fileUrl] = await fileRef.getSignedUrl({
        action: 'read',
        expires: '03-09-2491' // Указываем допустимый срок действия URL
      });
    }

  
  
    await transporter.sendMail({
      ...mailOptions,
      ...generateEmailContent(req.body), // Функция для генерации содержимого письма
      subject: req.body.email,
      attachments: [
        {
          filename: file.originalname,
          href: fileUrl, // Добавляем URL файла как вложение
        },
      ],
    });


    res.status(200).send("Email sent successfully");
    return { success: true };
  } catch (error) {
    res.status(500).send(error.message);
    return { success: false };
  
  } finally{ 

     await fileRef.delete()
    .then(() => {
      console.log('File deleted successfully');
    })
    .catch((error) => {
      console.error('Error deleting file:', error);
    });
}
}