import type { Meta, StoryObj } from '@storybook/react'
import { RichTextEditor } from './RichTextEditor'

const meta = {
  title: 'Components/RichTextEditor',
  component: RichTextEditor,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    initialValue: {
      control: 'text',
      description: 'エディタの初期値',
    },
    onChange: {
      action: 'changed',
      description: 'コンテンツが変更された時のコールバック',
    },
  },
} satisfies Meta<typeof RichTextEditor>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithInitialValue: Story = {
  args: {
    initialValue: 'ここに初期テキストが表示されます',
  },
}

export const WithLongText: Story = {
  args: {
    initialValue: 'これは長いテキストの例です。Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
}