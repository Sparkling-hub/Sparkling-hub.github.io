import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firebaseApp, firestore } from "@/config/firebase-client";
import BlogPost from "../blog-post";
import {
  resetPostData,
  selectPostFormData,
  setPostData
} from '@/store/redusers/postReduser';
import Input from "../ui/input-component";
import { useDispatch, useSelector } from "react-redux";
import TextArea from "../ui/text-area-component";
import { collection, addDoc } from "firebase/firestore"; 
import firebase from "firebase/app"
import { enableNetwork } from "firebase/firestore"; 
import  {createPost, getPost} from '@/lib/api'
import { doc, setDoc } from "firebase/firestore"; 
import IPost from "@/interface/IPost";
const Blog: React.FC = () => {
  const dispatch = useDispatch();
  const db = firestore;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { postData, check, checkForm } = useSelector(selectPostFormData);
  const [user, setUser] = useState<any>(null); // State to store the current user
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    if (name === 'img') {
      const inputElement = e.currentTarget as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        setSelectedImage(inputElement.files[0]);
      } else {
        setSelectedImage(null); 
      }
    } else {
      dispatch(setPostData({
        ...postData,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async () => {
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
    fetchPosts()
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
  };

  const closeModal = () => {
    setShowModal(false);
  }; 
  const fetchPosts = async () => {
    try {
      const response = await getPost(); 
      setPosts(response); 
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []); 

  
  return (
    <div className="" key={posts.length}>
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
      <div className="flex flex-wrap">
      {posts.map((item: IPost, index: number) => (
  <BlogPost key={index} {...item} />
))}
      </div>
      {showModal && (
        <div className="fixed w-[80%] top-[20%] left-[10%] z-50 bg-gray-200 rounded-[10px] p-10 shadow-xl">
          <div className="flex justify-between pb-5">           
   <h2>Add Blog</h2>    
             <button className="no-underline relative w-auto text-white py-3 px-8 bg-color-primary-dark rounded-full z-10 block hover:bg-teal-700" onClick={closeModal}> X </button>
             </div>

      <div className="flex p-5">
        <div className="relative">
       <p className="absolute text-sm right-2 py-11">Upload image</p>
        <Input
          type="file"
          name="img"
          value={postData.img}
      
          onChange={handleInputChange}

        />{selectedImage && (
          <img src={URL.createObjectURL(selectedImage)} alt="Selected Image" className="mt-2 max-w-full h-auto" />
        )}
        </div>
       
<div className="w-full ml-10">
           <Input
          type="text"
          name="title"
          value={postData.title}
          placeholder="Title"
          onChange={handleInputChange}

        />
        
        <Input
          type="text"
          name="tags"
          value={postData.tags}
          placeholder="Tags"
          onChange={handleInputChange}

        />
        

<TextArea
          name="text"
          placeholder="Tell us about your project and goals"
          value={postData.text}
          onChange={handleInputChange}
       
        />
        </div>
      </div>
          <button type="submit"    onClick={handleSubmit} disabled={isSubmitting}  className="no-underline relative w-auto text-white py-3 px-12 bg-color-primary-dark rounded-full z-10 block hover:bg-teal-700 m-auto ">Save</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
