export function formatTags(data) {
  return data.map(item => {
    if (typeof item.tags === 'string') {
      item.tags = item.tags.split(',').map(tag => tag.trim());
    }
    return item;
  });
}
export function formatTag(data) {
  if (data && typeof data.tags === 'string') {
    return {
      ...data,
      tags: data.tags.split(',').map(tag => tag.trim())
    };
  }
  return data;
}



const getCount = (data, name, lowerCaseValue) => {
  return data.filter((el) => 
    Array.isArray(el[name])
      ? el[name].map(t => t.toLowerCase()).includes(lowerCaseValue)
      : el[name].toLowerCase() === lowerCaseValue
  ).length;
};

const processArrayValue = (value, data, name, result, uniqueValues) => {
  value.filter(tag => tag.trim() !== '').forEach((tag) => {
    const lowerCaseTag = tag.toLowerCase();
    if (!uniqueValues.has(lowerCaseTag)) {
      const count = getCount(data, name, lowerCaseTag);
      result.push({ value: capitalizeFirstLetter(tag), count });
      uniqueValues.add(lowerCaseTag);
    }
  });
};

const processStringValue = (value, data, name, result, uniqueValues) => {
  const trimmedValue = value.trim();
  const lowerCaseValue = trimmedValue.toLowerCase();
  if (lowerCaseValue !== '' && !uniqueValues.has(lowerCaseValue)) {
    const count = getCount(data, name, lowerCaseValue);
    result.push({ value: capitalizeFirstLetter(trimmedValue), count });
    uniqueValues.add(lowerCaseValue);
  }
};

export const getIds = (data, name) => {
  const result = [];
  const uniqueValues = new Set();

  data.forEach((item) => {
    const value = item[name];
    if (Array.isArray(value)) {
      processArrayValue(value, data, name, result, uniqueValues);
    } else if (typeof value === 'string') {
      processStringValue(value, data, name, result, uniqueValues);
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
