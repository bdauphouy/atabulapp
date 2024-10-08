import { ComponentStory, ComponentMeta } from '@storybook/react'

import Button from '@/components/shared/Button'

export default {
  title: 'Shared/Button',
  component: Button,
  args: {
    children: 'Button',
    disabled: false,
    loading: false,
  },
  parameters: {
    controls: {
      exclude: ['className', 'onClick'],
    },
  },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = args => <Button {...args} />

export const Primary = Template.bind({})

Primary.args = {
  variant: 'primary',
  name: 'primary',
}

export const Secondary = Template.bind({})

Secondary.args = {
  variant: 'secondary',
  name: 'secondary',
}

export const Tertiary = Template.bind({})

Secondary.args = {
  variant: 'tertiary',
  name: 'tertiary',
}
