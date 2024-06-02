import Link from "next/link";
import { ref, deleteObject } from "firebase/storage";
import IPost from "@/interface/IPost";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { firestore, storage } from "../../config/firebase-client";
import { useEffect, useState } from "react";
import Modal from "../post_interface/post_interface";
import { uploadPhoto } from "@/lib/api";
import {
  selectPostFormData,
  setPostData,
  setUpdate,
} from "@/store/redusers/postReduser";
import { selectUserAuth } from "@/store/redusers/userReducer";

const BlogPost: React.FC<IPost> = (data) => {
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const { user } = useSelector(selectUserAuth);
  const [timerDisabled, setTimerDisabled] = useState(true);
  const dispatch = useDispatch();
  const { postData } = useSelector(selectPostFormData);
  const [showModal, setShowModal] = useState(false);


  const calculateReadingTime = (text: string) => {
    if (!text) return 0;
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = words / wordsPerMinute;
    return Math.ceil(minutes);
  };


  function formatTagsArray(tagsArray: any) {
    if (!Array.isArray(tagsArray)) {
      throw new Error("Input is not an array");
    }
    const filteredTags = tagsArray.filter((tag) => tag.trim() !== "");
    const tagsString = filteredTags.join(", ");
    return tagsString;
  }

  const updateDocument = async (selectedImage: any) => {
    setTimerDisabled(false);
    try {
      const docRef = doc(firestore, "posts", data.id);
      const imageRef = ref(storage, data.fileUrl);
      if (selectedImage) {
        await deleteObject(imageRef);
        const { fileUrl, fileName } = await uploadPhoto(selectedImage);
        const updatedPostData = {
          ...postData,
          fileUrl: fileUrl,
          fileName: fileName,
        };
        await setDoc(docRef, updatedPostData);
      } else {
        const updatedPostData = {
          ...postData,
        };
        await setDoc(docRef, updatedPostData);
      }
      closeModal();
      dispatch(setUpdate());

    } catch (error) {
      console.error("Error updating document:", error);
    }
    setTimerDisabled(true);
  };


  const openModal = () => {
    dispatch(
      setPostData({
        id: data.id,
        title: data.title || "",
        tags: data.tags,
        description: data.description || "",
        fileName: data.fileName || "",
        fileUrl: data.fileUrl || "",
        date: data.date,
      })
    );
    setShowModal(true);

  };


  const closeModal = () => {
    setShowModal(false);
  };


  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".admin_post")) {
      closeModal();
    }
  };


  const deleteDocument = async () => {
    setTimerDisabled(false);
    try {
      await deleteDoc(doc(firestore, "posts", data.id));

      const imageRef = ref(storage, data.fileUrl);
      await deleteObject(imageRef);

      console.log("Document successfully deleted!");
      dispatch(setUpdate());
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
    setTimerDisabled(true);
  };


  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);


  const handleCopyLink = () => {
    const currentURL = window.location.href;
    const postLink = currentURL + '/post?id=03thoC9PIHdXnxdEcqKw';
    
    navigator.clipboard.writeText(postLink)
      .then(() => {
        setIsLinkCopied(true);
        setTimeout(() => setIsLinkCopied(false), 3000);
      })
      .catch((err) => {
        console.error('Failed to copy link:', err);
      });
  };
  

  return (
    <div className="max-w-[50%] p-5 w-full ">
      <div className="bg-gray-100 rounded-[10] shadow-lg relative  transform transition-transform duration-500 hover:scale-[1.02] overflow-hidden">
      <div className="absolute z-[5]  flex right-0 p-2 admin_panel opacity-40 transition-opacity duration-300 text-white admin_panel">
        {user ? (
          <>
            <button
              className="bg-color-primary-dark mx-1 h-10 w-10 rounded-full  transform scale-90 transition-all duration-300 hover:scale-110  text-lg hover:text-xl"
              onClick={openModal}
              disabled={!timerDisabled}
            >
              ✎
            </button>
            <button
              className="bg-color-primary-dark mx-1  h-10 w-10 rounded-full  transform scale-90 transition-all duration-300 hover:scale-110  text-lg hover:text-xl"
              onClick={deleteDocument}
              disabled={!timerDisabled}
            >
              ✖
            </button>{" "}
            </>
        ) : (
          ""
        )} 
        <button
        className="bg-color-primary-dark mx-1 h-10 w-10 rounded-full transform scale-90 transition-all duration-300 hover:scale-110 text-lg hover:text-xl flex justify-center items-center"
        onClick={handleCopyLink}
      >
   {isLinkCopied ? '✔' : <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="copy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="22" height="22"><path fill="currentColor" d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"></path></svg>}
      </button>
          </div>
        <Link
          className="relative h-64  overflow-hidden block bg-black rounded-t-[10px] "
          href={{
            pathname: '/blog/post',
            query: { id: data.id }
          }}
          data-wpel-link="internal"
        >
          <img

            src={data.fileUrl}
            className="absolute inset-0 w-full h-full object-cover object-center"
            alt={data.title}
            loading="lazy"
          />
        </Link>
        <div className="min-h-[256px]  p-2 md:p-5 flex flex-col justify-between">
          <div className="card-top">
            <p className="card-tag block h-[35px] overflow-hidden">
              <span className="tags-list text-2xl font-semibold text-primary-darkTeal">
                {formatTagsArray(data.tags)}
              </span>{" "}
            </p>
          <div        className="text-2xl font-bold block h-[35px]  overflow-hidden">
            <Link
              href={{
                pathname: '/blog/post',
                query: { id: data.id }
              }}
       
              data-wpel-link="internal"
            >
              {data.title}
            </Link></div>
            <div className="my-2 h-[100px]  overflow-hidden">{data.description}</div>
          </div>
          <div className="flex">
            <span className="card-read">{`${calculateReadingTime(data.description)} min read`}</span>
            <svg
              width="4"
              height="4"
              viewBox="0 0 4 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-2 my-auto"
            >
              <circle cx="2" cy="2" r="2" fill="#ACBAC2"></circle>
            </svg>
            <span className="card-date">{data.date}</span>
          </div>
        </div>
      </div>
      {showModal && <Modal onClick={updateDocument} closeModal={closeModal} />}
    </div>
  );
};

export default BlogPost;
