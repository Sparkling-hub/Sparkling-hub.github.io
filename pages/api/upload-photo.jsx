import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import {storage} from '../../config/firebase-client';


const upload = multer({
  storage: multer.memoryStorage(), 
  fileFilter: function (req, file, cb) {

    if (file.size > 5000000) {
      return cb(new Error('The file size exceeds the maximum limit (5MB).'));
    }
    cb(null, true);
  },
  limits: {  fileSize : 8000000}, 
});


export const config = {
  api: {
    bodyParser: false, 
  },
};


export default async function handler(req, res) {
  try {
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
    const filePath = `posts/images/${uniqueId}_${file.originalname}`;
    const fileRef = ref(storage, filePath);
    const uploadTask = uploadBytesResumable(fileRef, file.buffer, {
      contentType: file.mimetype,
    });

    
    uploadTask.on('state_changed', {
      next: (snapshot) => {},
      error: (error) => {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'An error occurred during upload.' });
      },
      complete: async () => {
        try {
          const fileUrl = await getDownloadURL(fileRef);
          const uploadedFile = {
            fileName: `${uniqueId}_${file.originalname}`,
            fileUrl: fileUrl,
          };
          res.status(200).json({ uploadedFile });
        } catch (error) {
          console.error('Error getting download URL:', error);
          res.status(500).json({ error: 'An error occurred during upload.' });
        }
      },
    });
  } catch (error) {
    console.error('Error handling upload:', error);
    res.status(500).json({ error: 'An error occurred during upload.' });
  }
}
