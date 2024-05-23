export function formatTags(data) {
  return data.map(item => {
    if (typeof item.tags === 'string') {
      item.tags = item.tags.split(',').map(tag => tag.trim());
    }
    return item;
  });
}
  
import IJob from '@/interface/IJob';

 
export const getIds = (data, name) => {
  const allTags = data.reduce((acc, item) => {
    const value = item[name];
    if (Array.isArray(value)) {
      acc.push(...value.filter(tag => tag.trim() !== ''));
    } else if (typeof value === 'string') {
      const trimmedValue = value.trim();
      if (trimmedValue !== '') {
        acc.push(trimmedValue);
      }
    }
    return acc;
  }, []);

  const uniqueTags = Array.from(new Set(allTags));
  return uniqueTags;
};


 
export const get = (data, name) => {
  let result= [];
  Object.keys(data).forEach((key) => {
 
    if (key == name) result =  data[key];
  });
  return result;

};
