
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "@/config/firebase-client";
import BlogPost from "../blog-post";
import {
  resetPostData,
  selectPostFormData,
  setUpdate
} from '@/store/redusers/postReduser';
import { useDispatch, useSelector } from "react-redux";
import  {createPost, getPost} from '@/lib/api'
import IPost from "@/interface/IPost";
import Modal from '../post_interface/post_interface'
const Blog: React.FC = () => {
  const dispatch = useDispatch();
  const db = firestore;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { postData, check, update } = useSelector(selectPostFormData);
  
  const [user, setUser] = useState<any>(null); // State to store the current user
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const [posts, setPosts] = useState<IPost[]>([]);
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
    // try {
    //   await enableNetwork(db);
    //   await setDoc(doc(db, "cities", "LA"), {
    //     name: "Los Angeles",
    //     state: "CA",
    //     country: "USA"
    //   });
      
    //   // console.log("Document written with ID: ", docRef.id);
    //   alert("Post created successfully!");
    // } catch (error) {
    //   console.error("Error creating post:", error);
    //   alert("Error creating post. Please try again later.");
    // } finally {
  
    // }
    createPost(postData, selectedImage)
  
    dispatch(resetPostData())
    dispatch(setUpdate(!update))

  };

  const handleAddBlog = () => {
    onAuthStateChanged(auth, (user) => {

      if (user != null) {
        setUser(true);
      } else {
        setUser(false);
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
    console.log("catch")
    try {
      const response = await getPost(); 
      setPosts(response); 

    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {

    fetchPosts();
  }, [update]); 
  

  
  return (
    <div className="">
      {user ? (
        <button
          className="no-underline relative w-auto text-white py-3 px-8 m-auto bg-color-primary-dark rounded-full z-10 block hover:bg-teal-700"
          onClick={openModal}
        >
          Add blog
        </button>
      ) : (
        ""
      )}
      <div className="flex flex-wrap"  key={posts? posts.length+1:'0'}>
      {posts?posts.map((item: IPost, index: number) => (
  <BlogPost key={item.id}{...item} />
)):''}
      </div>
      {showModal && (
      <Modal onClick={handleSubmit} closeModal={closeModal}/>
      )}
    </div>
  );
};

export default Blog;
