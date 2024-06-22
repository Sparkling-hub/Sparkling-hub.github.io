import Link from "next/link";
import IPost from "@/interface/IPost";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Modal from "../../post_interface/post_interface";
import {
  selectPostFormData,
  setPostData,
} from "@/store/redusers/postReduser";
import { selectUserAuth } from "@/store/redusers/userReducer";
import {
  formatTagsArray,
  deleteDocument,
  handleCopyLink,
  updateDocument,
  openModal
} from "@/components/helper/post-helper";

import parse from 'html-react-parser';
const BlogPost: React.FC<IPost> = (data) => {
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const { user } = useSelector(selectUserAuth);
  const [timerDisabled, setTimerDisabled] = useState(true);
  const dispatch = useDispatch();
  const { postData } = useSelector(selectPostFormData);
  const [showModal, setShowModal] = useState(false);




  const closeModal = () => {
    setShowModal(false);
  };


  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".admin_post")) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);




  return (
    <div className=" w-full relative">      <div className="absolute z-[5] flex right-0 p-2 admin_panel opacity-40 transition-opacity duration-300 text-white admin_panel">
      {user ? (
        <>
          <button
            className="bg-color-primary-dark mx-1 h-10 w-10 rounded-full  transform scale-90 transition-all duration-300 hover:scale-110  text-lg hover:text-xl"
            onClick={() => openModal(data, dispatch, setPostData, setShowModal)}
            disabled={!timerDisabled}
          >
            ✎
          </button>
          <button
            className="bg-color-primary-dark mx-1  h-10 w-10 rounded-full  transform scale-90 transition-all duration-300 hover:scale-110  text-lg hover:text-xl"
            onClick={() => deleteDocument(data, setTimerDisabled, dispatch)}
            disabled={!timerDisabled}
          >
            ✖
          </button>{" "}
        </>
      ) : (
        ""
      )}
      <button
        className="bg-color-primary-dark h-10 w-10 rounded-full transform scale-90 transition-all duration-300 hover:scale-110 text-lg hover:text-xl flex justify-center items-center"
        onClick={() => handleCopyLink(data, setIsLinkCopied)}
      >
        {isLinkCopied ? '✔' : <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="copy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="22" height="22"><path fill="currentColor" d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"></path></svg>}
      </button>
    </div>
      <div className="bg-color-primary-dark rounded-[10px] shadow-lg  overflow-hidden flex p-10">

        <Link
          className="relative h-auto w-[30%] overflow-hidden block  "
          href={{
            pathname: '/blog/post',
            query: { id: data.id }
          }}
          data-wpel-link="internal"
        >
          <img

            src={data.fileUrl}
            className="inset-0 absolute bg-black  w-auto h-full object-cover object-center rounded-[5px] m-auto text-white"
            alt={data.title}
            loading="lazy"
          />
        </Link>
        <div className="h-full mx-10 flex flex-col justify-between max-w-[70%]">
          <div className="h-full ">
            <p className="card-tag block max-h-[50px] overflow-hidden  w-5/6">
              <span className="tags-list text-lg font-semibold  text-primary-light">
                {formatTagsArray(data.tags)}
              </span>{" "}
            </p>
            <div className="text-2xl font-extrabold block max-h-[95px] overflow-hidden my-5 text-white">
              <Link
                href={{
                  pathname: '/blog/post',
                  query: { id: data.id }
                }}

                data-wpel-link="internal"
              >
                {data.title}
              </Link></div>
            <div className="my-5 h-[100px]  overflow-hidden text-white">{parse(data.description)}</div>
          </div>
          <div className="flex">


            <span className="card-date  text-primary-light text-sm font-bold">{data.date}</span>
          </div>
        </div>
      </div>
      {showModal && <Modal onClick={(selectedImage: File | null) => updateDocument(data, postData, setTimerDisabled, closeModal, dispatch, selectedImage)} closeModal={closeModal} />}
    </div>
  );
};

export default BlogPost;
