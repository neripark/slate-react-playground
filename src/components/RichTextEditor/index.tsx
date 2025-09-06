import { useState, useCallback, useMemo } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import styles from "./index.module.css";
import { Leaf } from "./Leaf";
import { CustomEditorUtils } from "./CustomEditorUtils";
import { Toolbar } from "./Toolbar";
import { SubmitButton } from "./SubmitButton";
import { getInitialValue } from "./getInitialValue";

type Props = {
  initialValue?: string | Descendant[];
  onChange?: (value: Descendant[]) => void;
  onSubmit?: (value: Descendant[]) => void;
  submitButtonText?: string;
};

export const RichTextEditor: React.FC<Props> = ({
  initialValue,
  onChange,
  onSubmit,
  submitButtonText = "送信",
}) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState<Descendant[]>(
    getInitialValue(initialValue),
  );

  // ボタンの状態を管理するstate
  const [isBoldActive, setIsBoldActive] = useState(false);
  const [isItalicActive, setIsItalicActive] = useState(false);

  const handleChange = useCallback(
    (newValue: Descendant[]) => {
      setValue(newValue);
      onChange?.(newValue);
      // エディタの状態が変わったときにボタンの状態を更新
      setIsBoldActive(CustomEditorUtils.isBoldMarkActive(editor));
      setIsItalicActive(CustomEditorUtils.isItalicMarkActive(editor));
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
        case "i": {
          event.preventDefault();
          CustomEditorUtils.toggleItalicMark(editor);
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

  const toggleItalic = useCallback(() => {
    CustomEditorUtils.toggleItalicMark(editor);
    // ボタンクリック後に状態を即座に更新
    setIsItalicActive(CustomEditorUtils.isItalicMarkActive(editor));
  }, [editor]);

  return (
    <div className={styles.richTextEditor}>
      <Toolbar
        isBoldActive={isBoldActive}
        toggleBold={toggleBold}
        isItalicActive={isItalicActive}
        toggleItalic={toggleItalic}
      />
      <Slate editor={editor} initialValue={value} onChange={handleChange}>
        <Editable
          className={styles.editable}
          renderLeaf={Leaf}
          onKeyDown={handleKeyDown}
          placeholder="テキストを入力してください..."
        />
      </Slate>
      <SubmitButton
        onSubmit={onSubmit}
        submitButtonText={submitButtonText}
        value={value}
      />
    </div>
  );
};
