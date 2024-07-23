import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayuout';
import Jobs from '../../data/data-jobs';
import InfoPost from '../../data/data-sections/data-post-info/info_post';
import { useRouter } from 'next/router';
import IPost from '@/interface/IPost';
import { firestore } from '@/config/firebase-client';
import { doc, getDoc } from 'firebase/firestore';

const FaqParent: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [postData, setPost] = useState<IPost | null>(null);

  const getPost = async () => {
    try {
      const docRef = doc(firestore, "posts", id as string);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const postData = docSnap.data() as IPost;
        const updatedPostData = { ...postData, id: id as string }; 
        setPost(updatedPostData);
      } else {
        console.log("No such document!");
        setPost(null);
      }
    } catch (error) {
      console.error('Error fetching post data:', error);
      setPost(null);
    }
  };
  const handlePostUpdate = (updatedPost: IPost) => {
    setPost(updatedPost);
  };
  useEffect(() => {
    if (id) {
      getPost();
    }
  }, [id]);
  return (
    <MainLayout>
      {postData ? <InfoPost post={postData} onUpdatePost={handlePostUpdate} /> : <div className='justify-center h-60 items-center text-5xl flex'>Post not found</div>}
    </MainLayout>
  );
};

export default FaqParent;
