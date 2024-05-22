import Link from "next/link";

import { getStorage, ref, deleteObject, uploadString, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import IPost from '@/interface/IPost'
import {doc, setDoc,deleteDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from "react-redux";
import {firestore, storage} from '../../config/firebase-client'; // Подключите файл firebaseClient с настройками клиентского Firebase
import { useEffect, useState } from "react";
import Modal from '../post_interface/post_interface'
import { uploadPhoto } from "@/lib/api";
import { selectPostFormData, setPostData, setUpdate } from "@/store/redusers/postReduser";
import { selectUserAuth } from "@/store/redusers/userReducer";
const BlogPost: React.FC<IPost> = (data) => {
  const { user } = useSelector(selectUserAuth);
  const [timerDisabled, setTimerDisabled] = useState(true);
  const dispatch = useDispatch();
  const { postData, update } = useSelector(selectPostFormData);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const calculateReadingTime = (text: string) => {
    if (!text) return 0; // Обработка случая, когда текст не определен
  
    const wordsPerMinute = 200; // Средняя скорость чтения в словах в минуту
    const words = text.split(/\s+/).length; // Разбиваем текст на слова
    const minutes = words / wordsPerMinute; // Расчет времени чтения в минутах
    return Math.ceil(minutes); // Округляем время чтения до ближайшего целого числа
  };


  
  const updateDocument = async (selectedImage: any) => {  setTimerDisabled(false);
    try {
      const docRef = doc(firestore, 'posts', data.id);
      const imageRef = ref(storage, data.fileUrl);
      await deleteObject(imageRef);
      const {fileUrl, fileName} = await uploadPhoto(selectedImage) 
      const updatedPostData = {
        ...postData,
        fileUrl: fileUrl,
        fileName: fileName,
      };
    

 
      await setDoc(docRef, updatedPostData);
      dispatch(setUpdate());
    } catch (error) {
      console.error('Error updating document:', error);
    }
    setTimerDisabled(true)
  };

  const openModal = () => {
    dispatch(
      setPostData({
        id: data.id,
        title: data.title || "", // Добавляем проверку на undefined и присваиваем пустую строку, если значение undefined
        tags: data.tags, // Аналогично для других полей
        description: data.description || "",
        fileName: data.fileName || "",
        fileUrl: data.fileUrl || "",
        date: data.date
      })
    );
    setShowModal(true);
    console.log(showModal)
  };

  const closeModal = () => {
    setShowModal(false);
  }; 
  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.admin_post')) {
      closeModal();
    }
  
  };
 
  const deleteDocument = async () => {
    setTimerDisabled(false);
    try {
      await  deleteDoc(doc(firestore, 'posts', data.id));

      const imageRef = ref(storage, data.fileUrl);
    await deleteObject(imageRef);


    

      console.log('Document successfully deleted!');
      dispatch(setUpdate())
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
    setTimerDisabled(true)
  };
  
  useEffect(() => {
   console.log(showModal)
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  const readingTime = calculateReadingTime(data.description);
  return (
    <div className="max-w-[50%] p-5 w-full z-100">
   
      <div className="bg-gray-100 rounded-[10px] shadow-lg relative">
      {user ?<div className="absolute z-[20] w-full flex justify-between p-2 admin_panel opacity-40 transition-opacity duration-300 text-white admin_panel">
      <button className="bg-color-primary-dark  h-10 w-10 rounded-full  transform scale-90 transition-all duration-300 hover:scale-110  text-lg hover:text-xl" onClick={openModal}  disabled={!timerDisabled}>
    ✎
  </button>
  <button className="bg-color-primary-dark  h-10 w-10 rounded-full  transform scale-90 transition-all duration-300 hover:scale-110  text-lg hover:text-xl" onClick={deleteDocument} disabled={!timerDisabled}>
    ✖
  </button> </div>:''}
        <Link
          className="relative h-64 overflow-hidden block bg-black rounded-t-[10px]"
          href=""
          data-wpel-link="internal"
        >
          <img
            width="548"
            height="143"
            src={data.fileUrl}
            className="attachment-548x234 size-548x234 wp-post-image  w-full"
            alt="20 Most Innovative Real Estate Tech Companies and Startups"
            decoding="async"
            loading="lazy"
            sizes="(max-width: 548px) 100vw, 548px"
          />
        </Link>
        <div className="min-h-[256px] p-2 md:p-5 flex flex-col justify-between">
          <div className="card-top">
            <p className="card-tag">
              <span className="tags-list text-2xl font-semibold text-primary-darkTeal">{data.tags}</span>{" "}
            </p>

            <Link
              href="https://inoxoft.com/blog/20-most-innovative-real-estate-tech-companies-and-startups/"
              className="text-2xl font-bold"
              data-wpel-link="internal"
            >
              {data.title}
            </Link>
            <div className="py-2">{data.description}</div>
          </div>
          <div className="flex justify-between">
          <span className="card-read">{`${readingTime} min read`}</span>
            <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="2" cy="2" r="2" fill="#ACBAC2"></circle>
            </svg>
            <span className="card-date">{data.date}</span>
          </div>
        </div>
      </div>
      {showModal && (
      <Modal onClick={updateDocument} closeModal={closeModal}/>
      )}
    </div>
  );
};

export default BlogPost;


