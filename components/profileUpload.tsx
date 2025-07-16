import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { uploadImageToCloudinary } from "@/helpers/imageUploader";
import { cn } from "@/lib/utils";
import { IconLoader } from "@tabler/icons-react";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { PiUploadDuotone } from "react-icons/pi";

interface ProfileUploadProps {
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string;
}

const ProfileUpload: React.FC<ProfileUploadProps> = ({
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

  const [loaded, setLoaded] = useState(false);

  const handleImageUpload = async (files: FileList | null) => {
    if (files && files[0]) {
      setLoading(true);
      try {
        const imageUrl = await uploadImageToCloudinary(files[0]);
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
    <div className="mb-4 flex flex-col items-start gap-4 overflow-hidden">
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
      {value && (
        <div className="relative w-[150px] h-[150px] rounded-full">
          <div className="z-10 absolute right-0 bottom-0">
            <Button
              type="button"
              onClick={() => {
                onRemove(value);
              }}
              variant="destructive"
              size="icon"
              disabled={loading}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
          <Image
            onLoad={() => setLoaded(true)}
            fill
            className={cn(
              "object-cover object-top absolute inset-0 h-full w-full rounded-full transition duration-200",
              loaded ? "blur-none" : "blur-md"
            )}
            alt="Image"
            src={value || "/placeholder.png"}
          />
        </div>
      )}
      {!value && (
        <div
          className="flex w-[150px] h-[150px] items-center justify-center rounded-full border border-dashed cursor-pointer"
          onClick={handleDivClick}
        >
          <PiUploadDuotone size={50} className="text-muted-foreground" />
          <span className="sr-only">Upload</span>
          <Input
            id="picture"
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleImageUpload(e.target.files)}
            disabled={loading}
            className="hidden" // Hide the actual file input
          />
        </div>
      )}
    </div>
  );
};

export default ProfileUpload;
