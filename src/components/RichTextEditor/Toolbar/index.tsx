import { useSlate } from "slate-react";
import { CustomEditorUtils } from "../CustomEditorUtils";
import styles from "./index.module.css";

type Props = {
  enabledFormats: {
    bold?: boolean;
    italic?: boolean;
    bulletList?: boolean;
  };
};

export const Toolbar: React.FC<Props> = ({
  enabledFormats,
}) => {
  const editor = useSlate();

  const isBoldActive = CustomEditorUtils.isBoldMarkActive(editor);
  const isItalicActive = CustomEditorUtils.isItalicMarkActive(editor);
  const isBulletListActive = CustomEditorUtils.isBulletListActive(editor);

  const onBoldMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    CustomEditorUtils.toggleBoldMark(editor);
  };

  const onItalicMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    CustomEditorUtils.toggleItalicMark(editor);
  };

  const onBulletListMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    CustomEditorUtils.toggleBulletList(editor);
  };

  return (
    <div className={styles.toolbar}>
      {enabledFormats.bold && (
        <button
          type="button"
          className={`${styles.toolbarButton} ${isBoldActive ? styles.active : ""}`}
          onMouseDown={onBoldMouseDown}
          aria-label="Bold"
        >
          <strong>B</strong>
        </button>
      )}
      {enabledFormats.italic && (
        <button
          type="button"
          className={`${styles.toolbarButton} ${isItalicActive ? styles.active : ""}`}
          onMouseDown={onItalicMouseDown}
          aria-label="Italic"
        >
          <em>I</em>
        </button>
      )}
      {enabledFormats.bulletList && (
        <button
          type="button"
          className={`${styles.toolbarButton} ${isBulletListActive ? styles.active : ""}`}
          onMouseDown={onBulletListMouseDown}
          aria-label="Bullet List"
        >
          •
        </button>
      )}
    </div>
  );
};
