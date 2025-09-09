import { Editor, Transforms, Element as SlateElement } from "slate";
import { CustomText, CustomElement } from "../../../types/slate";

/** エディタの操作を行う関数をまとめたオブジェクト。 */
export const CustomEditorUtils = {
  isBoldMarkActive(editor: Editor) {
    const marks = Editor.marks(editor) as CustomText | null;
    return marks ? marks.bold === true : false;
  },

  toggleBoldMark(editor: Editor) {
    const isActive = CustomEditorUtils.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "bold");
    } else {
      Editor.addMark(editor, "bold", true);
    }
  },

  isItalicMarkActive(editor: Editor) {
    const marks = Editor.marks(editor) as CustomText | null;
    return marks ? marks.italic === true : false;
  },

  toggleItalicMark(editor: Editor) {
    const isActive = CustomEditorUtils.isItalicMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "italic");
    } else {
      Editor.addMark(editor, "italic", true);
    }
  },

  isBulletListActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => SlateElement.isElement(n) && n.type === "bullet-list",
    });
    return !!match;
  },

  toggleBulletList(editor: Editor) {
    const isActive = CustomEditorUtils.isBulletListActive(editor);
    
    if (isActive) {
      // 箇条書きを解除（段落に変換）
      Transforms.unwrapNodes(editor, {
        match: (n) => SlateElement.isElement(n) && n.type === "bullet-list",
        split: true,
      });
      Transforms.setNodes(editor, { type: "paragraph" });
    } else {
      // 箇条書きに変換
      const isInListItem = Editor.above(editor, {
        match: (n) => SlateElement.isElement(n) && n.type === "list-item",
      });

      if (!isInListItem) {
        Transforms.setNodes(editor, { type: "list-item" });
        const bulletList: CustomElement = {
          type: "bullet-list",
          children: [],
        };
        Transforms.wrapNodes(editor, bulletList);
      }
    }
  },
};
