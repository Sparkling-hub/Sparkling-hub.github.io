import admin from "firebase-admin";
import multer from 'multer';
import {db} from '../../config/firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from "firebase/firestore"; 
import {firestore, storage} from '../../config/firebase-client';
import { Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
// Создание метки времени для текущего момента

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
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
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
  const uniqueId = uuidv4();
  const file = req.file;
  if (!allowedTypes.includes(file.mimetype)) {
    return res.status(400).json({ success: false, message: 'ERROR FORMAT' });
  }
  if (!file) {
    return res.status(400).json({ success: false, message: 'ERROR ATRIBUTE' });
  }
  const {title, description, tags} = req.body
  if (!title || !description || !tags) {
    return res.status(400).json({ success: false, message: 'ERROR ATRIBUTE' });
  }
  const filePath = `uploads/${uniqueId}_${file.originalname}`;
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
  const timestamp = Timestamp.now();

  // Извлечение компонентов даты из метки времени
  const dateObj = timestamp.toDate();
  
  // Форматирование даты с использованием Intl.DateTimeFormat
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long", // Полное название месяца
    day: "numeric", // Число дня
    year: "numeric", // Год
  });
  const formattedDate = formatter.format(dateObj);
  console.log('db')
  const fileUrl = await getDownloadURL(fileRef);
  console.log(fileUrl)
  const docRef = await addDoc(collection(firestore, "posts"),{
   fileName: `${uniqueId}_${file.originalname}`,
    fileUrl: fileUrl,
    title: title,
    tags: tags,
    description: description, 
    date: formattedDate,
  });
  // await db.collection('posts').add({
  //   test: "test",
 
  // });
  // Отправляем URL файла в качестве ответа
  res.status(200).json({ success: true, fileUrl });
}
