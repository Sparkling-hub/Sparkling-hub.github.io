import { useEffect, useState } from 'react';
import {collection, getDocs } from 'firebase/firestore';

import {firestore} from '../../config/firebase-client'; // Подключите файл firebaseClient с настройками клиентского Firebase

export default async function getPosts(req, res) {

  
    // Функция для получения постов из Firestore

      const db = firestore; // Получаем доступ к Firestore

      try {
        // Получаем коллекцию "posts"
        const querySnapshot = await getDocs(collection(db, 'posts'));

        // Преобразуем данные в массив объектов
      const postsData = await querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        res.status(200).json({ postsData });
      } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(200).json({ error });
      }
   
    }