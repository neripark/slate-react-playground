import { Descendant } from "slate";

export const getInitialValue = (
  initialValue?: string | Descendant[],
): Descendant[] => {
  if (initialValue === undefined) {
    return [
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ];
  }

  // 既にDescendant[]形式の場合はそのまま使用
  if (Array.isArray(initialValue)) {
    return initialValue;
  }

  // 文字列の場合は改行文字で分割して複数のParagraphを作成
  const lines = initialValue.split("\n");

  return lines.map((line) => ({
    type: "paragraph",
    children: [{ text: line }],
  }));
};
