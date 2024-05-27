import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayuout';
import Jobs from '../../data/data-jobs';
import InfoPost from '../../data/data-sections/data-post-info/info_post';
import { useRouter } from 'next/router';
import IPost from '@/interface/IPost';

const FaqParent: React.FC = () => {
  const router = useRouter();
  const { post } = router.query;
  const [postData, setPost] = useState<IPost | null>(null);

  useEffect(() => {
    console.log(1)
    if (post) {
      try {
        const parsedPostData: IPost = JSON.parse(post as string);
        setPost(parsedPostData);
      } catch (error) {
        console.error("Error parsing post data", error);
        setPost(null);
      }
    }
  }, []);
  const handlePostUpdate = (updatedPost: IPost) => {
    setPost(updatedPost);
  };
  return (
    <MainLayout>
      {postData ? <InfoPost post={postData} onUpdatePost={handlePostUpdate} /> : <div className='justify-center h-60 items-center text-5xl flex'>Job not found</div>}
    </MainLayout>
  );
};

export default FaqParent;
