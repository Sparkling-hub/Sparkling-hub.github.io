import IPost from "@/interface/IPost";
import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import Input from "@/components/ui/input-component";
import { selectPostFormData, setPostData } from "@/store/redusers/postReduser";
import { useDispatch, useSelector } from "react-redux";
import { firestore, storage, auth } from "@/config/firebase-client";
import { deleteObject, ref } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { uploadPhoto } from "@/lib/api";
import TextArea from "@/components/ui/text-area-component/text-area";
import { selectUserAuth, setUserAuth } from "@/store/redusers/userReducer";
import { onAuthStateChanged } from "firebase/auth";

interface PostComponentProps {
  post: IPost;
  onUpdatePost: (updatedPost: IPost) => void;
}

const PostComponent: React.FC<PostComponentProps> = ({
  post,
  onUpdatePost,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [timerDisabled, setTimerDisabled] = useState(true);
  const { postData } = useSelector(selectPostFormData);
  const dispatch = useDispatch();
  const isFormValid = postData.title && postData.tags && postData.description;
  const { user } = useSelector(selectUserAuth);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    if (name === "img") {
      const inputElement = e.currentTarget as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        const file = inputElement.files[0];
        const allowedFileTypes = [".png", ".jpg", ".jpeg"];
        const fileExtension = file.name.split(".").pop()?.toLowerCase() ?? "";
        if (!allowedFileTypes.includes(`.${fileExtension}`)) {
          alert("Invalid file type. Please select a PNG, JPG, or JPEG file.");
          inputElement.value = "";
          setSelectedImage(null);
          return;
        }
        setSelectedImage(file);
      } else {
        setSelectedImage(null);
      }
    } else {
      const { value } = e.target;
      dispatch(
        setPostData({
          ...postData,
          [name]: value,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(
      setPostData({
        id: post.id,
        title: post.title || "",
        tags: post.tags,
        description: post.description || "",
        fileName: post.fileName || "",
        fileUrl: post.fileUrl || "",
        date: post.date,
      })
    );
  }, [post]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        dispatch(setUserAuth(true));
      } else {
        dispatch(setUserAuth(false));
      }
    });
  }, [post]);

  function formatTagsArray(tagsArray: any) {
    if (!Array.isArray(tagsArray)) {
     return tagsArray
    }
    else {const filteredTags = tagsArray.filter((tag) => tag.trim() !== "");
    const tagsString = filteredTags.join(", ");
    return tagsString;}
  }

  const imageUrl = selectedImage
    ? URL.createObjectURL(selectedImage)
    : postData.fileUrl || "";
  const reset = () => {
    setIsEditing(false);
    dispatch(
      setPostData({
        id: post.id,
        title: post.title || "",
        tags: formatTagsArray(post.tags),
        description: post.description || "",
        fileName: post.fileName || "",
        fileUrl: post.fileUrl || "",
        date: post.date,
      })
    );
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    setTimerDisabled(false);

    try {
      const docRef = doc(firestore, "posts", postData.id);
      let updatedPostData = { ...postData };

      if (selectedImage) {
        const imageRef = ref(storage, post.fileUrl);
        await deleteObject(imageRef);
        const { fileUrl, fileName } = await uploadPhoto(selectedImage);
        updatedPostData = {
          ...updatedPostData,
          fileUrl: fileUrl,
          fileName: fileName,
        };
      }

      await setDoc(docRef, updatedPostData);
      onUpdatePost(updatedPostData);
    } catch (error) {
      console.error("Error updating document:", error);
    }

    setTimerDisabled(true);
  };
  const verification =  (
    isEditing ? (
      <div className="flex">
        <button
          onClick={handleSaveClick}
          disabled={!timerDisabled || !isFormValid}
          className="no-underline mx-2 relative text-white py-3 px-8 bg-color-primary-dark rounded-full z-10 block hover:bg-teal-700"
        >
          Save
        </button>
        <button
          onClick={reset}
          disabled={!timerDisabled}
          className="no-underline relative text-white py-3 px-8 mx-2 bg-color-primary-dark rounded-full z-10 block hover:bg-teal-700"
        >
          Exit
        </button>
      </div>
    ) : (
      <button
        onClick={handleEditClick}
        disabled={!timerDisabled}
        className="no-underline relative w-auto text-white py-3 px-8 bg-color-primary-dark rounded-full z-10 block hover:bg-teal-700"
      >
        Edit
      </button>
    )
  ) ;

  const calculateReadingTime = (text: string) => {
    if (!text) return 0;
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = words / wordsPerMinute;
    return Math.ceil(minutes);
  };
  return (
    <div className="my-14 max-w-screen-2xl pb-14 mx-auto w-full px-8">
      <meta name="description" content={post.description} />
      <meta
        name="keywords"
        content="web development, programming, frontend, backend, website, careers, work"
      />
      <meta property="og:title" content={`Sparkling.Co. ${post.title}`} />
      <meta property="og:description" content={post.description} />
      <meta property="og:url" content={`/careers/postData?id=${post.id}`} />
      
      <div className="flex flex-row justify-between">
        <Link
          href={{ pathname: "/blog" }}
          className="flex items-center text-xl mb-4"
        >
          <img src="/img/jobs/arrowBack.png" alt="back" className="h-4" />{" "}
          Explore all posts
        </Link>

        
        {user ? verification:''}
      </div>
<div className="flex">
      {!isEditing ? (
        <img src={post.fileUrl} alt="image post" className="h-[300px] pr-7" />
      ) : (
        <div>
          <Input
            type="file"
            name="img"
            allowedFileTypes=".png, .jpg, .jpeg"
            value={""}
            onChange={handleInputChange}
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Selected Image"
              className="mt-2 max-h-[300px] max-w-full h-auto"
            />
          )}
        </div>
      )}
    <div className="flex flex-col"> {isEditing ? (
        <Input
          type="text"
          name="title"
          value={postData.title}
          onChange={handleInputChange}
          checked={!postData.title}
        />
      ) : (
        <h1 className="text-5xl mb-6 mx-1 ">{post.title}</h1>
      )}
    <div className="flex text-sm font-bold">
            <span className="">{`${calculateReadingTime(post.description)} min read`}</span>
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
            <span className="">{post.date}</span>
          </div>

     </div> 

    </div>
    <div className="my-5">
      <h2>
      
      {isEditing ? (
        <Input
          type="text"
          name="tags"
          value={postData.tags}
          onChange={handleInputChange}
          checked={!postData.tags}
        />
      ) : (
        <h2 className="text-2xl underline mb-6 mx-1">{formatTagsArray(post.tags)}</h2>
      )}

      </h2>
    {isEditing ? (
        <TextArea
          name="description"
          value={postData.description}
          onChange={handleInputChange}
          checked={!postData.description}
          placeholder={"Input description"}
        />
      ) : (
        <p className="text-xl pb-8">{post.description}</p>
      )}</div>
    </div>
  );
};

export default PostComponent;
