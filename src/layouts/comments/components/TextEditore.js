import ToolBar from "./toolbar";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import { useEditor, EditorContent } from "@tiptap/react";


const TextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Heading.configure({
        levels: [1,2,3],
        HTMLAttributes: {
          class: "text-xl font-bold",
        },
      }),
      Underline.configure(),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "rounded-md border max-h-[380px] h-[380px] overflow-auto border-input bg-background focus:border focus:border-muted-foreground outline-none duration-100 ease-in p-4 text-sm",
      },
    },
    onUpdate({ editor }) {
      onChange(prev => ({...prev , description: editor.getHTML()}));
    },
  });

  return (
    <div className="flex min-h-[150px] h-full flex-col justify-stretch">
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;