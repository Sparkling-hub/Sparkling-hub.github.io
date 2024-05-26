export function formatTags(data) {
  return data.map(item => {
    if (typeof item.tags === 'string') {
      item.tags = item.tags.split(',').map(tag => tag.trim());
    }
    return item;
  });
}


export const getIds = (data, name) => {
  const result = [];
  const uniqueValues = new Set();
 
  data.forEach((item) => {
    const value = item[name];
    if (Array.isArray(value)) {
      value.filter(tag => tag.trim() !== '').forEach((tag) => {
        if (!uniqueValues.has(tag)) {
          let count = data.filter((el) => Array.isArray(el[name]) ? el[name].includes(tag) : el[name] === tag).length;
          result.push({ value: tag, count });
          uniqueValues.add(tag);
        }
      });
    } else if (typeof value === 'string') {
      const trimmedValue = value.trim();
      if (trimmedValue !== '' && !uniqueValues.has(trimmedValue)) {
        let count = data.filter((el) => Array.isArray(el[name]) ? el[name].includes(trimmedValue) : el[name] === trimmedValue).length;
        result.push({ value: trimmedValue, count });
        uniqueValues.add(trimmedValue);
      }
    }
  });  
  return result;
};


export const get = (data, name) => {
  let result = [];
  Object.keys(data).forEach((key) => {

    if (key == name) result = data[key];
  });
  return result;

};
