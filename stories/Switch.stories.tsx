import { ComponentStory, ComponentMeta } from '@storybook/react'

import Switch from '@/components/shared/Switch'

export default {
  title: 'Shared/Switch',
  component: Switch,
  args: {
    disabled: false,
  },
} as ComponentMeta<typeof Switch>

const Template: ComponentStory<typeof Switch> = args => <Switch {...args} />

export const Base = Template.bind({})

Base.args = {
  on: true,
}
