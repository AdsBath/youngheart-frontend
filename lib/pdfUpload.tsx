import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { uploadPdfToCloudinary } from "@/helpers/pdfUploader";
import { IconLoader } from "@tabler/icons-react";
import { Trash } from "lucide-react";
import { useRef, useState } from "react";
import { PiUploadDuotone } from "react-icons/pi";

interface PdfUploadProps {
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string;
}

const PdfUpload: React.FC<PdfUploadProps> = ({ onChange, onRemove, value }) => {
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
        const imageUrl = await uploadPdfToCloudinary(files[0]);
        onChange(imageUrl);
      } catch (error) {
        toast({
          title: "Pdf upload failed!",
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
        </div>
      )}
      {!value && (
        <div
          className="flex w-[150px] h-[150px] items-center justify-center rounded border border-dashed cursor-pointer"
          onClick={handleDivClick}
        >
          <PiUploadDuotone size={50} className="text-muted-foreground" />
          <span className="sr-only">Upload</span>
          <Input
            id="pdf"
            type="file"
            accept=".pdf"
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

export default PdfUpload;
