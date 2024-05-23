import React from 'react';
import IMultiSelectActiveItem from '@/interface/IMultiSelectActiveItem';
import { deleteActiveItem, selectPostFormData } from '@/store/redusers/postReduser';
import { useDispatch, useSelector } from 'react-redux';
import { get } from '@/components/helper/split';

const MultiSelectActiveItem: React.FC<IMultiSelectActiveItem> = ({id, name}) => {
  const dispatch = useDispatch();
  const { activeIds	} = useSelector(selectPostFormData);
  const deleteItem = (e: React.MouseEvent<HTMLSpanElement>) => {
    const value = e.currentTarget.id.toString();
    let result = get(activeIds, name)
    dispatch(deleteActiveItem({ id: value, ids: result, name }));
    e.stopPropagation();
  };
  
  return (
    <div className="flex flex-no-wrap active-item-container z-50 m-1" title={id}>
      <div className="" title="Remove item" aria-label="Remove item" aria-describedby="select2-filter_locations-container-choice-rjty-Tel Aviv">
        <span
          className='delete_item_button text-red-900 font-bold text-sm'
          id={id}
          aria-hidden="true"
          onClick={(event) => deleteItem(event)}>
          ×
        </span>
      </div>
      <span className="item-title select2-selection__choice__display">
        {id}
      </span>
    </div>
  );
};

export default MultiSelectActiveItem;