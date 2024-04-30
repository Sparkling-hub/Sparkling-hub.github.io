export const sendContactForm = async (formData,fileData) => {
  try {

    const form = new FormData();
    form.maxFileSize =10 * 1024 * 1024
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    form.append('file', fileData);

    const response = await fetch("/api/contact", {
      method: "POST",
      body: form, 
    });


    if (!response.ok) {
      throw new Error("Failed to send message");
    }



    return { success: true};
  } catch (error) {
  
    throw new Error("Failed to fetch");
  }
};

export const getKey = async (formData, fileData) => {
  try {
    const response = await fetch("/api/reCaptcha", {
      method: "POST",
      body: JSON.stringify({ formData, fileData }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    const { siteKey } = await response.json();

    return siteKey;
  } catch (error) {
    throw new Error("Failed to fetch");
  }
};
export const createPost = async (formData, file) => {

  const form = new FormData();
  form.maxFileSize =10 * 1024 * 1024
        form.append('title', formData.title);
        form.append('text', formData.text);
        form.append('tags', formData.tags);
        form.append('img', formData.img);
        form.append('file', file); // Добавляем файл в FormData
 
  try {
      const response = await fetch("/api/create_post", {
          method: "POST",
   
          body: form,
      });
 
      if (!response.ok) {
          throw new Error("Failed to send message");
      }
 
      return { success: true };
  } catch (error) {
      throw new Error("Failed to fetch");
  }
};
export const login = async (formData) => {
  try {
      const response = await fetch("/api/login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json", 
          },
          body: JSON.stringify(formData), 
      });

      if (!response.ok) {
          throw new Error("Failed to send message");
      }

      return { success: true };
  } catch (error) {
      throw new Error("Failed to fetch");
  }
};


// pages/api/get_post.js

export const getPost = async () => {
  try {
    const response = await fetch("/api/get_post", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const responseData = await response.json(); // Await the response.json() method
    console.log('Received response data:', responseData); // Check the data received
    const { postsData } = responseData; // Destructure postsData from the response data
    console.log('Received postsData:', postsData); // Check the postsData array
    return postsData; // Return the postsData array
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error("Failed to fetch data");
  }
};
