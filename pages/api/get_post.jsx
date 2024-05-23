import {collection, getDocs } from 'firebase/firestore';
import {firestore} from '../../config/firebase-client'; 


export default async function getPosts(req, res) {

      const db = firestore; 

      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));

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