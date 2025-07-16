// useImageUpload.ts
import { toast } from "@/components/ui/use-toast";
import { uploadImageToCloudinary } from "@/helpers/imageUploader";
import { useState } from "react";

export const useImageUpload = () => {
  const [image, setImage] = useState<string>("");

  const handleImageUpload = async (files: FileList | null) => {
    if (files && files[0]) {
      try {
        const imageUrl = await uploadImageToCloudinary(files[0]);
        setImage(imageUrl);
      } catch (error) {
        toast({
          title: "Image upload failed!",
          description: "Please try again later.",
        });
      }
    }
  };

  return { image, handleImageUpload };
};
