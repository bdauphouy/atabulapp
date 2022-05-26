import { ComponentStory, ComponentMeta } from '@storybook/react'

import Spin from '@/components/shared/Spin'

export default {
  title: 'Shared/Spin',
  component: Spin,
  args: {
    size: 30,
  },
} as ComponentMeta<typeof Spin>

const Template: ComponentStory<typeof Spin> = args => <Spin {...args} />

export const Base = Template
