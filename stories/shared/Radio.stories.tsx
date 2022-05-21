import { ComponentStory, ComponentMeta } from '@storybook/react'

import Radio from '@/components/shared/Radio'

export default {
  title: 'Shared/Radio',
  component: Radio,
  parameters: {
    controls: {
      exclude: ['className', 'onChange'],
    },
  },
} as ComponentMeta<typeof Radio>

const Template: ComponentStory<typeof Radio> = args => <Radio {...args} />

export const Base = Template.bind({})

Base.args = {
  checked: true,
  name: 'radio',
}
