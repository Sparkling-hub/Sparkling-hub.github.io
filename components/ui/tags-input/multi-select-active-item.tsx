import React, { useState } from 'react';
import IMultiSelectActiveItem from '@/interface/IMultiSelectActiveItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPostFormData,
  setPostData,
} from "@/store/redusers/postReduser";

const MultiSelectActiveItem: React.FC<IMultiSelectActiveItem> = ({id, name}) => {
  const { postData } = useSelector(selectPostFormData);
  const [editor, setEditor] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(id);
  const dispatch = useDispatch();
  const deleteTag = (value:string) => {
    const newTags = postData.tags.filter(item => item !== value);
    dispatch(setPostData({
      ...postData,
      tags: newTags,
    }));
  }
  const deleteItem = (e: React.MouseEvent<HTMLSpanElement>) => {
    const value = e.currentTarget.id.toString();
    deleteTag(value);
    e.stopPropagation();
  };
  const toggleEditor = () => {
    setEditor(!editor);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const editTag = () => {
    if (inputValue){
    const newTags = postData.tags.map(item => item === id ? inputValue : item);
    console.log("new",newTags)
    console.log("postData ",postData.tags)
      dispatch(setPostData({
        ...postData,
        tags: newTags,
      }));
    }else {
      deleteTag(id);
    }
    toggleEditor();
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      editTag();
    }
  };
  return (
    <div className="flex flex-no-wrap mr-2 z-50 card" title={id}>
  
      {editor ? (
        
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={editTag}
                className='bg-white focus:outline-none'
            autoFocus
          />
        ) : (
          <div className=" bg-primary-lightTeal font-semibold text-lg rounded-lg text-white flex items-center" title="Remove item" aria-label="Remove item" aria-describedby="">
        
          <button className="item-title p-2" onClick={toggleEditor}>{id}</button>
          <button
            className='text-primary-darkTeal font-bold text-xl pr-2 '
            id={id}
            aria-hidden="true"
            onClick={(event) => deleteItem(event)}>
            ×
          </button>
        </div>
        )}
    </div>
  );
};

export default MultiSelectActiveItem;
