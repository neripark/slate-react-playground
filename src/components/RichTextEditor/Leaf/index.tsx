import { RenderLeafProps } from "slate-react";
// import { CustomText } from "../../../types/slate";

/**  */
export const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  // const customLeaf = leaf as CustomText;
  const customLeaf = leaf;

  if (customLeaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (customLeaf.italic) {
    children = <em>{children}</em>;
  }

  return <span {...attributes}>{children}</span>;
};
