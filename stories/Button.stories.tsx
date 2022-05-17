import { ComponentStory, ComponentMeta } from '@storybook/react'

import Button from '@/components/shared/Button'

export default {
  title: 'Shared/Button',
  component: Button,
  args: {
    children: 'Button',
    disabled: false,
  },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = args => <Button {...args} />

export const Primary = Template.bind({})

Primary.args = {
  action: 'primary',
}

export const Secondary = Template.bind({})

Secondary.args = {
  action: 'secondary',
}
