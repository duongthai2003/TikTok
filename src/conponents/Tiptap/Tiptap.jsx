import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

const Tiptap = ({
  content = "<p></p>",
  onChange,
  isSetDefaultContent = false,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Placeholder.configure({
        placeholder: "Thêm bình luận...",
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: " ",
      },
    },

    onUpdate: ({ editor }) => {
      if (editor.getText().startsWith(" ")) {
        // nếu bắt đầu bằng dấu cahcs thì set nội dung vè ban đầu
        editor.commands.setContent("");
      } else {
        onChange(editor.getHTML());
        // console.log(editor.getHTML());
      }
    },
  });
  useEffect(() => {
    editor.commands.setContent("");
  }, [isSetDefaultContent]);

  return (
    <div>
      <EditorContent spellCheck={false} editor={editor} />
    </div>
  );
};

export default Tiptap;
