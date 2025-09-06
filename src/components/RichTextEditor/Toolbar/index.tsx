import styles from "./index.module.css";

type Props = {
  isBoldActive: boolean;
  toggleBold: () => void;
  isItalicActive: boolean;
  toggleItalic: () => void;
};

export const Toolbar: React.FC<Props> = ({
  isBoldActive,
  toggleBold,
  isItalicActive,
  toggleItalic,
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
      <button
        type="button"
        className={`${styles.toolbarButton} ${isBoldActive ? styles.active : ""}`}
        onMouseDown={onBoldMouseDown}
        aria-label="Bold"
      >
        <strong>B</strong>
      </button>
      <button
        type="button"
        className={`${styles.toolbarButton} ${isItalicActive ? styles.active : ""}`}
        onMouseDown={onItalicMouseDown}
        aria-label="Italic"
      >
        <em>I</em>
      </button>
    </div>
  );
};
