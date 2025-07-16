import axios from "axios";

const CLOUDINARY_PRESET = "ml_default";
const CLOUDINARY_CLOUDENAME = "dnjib5s5z";

const uploadImagesToCloudinary = async (files: File[]): Promise<string[]> => {
    const formDataArray = files?.map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_PRESET);
        return formData;
    });

    try {
        const uploadRequests = formDataArray?.map(async (formData) => {
            return await axios.post(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUDENAME}/image/upload`,
                formData
            );
        });
        const responses = await Promise.all(uploadRequests);
        const imageUrls = responses?.map(
            (response) => response.data.secure_url
        );
        return imageUrls;
    } catch (error) {
        console.error("Error uploading images:", error);
        throw error;
    }
};

export default uploadImagesToCloudinary;
