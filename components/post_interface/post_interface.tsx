import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from '@tinymce/tinymce-react';
import {
  selectPostFormData,
  setPostData
} from '@/store/redusers/postReduser';
import Input from "../ui/input-component";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface BlogProps {
  onClick: (file: File | null) => void;
  closeModal: () => void;
}

const Blog: React.FC<BlogProps> = ({ onClick, closeModal }) => {
  const dispatch = useDispatch();
  const { postData } = useSelector(selectPostFormData);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const imageUrl = selectedImage
    ? URL.createObjectURL(selectedImage)
    : postData.fileUrl || '';
    
  const isFormValid = postData.title && postData.tags && postData.description;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'img') {
      const inputElement = e.currentTarget as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        const file = inputElement.files[0];
        const allowedFileTypes = ["png", "jpg", "jpeg"];
        const fileExtension = file.name.split('.').pop()?.toLowerCase() ?? '';
        if (!allowedFileTypes.includes(fileExtension)) {
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
      dispatch(setPostData({
        ...postData,
        [name]: value,
      }));
    }
  };

  const handleEditorChange = (content: string, editor) => {
    dispatch(setPostData({
      ...postData,
      description: content,
    }));
  };

  const handleSave = async () => {
    onClick(selectedImage);
  };

  return (
    <div className="fixed w-[80%] top-[20%] left-[10%] z-[5000] bg-gray-200 rounded-[10px] p-10 shadow-xl admin_post">
      <div className="flex justify-between pb-5">
        <h2>Add Blog</h2>
        <button className="no-underline relative w-auto text-white py-3 px-8 bg-color-primary-dark rounded-full z-10 block hover:bg-teal-700" onClick={closeModal}> X </button>
      </div>
      <div className="flex p-5">
        <div className="relative ">
          <p className="absolute text-sm right-2 py-11 ">Upload image</p>
          <Input
            type="file"
            name="img"
            allowedFileTypes=".png, .jpg, .jpeg"
            value={postData.img}
            checked={!(selectedImage || postData.fileUrl)}
            onChange={handleInputChange}
          />      
          {imageUrl && <img src={imageUrl} alt="Selected Image" className="mt-2 max-h-[400px] max-w-full h-auto" />}
        </div>
        <div className="w-full ml-10">
          <Input
            type="text"
            name="title"
            value={postData.title}
            placeholder="Title"
            onChange={handleInputChange}
            checked={!postData.title}
          />
          <Input
            type="text"
            name="tags"
            value={postData.tags}
            placeholder="Tags"
            onChange={handleInputChange}
            checked={!postData.tags}
          />
          {typeof window !== 'undefined' && (
            <Editor
              value={postData.description}
              apiKey="xbfk6hhn4q3dh5nxtq3mhpqwbcpm9i4d0t2tjtnlz28rnght"
              onEditorChange={handleEditorChange}
            />
          )}
        </div>
      </div>
      <button 
        type="submit" 
        disabled={!isFormValid}
        onClick={handleSave} 
        className="no-underline relative w-auto text-white py-3 px-12 bg-color-primary-dark rounded-full z-10 block hover:bg-teal-700 m-auto"
      >
        Save
      </button>
    </div>
  );
};

export default Blog;
