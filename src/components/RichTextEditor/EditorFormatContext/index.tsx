import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Editor } from "slate";
import { CustomEditorUtils } from "../CustomEditorUtils";

export type FormatType = "bold" | "italic";

export type FormatConfig = {
  enabled: boolean;
  shortcut?: string;
  showInToolbar?: boolean;
};

export type FormatSettings = Record<FormatType, FormatConfig>;

export type EditorFormatContextType = {
  settings: FormatSettings;
  formatStates: Record<FormatType, boolean>;
  toggleFormat: (format: FormatType) => void;
  updateFormatStates: () => void;
  isFormatEnabled: (format: FormatType) => boolean;
};

const EditorFormatContext = createContext<EditorFormatContextType | null>(null);

const DEFAULT_FORMAT_SETTINGS: FormatSettings = {
  bold: { enabled: true, shortcut: "b", showInToolbar: true },
  italic: { enabled: true, shortcut: "i", showInToolbar: true },
};

type Props = {
  children: ReactNode;
  editor: Editor;
  enabledFormats?: FormatType[];
  formatSettings?: Partial<FormatSettings>;
};

export const EditorFormatProvider: React.FC<Props> = ({
  children,
  editor,
  enabledFormats = ["bold", "italic"],
  formatSettings = {},
}) => {
  const settings: FormatSettings = {
    ...DEFAULT_FORMAT_SETTINGS,
    ...formatSettings,
  };

  // enabledFormatsに基づいて設定を更新
  Object.keys(settings).forEach((format) => {
    const formatKey = format as FormatType;
    if (!enabledFormats.includes(formatKey)) {
      settings[formatKey] = { ...settings[formatKey], enabled: false };
    }
  });

  const [formatStates, setFormatStates] = useState<Record<FormatType, boolean>>({
    bold: false,
    italic: false,
  });

  const updateFormatStates = useCallback(() => {
    setFormatStates({
      bold: CustomEditorUtils.isBoldMarkActive(editor),
      italic: CustomEditorUtils.isItalicMarkActive(editor),
    });
  }, [editor]);

  const toggleFormat = useCallback(
    (format: FormatType) => {
      if (!settings[format].enabled) return;

      switch (format) {
        case "bold":
          CustomEditorUtils.toggleBoldMark(editor);
          break;
        case "italic":
          CustomEditorUtils.toggleItalicMark(editor);
          break;
      }

      updateFormatStates();
    },
    [editor, settings, updateFormatStates],
  );

  const isFormatEnabled = useCallback(
    (format: FormatType) => settings[format].enabled,
    [settings],
  );

  const contextValue: EditorFormatContextType = {
    settings,
    formatStates,
    toggleFormat,
    updateFormatStates,
    isFormatEnabled,
  };

  return (
    <EditorFormatContext.Provider value={contextValue}>
      {children}
    </EditorFormatContext.Provider>
  );
};

export const useEditorFormat = (): EditorFormatContextType => {
  const context = useContext(EditorFormatContext);
  if (!context) {
    throw new Error("useEditorFormat must be used within EditorFormatProvider");
  }
  return context;
};