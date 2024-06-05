export function formatTags(data) {
  return data.map(item => {
    if (typeof item.tags === 'string') {
      item.tags = item.tags.split(',').map(tag => tag.trim());
    }
    return item;
  });
}export const getIds = (data, name) => {
  const result = [];
  const uniqueValues = new Set();

  data.forEach((item) => {
    const value = item[name];
    if (Array.isArray(value)) {
      value.filter(tag => tag.trim() !== '').forEach((tag) => {
        const lowerCaseTag = tag.toLowerCase();
        if (!uniqueValues.has(lowerCaseTag)) {
          let count = data.filter((el) => Array.isArray(el[name]) ? el[name].map(t => t.toLowerCase()).includes(lowerCaseTag) : el[name].toLowerCase() === lowerCaseTag).length;
          result.push({ value: capitalizeFirstLetter(tag), count });
          uniqueValues.add(lowerCaseTag);
        }
      });
    } else if (typeof value === 'string') {
      const trimmedValue = value.trim();
      const lowerCaseValue = trimmedValue.toLowerCase();
      if (lowerCaseValue !== '' && !uniqueValues.has(lowerCaseValue)) {
        let count = data.filter((el) => Array.isArray(el[name]) ? el[name].map(t => t.toLowerCase()).includes(lowerCaseValue) : el[name].toLowerCase() === lowerCaseValue).length;
        result.push({ value: capitalizeFirstLetter(trimmedValue), count });
        uniqueValues.add(lowerCaseValue);
      }
    }
  });  
  return result;
};

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};


export const get = (data, name) => {
  let result = [];
  Object.keys(data).forEach((key) => {

    if (key == name) result = data[key];
  });
  return result;

};
