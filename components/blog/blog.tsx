
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
  const checkStartDate = (dateString: string | null): Date => {
    if (!dateString) {
      return new Date('2020-01-01'); // Если дата не указана, возвращаем 1 января 2020 года
    }
    return new Date(dateString);
  };
  
  const checkEndDate = (dateString: string | null): Date => {
    if (!dateString) {
      return new Date();
    }
    return new Date(dateString);
  };
  
  function parseDate(dateStr: string): Date {
    return new Date(dateStr);
  }
  
  function isDateInRange(post: IPost, startDate: string | null, endDate: string | null): boolean {
    const postDate = parseDate(post.date);
    const start = checkStartDate(startDate);
    const end = checkEndDate(endDate);
    return postDate >= start && postDate <= end;
  }
  
  
  const filterValue = async () => {
    let filteredPosts = originPost.filter((post: IPost) => {
      const matchesText = post.title?.toLowerCase().includes(filter.title.toLowerCase());
      const isTagIncluded = activeIds.tags.length === 0 || activeIds.tags.some((activeId: string) => post.tags.includes(activeId));
      const dateInRange = isDateInRange(post, filter.startDate, filter.endDate);
      return isTagIncluded && dateInRange && matchesText;
    });
  
    // Сортировка постов по дате
    filteredPosts.sort((a: IPost, b: IPost) => {
      const dateA = parseDate(a.date).getTime();
      const dateB = parseDate(b.date).getTime();
      return filter.sortOrder ? dateA - dateB : dateB - dateA;
    });
  
    setPosts(filteredPosts);
  };
  
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
      
      formatTags(response)

      const result = {
        tags: (getIds(response, 'tags')),
  
      };
      console.log(result)
      const activeIds = {
        tags: [],
      
      };
      dispatch(setUniqueIds({ value: result }));
      dispatch(setActiveIds({ value: activeIds }));
  console.log(filter)
   
      console.log(activeIds)
      setOriginPost(response);
   

      
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
        <div  className="flex flex-wrap z-[-10] static" >
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
