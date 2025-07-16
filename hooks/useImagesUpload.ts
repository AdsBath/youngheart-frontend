import { toast } from "@/components/ui/use-toast";
import uploadImagesToCloudinary from "@/helpers/imagesUploader";

import { useState } from "react";

export const useImagesUpload = () => {
    const [images, setImages] = useState<string[]>([]);

    const handleImagesUpload = async (files: any) => {
        const fileArray = [];
        for (let i = 0; i < files?.length; i++) {
            if (files[i]) {
                // Check if the property exists
                fileArray.push(files[i]);
            }
        }

        if (files && files[0]) {
            try {
                const imageUrl = await uploadImagesToCloudinary(fileArray);
                setImages(imageUrl);
            } catch (error) {
                toast({
                    title: "Image upload failed!",
                    description: "Please try again later.",
                });
            }
        }
    };

    return { images, handleImagesUpload };
};
