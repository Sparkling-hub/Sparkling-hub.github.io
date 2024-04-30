import admin from "firebase-admin";
import multer from 'multer';
import {db} from '../../config/firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from "firebase/firestore"; 
import {firestore, storage} from '../../config/firebase-client';

const upload = multer({
  storage: multer.memoryStorage(), // Сохраняем файлы в оперативной памяти
  fileFilter: function (req, file, cb) {

    if (file.size > 5 * 1024 * 1024) {
      return cb(new Error('The file size exceeds the maximum limit (5MB).'));
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Ограничение размера файла до 5MB
});

export const config = {
  api: {
    bodyParser: false, // Отключаем стандартный парсер тела запроса
  },
};

export default async function handler(req, res) {
  await new Promise((resolve, reject) => {
    upload.single('file')(req, res, (err) => {
      if (err) {
        console.log('error')
        console.log(err)
        return { success: false };
      }
      resolve(null);
    });
  });

  const file = req.file;
  // if (!file) {
  //   return res.status(400).json({ success: false, message: 'Файл не был загружен!' });
  // }
  const {title, text, tags} = req.body
  const filePath = 'uploads/' + file.originalname;
  const fileRef = ref(storage, filePath);

  const uploadTask = uploadBytesResumable(fileRef, file.buffer, {
    contentType: file.mimetype,
  });

  await new Promise((resolve, reject) => {
    uploadTask.on('state_changed', {
      next: (snapshot) => {},
      error: (error) => {
        console.error('Error uploading file:', error);
        reject(error);
      },
      complete: () => {
        resolve();
      },
    });
  });
  console.log('db')
  const fileUrl = await getDownloadURL(fileRef);
  console.log(fileUrl)
  const docRef = await addDoc(collection(firestore, "posts"),{
   fileName: file.originalname,
    fileUrl: fileUrl,
    title: title,
    tags: tags,
    description: text, 
    data: '1',
  });
  // await db.collection('posts').add({
  //   test: "test",
 
  // });
  // Отправляем URL файла в качестве ответа
  // res.status(200).json({ success: true, fileUrl });
}
