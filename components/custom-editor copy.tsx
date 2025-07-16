// components/Texts.tsx
import { FC } from "react";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";

interface TextsProps {
  editor: any[];
}

const Texts: FC<TextsProps> = ({ editor }) => {
  const { resolvedTheme } = useTheme();

  const editors = useCreateBlockNote({
    initialContent: editor,
  });


  return (
    <BlockNoteView
      editable={false}
      editor={editors}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
};

export default Texts;
