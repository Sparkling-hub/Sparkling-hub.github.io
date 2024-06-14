
import multer from 'multer';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, Timestamp  } from "firebase/firestore";
import { firestore, storage } from '../../config/firebase-client';

import { v4 as uuidv4 } from 'uuid';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5000000 // Sensitive: 10MB is more than the recommended limit of 8MB
  },
  fileFilter: function (req, file, cb) {
    if (file.size > 5000000) {
      return cb(new Error('The file size exceeds the maximum limit (10MB).'));
    }
    cb(null, true);
  }
});


export const config = {
  api: {
    bodyParser: false,
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

  const { title, description, tags } = req.body

  if (!title || !description || !tags) {
    return res.status(400).json({ success: false, message: 'ERROR ATRIBUTE' });
  }

  const filePath = `posts/images/${uniqueId}_${file.originalname}`;
  const fileRef = ref(storage, filePath);

  const uploadTask = uploadBytesResumable(fileRef, file.buffer, {
    contentType: file.mimetype,
  });

  await new Promise((resolve, reject) => {
    uploadTask.on('state_changed', {
      next: (snapshot) => { },
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

  const dateObj = timestamp.toDate();

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric", 
    year: "numeric", 
  });

  const formattedDate = formatter.format(dateObj);

  const fileUrl = await getDownloadURL(fileRef);

  await addDoc(collection(firestore, "posts"), {
    fileName: `${uniqueId}_${file.originalname}`,
    fileUrl: fileUrl,
    title: title,
    tags: tags,
    description: description,
    date: formattedDate,
  });

  res.status(200).json({ success: true, fileUrl });
}
