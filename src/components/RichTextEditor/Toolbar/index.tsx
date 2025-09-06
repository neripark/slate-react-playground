import styles from "./index.module.css";
import { useEditorFormat, FormatType } from "../EditorFormatContext";

const FORMAT_LABELS: Record<FormatType, string> = {
  bold: "Bold",
  italic: "Italic",
};

const FORMAT_ICONS: Record<FormatType, React.ReactNode> = {
  bold: <strong>B</strong>,
  italic: <em>I</em>,
};

export const Toolbar: React.FC = () => {
  const { settings, formatStates, toggleFormat } = useEditorFormat();

  const enabledFormats = Object.entries(settings)
    .filter(([, config]) => config.enabled && config.showInToolbar)
    .map(([format]) => format as FormatType);

  const handleMouseDown = (format: FormatType) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toggleFormat(format);
  };

  return (
    <div className={styles.toolbar}>
      {enabledFormats.map((format) => (
        <button
          key={format}
          type="button"
          className={`${styles.toolbarButton} ${formatStates[format] ? styles.active : ""}`}
          onMouseDown={handleMouseDown(format)}
          aria-label={FORMAT_LABELS[format]}
        >
          {FORMAT_ICONS[format]}
        </button>
      ))}
    </div>
  );
};
