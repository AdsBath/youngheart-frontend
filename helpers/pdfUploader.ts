// imageUploader.ts
import axios from "axios";

const CLOUDINARY_PRESET = "ml_default";
const CLOUDINARY_CLOUD_NAME = "dnjib5s5z";

export const uploadPdfToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string
  );

  try {
    const response = await axios.post<any>(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_PRESETS}/raw/upload`,
      formData,
      {
        headers: {
          "Content-Type": "application/pdf",
        },
        params: {
          resource_type: "raw", // Ensure raw type is specified
        },
      }
    );
    const imageUrl = response.data.secure_url;
    return imageUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
