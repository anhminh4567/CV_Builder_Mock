import { BaseListSection } from "@/types/cv/BaseListSection";
import { BaseSection } from "@/types/cv/BaseSection";
import React from "react";
import _textEditor from "./_textEditor";

export default function _listEditor<T>({
  content,
  renderItemEditor,
  onAddItem,
}: {
  content: T[];
  onchange?: (value: string[]) => void;
  renderItemEditor: (item: T, index: string) => React.ReactNode;
  onAddItem?: () => void;
}) {
  return (
    <ol>
      {content.map((item, index) => (
        <li>{renderItemEditor(item, index.toString())}</li>
      ))}
      <button
        onClick={() => {
          if (onAddItem) onAddItem();
        }}
      >
        Add Item
      </button>
    </ol>
  );
}
