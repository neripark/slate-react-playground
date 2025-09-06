import styles from "./index.module.css";

type Props = {
  isBoldActive: boolean;
  toggleBold: () => void;
  isItalicActive: boolean;
  toggleItalic: () => void;
  enabledFormats: {
    bold?: boolean;
    italic?: boolean;
  };
};

export const Toolbar: React.FC<Props> = ({
  isBoldActive,
  toggleBold,
  isItalicActive,
  toggleItalic,
  enabledFormats,
}) => {
  const onBoldMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toggleBold();
  };

  const onItalicMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toggleItalic();
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
    </div>
  );
};
