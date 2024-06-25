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
        form.append('description',   formData.description);
      
        form.append('img', formData.img);
        form.append('file', file); 
        formData.tags.forEach(tag => {
          form.append('tags', tag);
        });
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

    const { postsData } = responseData; // Destructure postsData from the response data
    return postsData; // Return the postsData array
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error("Failed to fetch data");
  }
};
export const uploadPhoto = async (file) => {  
  const form = new FormData();
  form.maxFileSize = 10 * 1024 * 1024;
  form.append('file', file);

 
  try {
      const response = await fetch("/api/upload-photo", {
          method: "POST",
   
          body: form,
      });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const responseData = await response.json();
    const { uploadedFile } = responseData; // Extract uploadedFile from response data

    return uploadedFile; // Return the uploadedFile object
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error("Failed to fetch data");
  }
}