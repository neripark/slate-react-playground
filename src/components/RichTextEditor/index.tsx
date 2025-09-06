import { useState, useCallback, useMemo } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";
import styles from "./index.module.css";
import { Toolbar } from "./Toolbar";
import { FormatEditable } from "./FormatEditable";
import { FormatChangeHandler } from "./FormatChangeHandler";
import { SubmitButton } from "./SubmitButton";
import { getInitialValue } from "./getInitialValue";
import { EditorFormatProvider, FormatType } from "./EditorFormatContext";

type Props = {
  initialValue?: string | Descendant[];
  onChange?: (value: Descendant[]) => void;
  onSubmit?: (value: Descendant[]) => void;
  submitButtonText?: string;
  enabledFormats?: FormatType[];
};

export const RichTextEditor: React.FC<Props> = ({
  initialValue,
  onChange,
  onSubmit,
  submitButtonText = "送信",
  enabledFormats,
}) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState<Descendant[]>(
    getInitialValue(initialValue),
  );

  const handleChange = useCallback(
    (newValue: Descendant[]) => {
      setValue(newValue);
      onChange?.(newValue);
    },
    [onChange],
  );

  return (
    <div className={styles.richTextEditor}>
      <EditorFormatProvider editor={editor} enabledFormats={enabledFormats}>
        <FormatChangeHandler value={value}>
          <Toolbar />
          <Slate editor={editor} initialValue={value} onChange={handleChange}>
            <FormatEditable />
          </Slate>
          <SubmitButton
            onSubmit={onSubmit}
            submitButtonText={submitButtonText}
            value={value}
          />
        </FormatChangeHandler>
      </EditorFormatProvider>
    </div>
  );
};
