import { Descendant } from "slate";
import styles from "./index.module.css";

type Props = {
  onSubmit?: (value: Descendant[]) => void;
  submitButtonText?: string;
  value: Descendant[];
};

export const SubmitButton: React.FC<Props> = ({
  onSubmit,
  submitButtonText = "送信",
  value,
}) => {
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(value);
    }
  };

  return (
    <div className={styles.submitContainer}>
      <button
        type="button"
        className={styles.submitButton}
        onClick={handleSubmit}
      >
        {submitButtonText}
      </button>
    </div>
  );
};
