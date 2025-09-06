import { Editor } from "slate";
import { CustomText } from "../../../types/slate";

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
};
