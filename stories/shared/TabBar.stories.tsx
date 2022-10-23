import TabBar from '@/components/mobile/TabBar'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Shared/TabBar',
  component: TabBar,
} as ComponentMeta<typeof TabBar>

const Template: ComponentStory<typeof TabBar> = () => <TabBar />

export const Base = Template
