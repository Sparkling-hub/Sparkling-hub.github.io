import IPost from "@/interface/IPost";
import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import Input from "@/components/ui/input-component";
import {
  selectPostFormData,
  setPostData,
  setUniqueIds,
  addPostsToAllPosts,
} from "@/store/redusers/postReduser";
import {
  selectFilter,
  setActiveIds
} from "@/store/redusers/filterReducer";
import { useDispatch, useSelector } from "react-redux";
import { firestore, storage, auth } from "@/config/firebase-client";
import { deleteObject, ref } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { getPost, uploadPhoto } from "@/lib/api";
import { selectUserAuth, setUserAuth } from "@/store/redusers/userReducer";
import { onAuthStateChanged } from "firebase/auth";
import parse from "html-react-parser";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"; // Импорт стилей здесь
import BlogPost from "@/components/blog-post";
import { formatTags, getIds } from "@/components/helper/split";
import { Editor } from '@tinymce/tinymce-react';
import TagsInput from '@/components/ui/tags-input/tags-input'
import { EditorState } from "draft-js";
interface PostComponentProps {
  post: IPost;
  onUpdatePost: (updatedPost: IPost) => void;
}

const PostComponent: React.FC<PostComponentProps> = ({ post, onUpdatePost }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [timerDisabled, setTimerDisabled] = useState(true);
  const { activeIds } = useSelector(selectFilter);
  const { postData, allPosts } = useSelector(selectPostFormData);
  const dispatch = useDispatch();
  const isFormValid = postData.title && postData.tags && postData.description;
  const { user } = useSelector(selectUserAuth);

  const [posts, setPosts] = useState<IPost[]>([]);
  const [editorState, setEditorState] = useState<string | EditorState>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      dispatch(setPostData({ ...postData, [name]: value }));
    }
  };

  useEffect(() => {
    console.log(postData.tags)
    filterValue();
  }, [activeIds]);

  const filterValue = async () => {
    let filteredPosts = allPosts.filter((postData: IPost) => {
      const postTags = Array.isArray(postData.tags) ? postData.tags.map((tag) => tag.toLowerCase()) : [];
      if (postData.id === post.id) {
        return false;
      }
      if (Array.isArray(activeIds?.tags)) {
        const isTagIncluded = activeIds.tags.some((activeId: string) =>
          postTags.includes(activeId.toLowerCase())
        );
        return isTagIncluded;
      }
      return false;
    });
    setPosts(filteredPosts);
    return filteredPosts;
  };


  const fetchPosts = async () => {
    try {
      const response = await getPost();
      await formatTags(response);
      const result = { tags: getIds(response, "tags") };

      dispatch(setUniqueIds({ value: result }));
      dispatch(addPostsToAllPosts(response));
    } catch (error) {
      console.log(error);
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
  }, [post, dispatch]);

  useEffect(() => {
    const formattedTags = (postData).tags;

    const result = { tags: formattedTags };
    dispatch(setActiveIds({ value: result }));

    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        dispatch(setUserAuth(true));
      } else {
        dispatch(setUserAuth(false));
      }
    });

    const fetchData = async () => {
      if (allPosts.length === 0) {
        fetchPosts();
      }
    };
    fetchData();
  }, [allPosts.length, postData, dispatch]);

  function formatTagsArray(tagsArray: any) {
    if (!Array.isArray(tagsArray)) {
      return tagsArray;
    } else {
      const filteredTags = tagsArray.filter((tag) => tag.trim() !== "");
      const tagsString = filteredTags.join(", ");
      return tagsString;
    }
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

  useEffect(() => {
    if (!editorState) {
      if (postData.description) {
        setEditorState(postData.description);
      }
    }
  }, []);

  const handleSaveClick = async () => {
    const updatedPostData = { ...postData, description: editorState };
    dispatch(setPostData(updatedPostData));
    setIsEditing(false);
    setTimerDisabled(false);

    try {
      const docRef = doc(firestore, "posts", postData.id);
      let updatedPostDataWithImage = updatedPostData;

      if (selectedImage) {
        const imageRef = ref(storage, post.fileUrl);
        await deleteObject(imageRef);
        const { fileUrl, fileName } = await uploadPhoto(selectedImage);
        updatedPostDataWithImage = {
          ...updatedPostData,
          fileUrl: fileUrl,
          fileName: fileName,
        };
      }

      await setDoc(docRef, updatedPostDataWithImage);
      onUpdatePost(updatedPostDataWithImage);
    } catch (error) {
      console.error("Error updating document:", error);
    }

    setTimerDisabled(true);
  };

  let verification;

  if (user) {
    if (isEditing) {
      verification = (
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
      );
    } else {
      verification = (
        <button
          onClick={handleEditClick}
          disabled={!timerDisabled}
          className="no-underline relative w-auto text-white py-3 px-8 bg-color-primary-dark rounded-full z-10 block hover:bg-teal-700"
        >
          Edit
        </button>
      );
    }
  } else {
    verification = null;
  }

  const calculateReadingTime = (text: string) => {
    if (!text) return 0;
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = words / wordsPerMinute;
    return Math.ceil(minutes);
  };

  const handleEditorChange = (content: string, editor: any) => {
    setEditorState(content);
  };

  return (
    <div className="my-14 max-w-screen-2xl pb-14 mx-auto w-full px-8">
      <meta name="description" content={post.title} />
      <meta
        name="keywords"
        content="web development, programming, frontend, backend, website, careers, work"
      />
      <meta property="og:title" content={`Sparkling.Co. ${post.title}`} />
      <meta property="og:description" content={post.title} />
      <meta property="og:url" content={`/careers/postData?id=${post.id}`} />

      <div className="flex flex-row justify-between">
        <Link href={{ pathname: "/blog" }} className="flex items-center text-xl mb-4">
          <img src="/img/jobs/arrowBack.png" alt="back" className="h-4" /> Explore all posts
        </Link>
        {verification}
      </div>

      <div className="flex py-5 my-5">
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
        <div className="flex flex-col">
          {isEditing ? (
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
            <span className="">{`${calculateReadingTime(post.description.toString())} min read`}</span>
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

      <div className="my-5 border-y-[1px] py-10">
        <div>
          {isEditing ? (
            <TagsInput 
            />
          ) : (
            <h2 className="text-2xl underline mb-10 mx-1">{formatTagsArray(post.tags)}</h2>
          )}
        </div>
        {isEditing ? (
          <Editor
            initialValue={postData.description.toString()}
            apiKey={process.env.NEXT_PUBLIC_EDITOR_API_KEY}
            onEditorChange={handleEditorChange}
          />
        ) : (
          <div className="text-xl">{parse(postData.description.toString())}</div>
        )}
      </div>
      {posts.length > 0 && (
        <div>
          You might also like:
          <div className="flex">
            {posts.slice(0, 2).map((item: IPost) => (
              <BlogPost key={item.id} {...item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostComponent;
