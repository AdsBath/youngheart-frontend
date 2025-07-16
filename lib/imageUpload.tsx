import axios from "axios";

const CLOUDINARY_PRESET = "ml_default";
const CLOUDINARY_CLOUDENAME = "dxeew8kbu";

const ImageUploader = async (file: string | Blob) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_PRESET);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUDENAME}/image/upload`,
      formData
    );
    const publicId = response?.data?.public_id;

    const imageUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUDENAME}/image/upload/f_webp/${publicId}`;

    return [imageUrl, response?.statusText];
  } catch (error: any) {
    console.error("Error uploading image:", error);

    if (error.response) {
      console.error("Error response:", error.response.data);
    }
    throw error; // Rethrow the error to handle it further up the call stack
  }
};

export default ImageUploader;
