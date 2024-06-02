import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { uploadPhoto } from "@/lib/api";
import { firestore, storage } from "@/config/firebase-client";
import { setUpdate } from "@/store/redusers/postReduser";

export function formatTagsArray(tagsArray: any): string {
  if (!Array.isArray(tagsArray)) {
    throw new Error("Input is not an array");
  }
  const filteredTags = tagsArray.filter((tag) => tag.trim() !== "");
  const tagsString = filteredTags.join(", ");
  return tagsString;
}

export async function updateDocument(
  data: any,
  postData: any,
  setTimerDisabled: (value: boolean) => void,
  closeModal: () => void,
  dispatch: any,
  selectedImage:File | null,
): Promise<void> {
  setTimerDisabled(false);
  try {
    const docRef = doc(firestore, "posts", data.id);
    const imageRef = ref(storage, data.fileUrl);
    if (selectedImage) {
      await deleteObject(imageRef);
      const { fileUrl, fileName } = await uploadPhoto(selectedImage);
      const updatedPostData = { ...postData, fileUrl: fileUrl, fileName: fileName };
      await setDoc(docRef, updatedPostData);
    } else {
      const updatedPostData = { ...postData };
      await setDoc(docRef, updatedPostData);
    }
    closeModal();
    dispatch(setUpdate());
  } catch (error) {
    console.error("Error updating document:", error);
  }
  setTimerDisabled(true);
}





export const calculateReadingTime = (text: string) => {
    if (!text) return 0;
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = words / wordsPerMinute;
    return Math.ceil(minutes);
  };


export async function deleteDocument(
  data: any,
  setTimerDisabled: (value: boolean) => void,
  dispatch: any
): Promise<void> {
  setTimerDisabled(false);
  try {
    await deleteDoc(doc(firestore, "posts", data.id));
    const imageRef = ref(storage, data.fileUrl);
    await deleteObject(imageRef);
    console.log("Document successfully deleted!");
    dispatch(setUpdate());
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
  setTimerDisabled(true);
}

export function handleCopyLink(data: any, setIsLinkCopied: (value: boolean) => void): void {
  const currentURL = window.location.href;
  const postLink = currentURL + `/post?id=${data.id}`;
  navigator.clipboard
    .writeText(postLink)
    .then(() => {
      setIsLinkCopied(true);
      setTimeout(() => setIsLinkCopied(false), 3000);
    })
    .catch((err) => {
      console.error("Failed to copy link:", err);
    });
}
