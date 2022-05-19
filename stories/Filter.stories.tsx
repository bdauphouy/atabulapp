import { ComponentStory, ComponentMeta } from '@storybook/react'

import Filter from '@/components/shared/Filter'

export default {
  title: 'Shared/Filter',
  component: Filter,
  args: {
    children: 'Filtres',
  },
} as ComponentMeta<typeof Filter>

const Template: ComponentStory<typeof Filter> = args => <Filter {...args} />

export const Base = Template.bind({})

Base.args = {
  open: false,
}

export const Open = Template.bind({})

Open.args = {
  open: true,
}
