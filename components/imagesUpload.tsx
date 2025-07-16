import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import uploadImagesToCloudinary from "@/helpers/imagesUploader";
import { IconLoader } from "@tabler/icons-react";
import { Trash } from "lucide-react";
import { useRef, useState } from "react";
import { PiUploadDuotone } from "react-icons/pi";
import BlurImage from "./ui/blur-image";
import { Button } from "./ui/button";

interface ImagesUploadProps {
    onChange: (value: string | string[]) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const ImagesUpload: React.FC<ImagesUploadProps> = ({
    onChange,
    onRemove,
    value,
}) => {
    const fileInputRef: any = useRef(null);

    const handleDivClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const [loading, setLoading] = useState<boolean>(false);
    const handleImageUpload = async (files: any) => {
        setLoading(true);
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
                onChange(imageUrl);
            } catch (error) {
                toast({
                    title: "Image upload failed!",
                    description: "Please try again later.",
                });
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="mb-4 flex flex-col items-start gap-x-4 gap-y-2">
            {loading && (
                <div className="w-full h-full flex justify-start items-center">
                    <IconLoader className="animate-spin" size={17} />
                    <p className="text-sm text-slate-950 dark:text-gray-400 ml-[2px]">
                        Uploading <span className="animate-pulse  ">.</span>
                        <span className="animate-ping ">.</span>
                        <span className="animate-ping ">.</span>
                    </p>
                </div>
            )}

            <div className="relative grid gap-2">
                {value?.length > 0 ? (
                    <div
                        className=" rounded-md overflow-hidden"
                        style={{ aspectRatio: "1/1" }}
                    >
                        <BlurImage alt="thumbnail" src={value[0]} />

                        <Button
                            type="button"
                            // onClick={() => onRemove(value[0])}
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                        >
                            <Trash className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-2">
                        <div
                            className="rounded-md w-full h-full overflow-hidden"
                            style={{ aspectRatio: "1/1" }}
                        >
                            <BlurImage alt="thumbnail" src="/placeholder.png" />
                        </div>
                        <div className="h-36 grid grid-cols-3 gap-2">
                            <div
                                className="rounded-md  overflow-hidden"
                                style={{ aspectRatio: "1/1" }}
                            >
                                <BlurImage
                                    alt="thumbnail"
                                    src="/placeholder.png"
                                />
                            </div>
                            <div
                                className="rounded-md  overflow-hidden"
                                style={{ aspectRatio: "1/1" }}
                            >
                                <BlurImage
                                    alt="thumbnail"
                                    src="/placeholder.png"
                                />
                            </div>
                            <div
                                className="flex  items-center justify-center rounded-md border border-dashed cursor-pointer"
                                onClick={handleDivClick}
                                style={{ aspectRatio: "1/1" }}
                            >
                                <PiUploadDuotone className="h-4 w-4 text-muted-foreground" />
                                <span className="sr-only">Upload</span>
                                <Input
                                    id="picture"
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={(e) =>
                                        handleImageUpload(e.target.files)
                                    }
                                    disabled={loading}
                                    multiple
                                    className="hidden" // Hide the actual file input
                                />
                            </div>
                        </div>
                    </div>
                )}

                {value?.length > 0 && (
                    <div className="h-36  grid grid-cols-3 gap-2">
                        {value.slice(1)?.map((url) => (
                            <div key={url} className="relative">
                                <div
                                    className="rounded-md overflow-hidden"
                                    style={{ aspectRatio: "1/1" }}
                                >
                                    <BlurImage alt="thumbnail" src={url} />
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            onRemove(url);
                                        }}
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-1 right-1 h-7 w-7"
                                    >
                                        <Trash size={16} />
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <div
                            className="flex aspect-square items-center justify-center rounded-md border border-dashed cursor-pointer"
                            onClick={handleDivClick}
                        >
                            <PiUploadDuotone className="h-4 w-4 text-muted-foreground" />
                            <span className="sr-only">Upload</span>
                            <Input
                                id="picture"
                                type="file"
                                ref={fileInputRef}
                                onChange={(e) =>
                                    handleImageUpload(e.target.files)
                                }
                                disabled={loading}
                                multiple
                                className="hidden" // Hide the actual file input
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImagesUpload;
