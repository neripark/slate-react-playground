import type { Meta, StoryObj } from "@storybook/react";
import { RichTextEditor } from "./index";

const meta = {
  title: "Components/RichTextEditor",
  component: RichTextEditor,
  argTypes: {
    initialValue: {
      control: "text",
      description: "エディタの初期値",
    },
    onChange: {
      action: "changed",
      description: "コンテンツが変更された時のコールバック",
    },
    onSubmit: {
      action: "submitted",
      description: "送信ボタンが押された時のコールバック",
    },
    submitButtonText: {
      control: "text",
      description: "送信ボタンのテキスト",
    },
  },
  args: {
    onSubmit: (value) => {
      console.log("送信されたコンテンツ:", value);
      alert("送信されました！コンソールを確認してください。");
    },
  },
} satisfies Meta<typeof RichTextEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInitialValue: Story = {
  args: {
    initialValue: "ここに初期テキストが表示されます",
  },
};

export const WithLongText: Story = {
  args: {
    initialValue:
      "これは長いテキストの例です。Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
};

export const WithMultipleLines: Story = {
  args: {
    initialValue:
      "これは複数行のテキストの例です。\nこれは複数行のテキストの例です。\n\n\nこれは複数行のテキストの例です。",
  },
};

export const WithRichTextInitialValue: Story = {
  args: {
    initialValue: [
      {
        type: "paragraph",
        children: [
          { text: "これは" },
          { text: "太字", bold: true },
          { text: "の装飾がついたテキストです。" },
        ],
      },
      {
        type: "paragraph",
        children: [
          { text: "複数の段落があり、" },
          { text: "一部が太字", bold: true },
          { text: "になっています。" },
        ],
      },
    ],
  },
};

export const ComplexRichText: Story = {
  args: {
    initialValue: [
      {
        type: "paragraph",
        children: [
          { text: "タイトル部分", bold: true },
        ],
      },
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
      {
        type: "paragraph",
        children: [
          { text: "本文では" },
          { text: "重要な部分", bold: true },
          { text: "だけが太字になっており、通常のテキストと" },
          { text: "強調されたテキスト", bold: true },
          { text: "が混在しています。" },
        ],
      },
    ],
  },
};
