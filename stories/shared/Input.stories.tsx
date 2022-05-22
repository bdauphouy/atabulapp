import { ComponentStory, ComponentMeta } from '@storybook/react'

import Input from '@/components/shared/Input'

export default {
  title: 'Shared/Input',
  component: Input,
  args: {
    placeholder: 'Input',
  },
  parameters: {
    controls: {
      exclude: ['className', 'onChange'],
    },
  },
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = args => <Input {...args} />

export const Base = Template

export const Autocomplete = Template.bind({})

Autocomplete.args = {
  options: ['Option 1', 'Option 2', 'Option 3'],
  name: 'input',
}
