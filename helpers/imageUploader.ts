// imageUploader.ts
import axios from "axios";

const CLOUDINARY_PRESET = "ml_default";
const CLOUDINARY_CLOUD_NAME = "dnjib5s5z";

export const uploadImageToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_PRESET);

  try {
    const response = await axios.post<any>(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );
    const imageUrl = response.data.secure_url;
    return imageUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
