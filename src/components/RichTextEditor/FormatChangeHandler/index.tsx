import { useEffect } from "react";
import { Descendant } from "slate";
import { useEditorFormat } from "../EditorFormatContext";

type Props = {
  children: React.ReactNode;
  value: Descendant[];
};

export const FormatChangeHandler: React.FC<Props> = ({ children, value }) => {
  const { updateFormatStates } = useEditorFormat();

  useEffect(() => {
    updateFormatStates();
  }, [value, updateFormatStates]);

  return <>{children}</>;
};