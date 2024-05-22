
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "@/config/firebase-client";
import BlogPost from "../blog-post";
import {
  resetPostData,
  selectPostFormData,
  setUpdate,
  setUniqueIds,
  setActiveIds,
  setDateRange
} from '@/store/redusers/postReduser';
import {
  setUserAuth,
  selectUserAuth
} from '@/store/redusers/userReducer';
import { useDispatch, useSelector } from "react-redux";
import  {createPost, getPost} from '@/lib/api'
import IPost from "@/interface/IPost";
import Modal from '../post_interface/post_interface'
import Filter from '../filterPost'
import {formatTags, getIds} from '@/components/helper/split'
import DateRangePicker from "../filterPost/date-select/date-select";
import { post } from "jquery";
import { v4 as uuidv4 } from 'uuid';
const Blog: React.FC = () => {
  const dispatch = useDispatch();
  const db = firestore;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { postData, check, update, uniqueIds,activeIds, filter } = useSelector(selectPostFormData);
  const { user } = useSelector(selectUserAuth);

  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [originPost, setOriginPost]= useState<IPost[]>([]);
  const [posts, setPosts] = useState<IPost[]>(originPost);
  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.admin_post')) {
      closeModal();
    }
  };

  useEffect(() => {     
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  const handleSubmit = async (selectedImage:File|null) => {
   await createPost(postData, selectedImage)

    dispatch(resetPostData())
   
    dispatch(setUpdate())
  };
  const checkStartDate = (dateString: Date | null): Date => {
    if (!dateString) {
      return new Date('2020-01-01'); // Если дата не указана, возвращаем 1 января 2020 года
    }
    // const date = new Date(dateString);
    // return isNaN(date.getTime()) ? new Date() : date;
    return dateString;

  };

  const checkEndDate = (dateString: Date | null): Date => {
    if (!dateString) {
      return new Date();
    }
    return dateString;
  }
  function parseDate(dateStr: string): Date {
    return new Date(dateStr);
  }

  function isDateInRange(post: IPost, startDate: Date | null, endDate: Date | null): boolean {
    const postDate = parseDate(post.date);
    const start = startDate || checkStartDate(startDate);
    const end = endDate || checkEndDate(endDate);
    return postDate >= start && postDate <= end;
  }
  
const filterValue = async ()=>{

  let filteredPosts = originPost.filter((post: IPost) => {
    const matchesText = post.title.toLowerCase().includes(filter.title.toLowerCase());
    const isTagIncluded = activeIds.tags.length === 0 || activeIds.tags.some((activeId: string) => post.tags.includes(activeId));
    const dateInRange = isDateInRange(post, filter.startDate, filter.endDate);
    return isTagIncluded && dateInRange;
  });
  setPosts(filteredPosts);


    
   
      // if(filter.title) {const filteredPosts3 = filteredPosts.filter(post => post.title?.toLowerCase().includes(filter.title.toLowerCase()));}
   
      // 


}
  const handleAddBlog = () => {
    onAuthStateChanged(auth, (user) => {

      if (user != null) {
        dispatch(setUserAuth(true));
      } else {
        dispatch(setUserAuth(false));
      }
    });
  };

  useEffect(() => {
    handleAddBlog();
    
  }, []);

  const openModal = () => {
 
    setShowModal(true);
    dispatch(resetPostData())
  };

  const closeModal = () => {
    setShowModal(false);
  }; 
  const fetchPosts = async () => {

    try {
      const response = await getPost(); 
      
  
  
      const result = {
        tags: getIds(response, 'tags'),
  
      };
 
      const activeIds = {
        tags: [],
      
      };
     
  
      dispatch(setUniqueIds({ value: result }));
      dispatch(setActiveIds({ value: activeIds }));

      setOriginPost(response);
      formatTags(response)

      
    } catch (error) {
      console.log(error)
    }
    
  };

  useEffect(() => {

console.log('blog')
    closeModal()
  
    fetchPosts();
  }, [update]); 
  useEffect(() => {
    filterValue()
    console.log('filter')
  
  }, [activeIds,filter, update, originPost]); 


  return (
    <div className="">
      <div className="flex">
      <Filter/>
      {user ? (
        <button
          className="no-underline relative w-auto text-white py-3 px-8 m-auto bg-color-primary-dark rounded-full z-10 block hover:bg-teal-700"
          onClick={openModal}
        >
          Add blog
        </button>
      ) : (
        ""
      )}</div>
      <div key={posts? posts.length+1:'0'}>
        <div  className="flex flex-wrap" >
      {posts?posts.map((item: IPost, index: number) => (
  <BlogPost key={item.id}{...item} />
)):''}</div>
      </div>
      {showModal && (
      <Modal onClick={handleSubmit} closeModal={closeModal}/>
      )}
     
    </div>
    
  );
};

export default Blog;
