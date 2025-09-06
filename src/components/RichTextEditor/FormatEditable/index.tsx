import { useCallback } from "react";
import { Editable } from "slate-react";
import { useEditorFormat } from "../EditorFormatContext";
import { Leaf } from "../Leaf";
import styles from "../index.module.css";

type Props = React.ComponentProps<typeof Editable> & {
  onKeyDown?: (event: React.KeyboardEvent) => void;
};

export const FormatEditable: React.FC<Props> = ({ onKeyDown, ...props }) => {
  const { settings, toggleFormat, updateFormatStates } = useEditorFormat();

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        const enabledShortcuts = Object.entries(settings)
          .filter(([, config]) => config.enabled && config.shortcut)
          .map(([format, config]) => ({ format, shortcut: config.shortcut! }));

        const matchedShortcut = enabledShortcuts.find(
          ({ shortcut }) => shortcut === event.key,
        );

        if (matchedShortcut) {
          event.preventDefault();
          toggleFormat(matchedShortcut.format as any);
          updateFormatStates();
          return;
        }
      }

      onKeyDown?.(event);
    },
    [settings, toggleFormat, updateFormatStates, onKeyDown],
  );

  return (
    <Editable
      {...props}
      className={styles.editable}
      renderLeaf={Leaf}
      placeholder="テキストを入力してください..."
      onKeyDown={handleKeyDown}
    />
  );
};