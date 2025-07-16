import { uploadImageToCloudinary } from "@/helpers/imageUploader";
import { PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";

export type EditorProps = {
  onChange: (content: string) => void;
  editable: boolean;
  initialContent?: string;
};

export const TextEditor = ({
  onChange,
  editable,
  initialContent,
}: EditorProps) => {
  const { resolvedTheme } = useTheme();

  const editors: any = useCreateBlockNote({
    uploadFile: async (file: File) => {
      // const formData = new FormData();
      // formData.append("file", file);
      // const response = await axios.post<any>(
      //   `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      //   formData
      // );
      const imageUrl = await uploadImageToCloudinary(file);
      return imageUrl;
    },
    initialContent: initialContent
      ? (initialContent as unknown as PartialBlock[])
      : undefined,
  });

  return (
    <BlockNoteView
      editable={editable}
      editor={editors}
      // onChange={() => onChange(JSON.stringify(editors.document, null, 2))}
      onChange={() => onChange(editors.document)}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
};
