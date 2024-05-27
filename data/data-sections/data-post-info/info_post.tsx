import IPost from "@/interface/IPost";
import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import Input from "@/components/ui/input-component";
import { selectPostFormData, setPostData } from "@/store/redusers/postReduser";
import { useDispatch, useSelector } from "react-redux";
import { firestore, storage } from "@/config/firebase-client";
import { deleteObject, ref } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { uploadPhoto } from "@/lib/api";

interface PostComponentProps {
  post: IPost;
  onUpdatePost: (updatedPost: IPost) => void; 
}

const PostComponent: React.FC<PostComponentProps> = ({ post, onUpdatePost }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [timerDisabled, setTimerDisabled] = useState(true);
  const { postData } = useSelector(selectPostFormData);
  const dispatch = useDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    if (name === 'img') {
      const inputElement = e.currentTarget as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        const file = inputElement.files[0];
        const allowedFileTypes = [".png", ".jpg", ".jpeg"];
        const fileExtension = file.name.split('.').pop()?.toLowerCase() ?? '';
        if (!allowedFileTypes.includes(`.${fileExtension}`)) {
          alert("Invalid file type. Please select a PNG, JPG, or JPEG file.");
          inputElement.value = '';
          setSelectedImage(null);
          return;
        }
        setSelectedImage(file);
      } else {
        setSelectedImage(null);
      }
    } else {
      const { value } = e.target;
      dispatch(setPostData({
        ...postData,
        [name]: value,
      }));
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

  const imageUrl = selectedImage
    ? URL.createObjectURL(selectedImage)
    : postData.fileUrl || '';

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

  return (
    <div className="my-14 max-w-screen-2xl pb-14 mx-auto w-full px-8">
      <meta name="description" content={postData.description} />
      <meta name="keywords" content="web development, programming, frontend, backend, website, careers, work" />
      <meta property="og:title" content={`Sparkling.Co. ${postData.title}`} />
      <meta property="og:description" content={postData.description} />
      <meta property="og:url" content={`/careers/postData?id=${postData.id}`} />
<div className="flex flex-row justify-between">
      <Link href={{ pathname: "/blog" }} className="flex items-center text-xl mb-4">
        <img src="/img/jobs/arrowBack.png" alt="back" className="h-4" /> Explore all posts
      </Link>
      {isEditing ? (
        <button onClick={handleSaveClick} disabled={!timerDisabled} className="no-underline relative text-white py-3 px-8 bg-color-primary-dark rounded-full z-10 block hover:bg-teal-700">
          Save
        </button>
      ) : (
        <button onClick={handleEditClick} disabled={!timerDisabled}  className="no-underline relative w-auto text-white py-3 px-8 bg-color-primary-dark rounded-full z-10 block hover:bg-teal-700">
          Edit
        </button>
      )}
      </div>
      {isEditing ? (
        <input
          type="text"
          name="title"
          value={postData.title}
          onChange={handleInputChange}
          className="text-5xl mb-6 mx-1 border"
        />
      ) : (
        <h1 className="text-5xl mb-6 mx-1">{postData.title}</h1>
      )}
    

      <p className="text-xl pb-8">{postData.date}</p>
      {isEditing ? (
        <input
          type="text"
          name="tags"
          value={postData.tags}
          onChange={handleInputChange}
          className="text-2xl mb-6 mx-1 border"
        />
      ) : (
        <h2 className="text-2xl mb-6 mx-1">{postData.tags}</h2>
      )}
      {!isEditing ? (
        <img src={postData.fileUrl} alt="image post" className="h-[500px]" />
      ) : (
        <div>
          <Input
            type="file"
            name="img"
            allowedFileTypes=".png, .jpg, .jpeg"
            value={''}
            onChange={handleInputChange}
          />
          {imageUrl && <img src={imageUrl} alt="Selected Image" className="mt-2 max-h-[400px] max-w-full h-auto" />}
        </div>
      )}

      {isEditing ? (
        <textarea
          name="description"
          value={postData.description}
          onChange={handleInputChange}
          className="w-full h-40 p-2 border"
        />
      ) : (
        <p className="text-xl pb-8">{postData.description}</p>
      )}

     
    </div>
  );
};

export default PostComponent;
