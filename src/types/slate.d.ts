import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type ParagraphElement = {
  type: "paragraph";
  children: CustomText[];
};

export type BulletListElement = {
  type: "bullet-list";
  children: ListItemElement[];
};

export type ListItemElement = {
  type: "list-item";
  children: CustomText[];
};

export type CustomElement = ParagraphElement | BulletListElement | ListItemElement;

export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
};

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
