import { useState, useCallback, useMemo } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact, RenderElementProps } from "slate-react";
import { withHistory } from "slate-history";
import styles from "./index.module.css";
import { Leaf } from "./Leaf";
import { CustomEditorUtils } from "./CustomEditorUtils";
import { Toolbar } from "./Toolbar";
import { SubmitButton } from "./SubmitButton";
import { getInitialValue } from "./getInitialValue";

type FormatSettings = {
  bold?: boolean;
  italic?: boolean;
  bulletList?: boolean;
};

type Props = {
  initialValue?: string | Descendant[];
  onChange?: (value: Descendant[]) => void;
  onSubmit?: (value: Descendant[]) => void;
  submitButtonText?: string;
  enabledFormats?: FormatSettings;
};

export const RichTextEditor: React.FC<Props> = ({
  initialValue,
  onChange,
  onSubmit,
  submitButtonText = "送信",
  enabledFormats = { bold: false, italic: false, bulletList: false },
}) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState<Descendant[]>(
    getInitialValue(initialValue),
  );

  // ボタンの状態を管理するstate
  const [isBoldActive, setIsBoldActive] = useState(false);
  const [isItalicActive, setIsItalicActive] = useState(false);
  const [isBulletListActive, setIsBulletListActive] = useState(false);

  const handleChange = useCallback(
    (newValue: Descendant[]) => {
      setValue(newValue);
      onChange?.(newValue);
      // エディタの状態が変わったときにボタンの状態を更新
      setIsBoldActive(CustomEditorUtils.isBoldMarkActive(editor));
      setIsItalicActive(CustomEditorUtils.isItalicMarkActive(editor));
      setIsBulletListActive(CustomEditorUtils.isBulletListActive(editor));
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
          if (enabledFormats.bold) {
            event.preventDefault();
            CustomEditorUtils.toggleBoldMark(editor);
          }
          break;
        }
        case "i": {
          if (enabledFormats.italic) {
            event.preventDefault();
            CustomEditorUtils.toggleItalicMark(editor);
          }
          break;
        }
      }
    },
    [editor, enabledFormats],
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

  const toggleBulletList = useCallback(() => {
    CustomEditorUtils.toggleBulletList(editor);
    // ボタンクリック後に状態を即座に更新
    setIsBulletListActive(CustomEditorUtils.isBulletListActive(editor));
  }, [editor]);

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "bullet-list":
        return <ul {...props.attributes}>{props.children}</ul>;
      case "list-item":
        return <li {...props.attributes}>{props.children}</li>;
      default:
        return <p {...props.attributes}>{props.children}</p>;
    }
  }, []);

  return (
    <div className={styles.richTextEditor}>
      <Toolbar
        isBoldActive={isBoldActive}
        toggleBold={toggleBold}
        isItalicActive={isItalicActive}
        toggleItalic={toggleItalic}
        isBulletListActive={isBulletListActive}
        toggleBulletList={toggleBulletList}
        enabledFormats={enabledFormats}
      />
      <Slate editor={editor} initialValue={value} onChange={handleChange}>
        <Editable
          className={styles.editable}
          renderLeaf={Leaf}
          renderElement={renderElement}
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
