import { ComponentStory, ComponentMeta } from '@storybook/react'

import TabBar from '@/components/shared/TabBar'

export default {
  title: 'Shared/TabBar',
  component: TabBar,
} as ComponentMeta<typeof TabBar>

const Template: ComponentStory<typeof TabBar> = args => <TabBar {...args} />

export const Base = Template
