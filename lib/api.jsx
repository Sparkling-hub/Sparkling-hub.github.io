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
      headers: {
        "Content-Type": "multipart/form-data",
      },
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