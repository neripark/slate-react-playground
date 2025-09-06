import { useState, useCallback, useMemo } from "react";
import { createEditor, Descendant, Editor } from "slate";
import { Slate, Editable, withReact, RenderLeafProps } from "slate-react";
import { withHistory } from "slate-history";
import styles from "./index.module.css";
import { CustomText } from "../../types/slate";

interface Props {
  initialValue?: string;
  onChange?: (value: Descendant[]) => void;
}

const CustomEditorUtils = {
  isBoldMarkActive(editor: Editor) {
    const marks = Editor.marks(editor) as CustomText | null;
    return marks ? marks.bold === true : false;
  },

  toggleBoldMark(editor: Editor) {
    const isActive = CustomEditorUtils.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "bold");
    } else {
      Editor.addMark(editor, "bold", true);
    }
  },
};

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  const customLeaf = leaf as CustomText;
  if (customLeaf.bold) {
    children = <strong>{children}</strong>;
  }

  return <span {...attributes}>{children}</span>;
};

export const RichTextEditor: React.FC<Props> = ({ initialValue, onChange }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const [value, setValue] = useState<Descendant[]>(() => {
    if (initialValue) {
      return [
        {
          type: "paragraph",
          children: [{ text: initialValue }],
        },
      ];
    }
    return [
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ];
  });

  // ボタンの状態を管理するstate
  const [isBoldActive, setIsBoldActive] = useState(false);

  const handleChange = useCallback(
    (newValue: Descendant[]) => {
      setValue(newValue);
      onChange?.(newValue);
      // エディタの状態が変わったときにボタンの状態を更新
      setIsBoldActive(CustomEditorUtils.isBoldMarkActive(editor));
    },
    [onChange, editor],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!event.ctrlKey && !event.metaKey) {
        return;
      }

      switch (event.key) {
        case "b": {
          event.preventDefault();
          CustomEditorUtils.toggleBoldMark(editor);
          break;
        }
      }
    },
    [editor],
  );

  const toggleBold = useCallback(() => {
    CustomEditorUtils.toggleBoldMark(editor);
    // ボタンクリック後に状態を即座に更新
    setIsBoldActive(CustomEditorUtils.isBoldMarkActive(editor));
  }, [editor]);

  return (
    <div className={styles.richTextEditor}>
      <div className={styles.toolbar}>
        <button
          type="button"
          className={`${styles.toolbarButton} ${isBoldActive ? styles.active : ""}`}
          onMouseDown={(event) => {
            event.preventDefault();
            toggleBold();
          }}
          aria-label="Bold"
        >
          <strong>B</strong>
        </button>
      </div>
      <Slate editor={editor} initialValue={value} onChange={handleChange}>
        <Editable
          className={styles.editable}
          renderLeaf={Leaf}
          onKeyDown={handleKeyDown}
          placeholder="テキストを入力してください..."
        />
      </Slate>
    </div>
  );
};
