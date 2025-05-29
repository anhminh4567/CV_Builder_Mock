import React from "react";

export interface TextEditorProps
  extends React.HTMLAttributes<HTMLInputElement> {
  content: string;
  onchange: (value: string) => void;
}
export default function _textEditor({
  content,
  onchange,
  ...remainProps
}: TextEditorProps) {
  return (
    <input
      type="text"
      {...remainProps}
      value={content}
      className="w-full m-2 p-2"
      onChange={(e) => onchange(e.target.value)}
    />
  );
}
