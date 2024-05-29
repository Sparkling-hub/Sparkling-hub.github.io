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




  return (
    <div className="max-w-[50%] p-5 w-full ">
      <div className="bg-gray-100 rounded-[10] shadow-lg relative  transform transition-transform duration-500 hover:scale-[1.02]">
        {user ? (
          <div className="absolute z-[5] w-full flex justify-between p-2 admin_panel opacity-40 transition-opacity duration-300 text-white admin_panel">
            <button
              className="bg-color-primary-dark  h-10 w-10 rounded-full  transform scale-90 transition-all duration-300 hover:scale-110  text-lg hover:text-xl"
              onClick={openModal}
              disabled={!timerDisabled}
            >
              ✎
            </button>
            <button
              className="bg-color-primary-dark  h-10 w-10 rounded-full  transform scale-90 transition-all duration-300 hover:scale-110  text-lg hover:text-xl"
              onClick={deleteDocument}
              disabled={!timerDisabled}
            >
              ✖
            </button>{" "}
          </div>
        ) : (
          ""
        )}
        <Link
          className="relative h-64 overflow-hidden block bg-black rounded-t-[10px]"
          href={{
            pathname: '/blog/post',
            query: { id: data.id }
          }}
          data-wpel-link="internal"
        >
          <img

            src={data.fileUrl}
            className="w-full relative top-[-50%]"
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
