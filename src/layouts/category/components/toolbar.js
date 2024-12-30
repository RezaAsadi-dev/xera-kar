import { Toggle } from "./toggle";
import './styles.scss'
import { Bold, Strikethrough, Italic, Heading3,Heading2, Heading1,  Underline } from "lucide-react";
import { MdFormatListBulleted } from "react-icons/md";
import { AiOutlineOrderedList } from "react-icons/ai";

const ToolBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="mb-1 flex gap-x-1 rounded-md border border-input bg-transparent p-1">
        <div className="ml-4">
      <Toggle
        size={"sm"}
        pressed={editor.isActive("heading",{ level: 1 })}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 size={16} />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("heading",{ level:2 })}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 size={16} />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("heading",{ level: 3 })}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 size={16} />
      </Toggle></div>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={16} />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={16} />
      </Toggle>

      <Toggle
        size={"sm"}
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough size={16} />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("underline")}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline size={16} />
      </Toggle>
      <div className="mx-4">
        <Toggle
          size={"sm"}
          pressed={editor.isActive("orderedList")}
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <AiOutlineOrderedList size={16} />
        </Toggle>
        <Toggle
          size={"sm"}
          pressed={editor.isActive("bulletList")}
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        >
          <MdFormatListBulleted size={16} />
        </Toggle>
      </div>
    </div>
  );
};

export default ToolBar;
