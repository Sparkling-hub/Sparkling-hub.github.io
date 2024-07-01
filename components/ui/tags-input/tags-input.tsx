import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  selectPostFormData,
  setPostData,
} from "@/store/redusers/postReduser";
import ActiveItem from './multi-select-active-item';
import { getIds } from '@/components/helper/split';


const addTagToArray = (tags: string[], newTag: string): string[] => {
  const newTags: string[] = [...tags, newTag];
  return newTags;
};

const MyMultipleSelect: React.FC = () => {
  const dispatch = useDispatch();
  const { postData, allPosts } = useSelector(selectPostFormData);
  const [inputValue, setInputValue] = useState('');
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  const [showScrollLeft, setShowScrollLeft] = useState(false);
  const [showScrollRight, setShowScrollRight] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const checkScrollButtons = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const contentWidth = containerRef.current.scrollWidth;
      const scrollLeft = containerRef.current.scrollLeft;

      setShowScrollLeft(scrollLeft > 0);
      setShowScrollRight(scrollLeft + containerWidth + 10 < contentWidth);
    }
  }, []);

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, [postData.tags, checkScrollButtons]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, [checkScrollButtons]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const lowercasedInput = e.target.value.toLowerCase();
    const tagPosts = getIds(allPosts, 'tags').map(item => item.value);
    setFilteredTags(tagPosts.filter(tag => tag.toLowerCase().includes(lowercasedInput)));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const tag = inputValue.trim();
    const lowercasedTag = tag.toLowerCase();
    const tagExists = Array.isArray(postData.tags) && postData.tags.length > 1 ? postData.tags.some(existingTag => existingTag.toLowerCase() === lowercasedTag) : false;

    if (tag && !tagExists) {
      const currentTags = (typeof postData.tags === 'string' && postData.tags) ? [postData.tags] : postData.tags;
      const newTags = addTagToArray(currentTags, tag);
      dispatch(setPostData({
        ...postData,
        tags: newTags,
      }));
    }

    setInputValue('');
    setFilteredTags([]);
  };

  const handleTagClick = (tag: string) => {
    const lowercasedTag = tag.toLowerCase();
    const tagExists = Array.isArray(postData.tags) ? postData.tags.some(existingTag => existingTag.toLowerCase() === lowercasedTag) : false;

    if (!tagExists) {
      const currentTags = postData.tags;
      const newTags = addTagToArray(currentTags, tag);
      dispatch(setPostData({
        ...postData,
        tags: newTags,
      }));
    }

    setInputValue('');
    setFilteredTags([]);
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -50, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 50, behavior: 'smooth' });
    }
  };

  return (
    <div className={`my-multiple-select active py-1 m-1`}>
      <div className={`my-multiple-select-container w-full flex-col flex rounded-lg relative bg-white border-bg-color-primary-medium h-auto`}>
        <div className={`min-h-[40px] flex left-3 items-center h-auto w-full`}>
          <div className="relative flex items-center max-w-[70%]">
            {showScrollLeft && (
              <button onClick={scrollLeft} className="absolute left-0 z-[100] bg-gray-200 px-2 py-1 rounded">←</button>
            )}
            <div ref={containerRef} className={`w-full  flex relative h-full overflow-hidden ${showScrollLeft || showScrollRight ? "mx-10" : ''}`}>
              <div className='flex  w-full'>
                {(() => {
                  if (Array.isArray(postData.tags)) {
                    return postData.tags.map((tag: string) => (
                      <ActiveItem key={uuidv4()} id={tag} name={tag} />
                    ));
                  } else if (postData.tags) {
                    return <ActiveItem key={uuidv4()} id={postData.tags} name={postData.tags} />;
                  } else {
                    return '';
                  }
                })()}
              </div>
            </div>
            {showScrollRight && (
              <button onClick={scrollRight} className="absolute right-0 z-[100]  bg-gray-200 px-2 py-1 rounded">→</button>
            )}
          </div>
          <div className='w-full '>
            <input
              type="text"
              className='p-2 focus:outline-none w-full'
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={addTag}
            />
            {filteredTags.length > 0 && (
              <div className="absolute bg-white border flex flex-col border-gray-300 rounded shadow-lg z-50 max-h-[250px] overflow-y-auto">
                {filteredTags.map(tag => (
                  <button
                    key={uuidv4()}
                    className="p-2 cursor-pointer hover:bg-gray-200 "
                    onMouseDown={() => handleTagClick(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyMultipleSelect;
