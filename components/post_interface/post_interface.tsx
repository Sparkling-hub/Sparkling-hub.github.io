
import { ChangeEvent, useEffect, useState } from "react";
import {
  selectPostFormData,
  setPostData
} from '@/store/redusers/postReduser';
import Input from "../ui/input-component";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertFromHTML, convertFromRaw, convertToRaw , ContentState} from 'draft-js'; 
import dynamic from "next/dynamic";
import draftToHtml from "draftjs-to-html";

interface BlogProps {
  onClick: (file: File | null) => void;
  closeModal: () => void;
}
const DynamicEditor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
});
const Blog: React.FC<BlogProps> = ({ onClick, closeModal }) => {
  const dispatch = useDispatch();
  const [editorState, setEditorState] = useState<EditorState | undefined>(undefined);
  const { postData } = useSelector(selectPostFormData);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const imageUrl = selectedImage
    ? URL.createObjectURL(selectedImage)
    : postData.fileUrl || '';
    const isFormValid = postData.title && postData.tags && postData.description;



    
    useEffect(() => {
      if (!editorState) {
        // Если в postData.description есть значение, конвертируем его в HTML и устанавливаем в editorState
        if (postData.description) {
          const blocksFromHTML = convertFromHTML(postData.description);
          const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
          );
          setEditorState(EditorState.createWithContent(state));
        } else {
          setEditorState(EditorState.createEmpty());
        }
      }
    }, [editorState, postData.description]);
    

    const convertHtmlToText = (htmlString: any) => {
      const contentState = convertFromRaw({
        entityMap: {},
        blocks: [
          {
            text: htmlString,
            type: 'unstyled',
            key: 'foo',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: []
          },
        ],
      });
      return EditorState.createWithContent(contentState).getCurrentContent().getPlainText();
    };

    const convertTextToHtml = (textString: any) => {
      const contentState = convertFromRaw({
        entityMap: {},
        blocks: [
          {
            text: textString,
            type: 'unstyled',
            key: 'foo',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: []
          },
        ],
      });
      const editorState = EditorState.createWithContent(contentState);
      return draftToHtml(convertToRaw(editorState.getCurrentContent()));
    };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    if (name === 'img') {
      const inputElement = e.currentTarget as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        const file = inputElement.files[0];
        const allowedFileTypes = [".png", ".jpg", ".jpeg"];
        const fileExtension = file.name.split('.').pop()?.toLowerCase()?file.name.split('.').pop()?.toLowerCase() : '';
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
  const onEditorStateChange = (editorState:any) => {
    console.log(editorState);
    setEditorState(editorState);
    // Получаем HTML код из текущего контента и сохраняем его
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const htmlContent = draftToHtml(rawContentState);
    dispatch(setPostData({ ...postData, description: htmlContent }));
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

          />      {imageUrl && <img src={imageUrl} alt="Selected Image" className="mt-2 max-h-[400px] max-w-full h-auto" />}
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
          {/* <TextArea
            name="description"
            placeholder="Tell us about your project and goals"
            value={postData.description}
            onChange={handleInputChange}
            checked={!postData.description}
          /> */}
{typeof window !== 'undefined' && (
            <DynamicEditor
              editorState={editorState}
              toolbarClassName="bg-white static "
              wrapperClassName="bg-white bg-white   overflow-hidden "
              editorClassName="bg-white px-4  max-h-[250px] "
              onEditorStateChange={onEditorStateChange}
            />
          )}
        </div>
      </div>
      <button type="submit"     disabled={!isFormValid}
        onClick={() => {
          onClick(selectedImage);
        }} className="no-underline relative w-auto text-white py-3 px-12 bg-color-primary-dark rounded-full z-10 block hover:bg-teal-700 m-auto ">Save</button>
    </div>

  );
};

export default Blog;
