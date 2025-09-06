import styles from "./index.module.css";

type Props = {
  isBoldActive: boolean;
  toggleBold: () => void;
}

export const Toolbar: React.FC<Props> = ({ isBoldActive, toggleBold }) => {
  const onMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toggleBold();
  };

  return (
    <div className={styles.toolbar}>
      <button
        type="button"
        className={`${styles.toolbarButton} ${isBoldActive ? styles.active : ""}`}
        onMouseDown={onMouseDown}
        aria-label="Bold"
      >
        <strong>B</strong>
      </button>
    </div>
  );
};
