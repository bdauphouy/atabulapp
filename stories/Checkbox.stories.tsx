import { ComponentStory, ComponentMeta } from '@storybook/react'

import Checkbox from '@/components/shared/Checkbox'

export default {
  title: 'Shared/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>

const Template: ComponentStory<typeof Checkbox> = args => <Checkbox {...args} />

export const Base = Template.bind({})

Base.args = {
  checked: true,
}
