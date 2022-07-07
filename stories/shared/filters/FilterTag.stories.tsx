import { ComponentStory, ComponentMeta } from '@storybook/react'

import FilterTag from '@/components/shared/FilterTag'

export default {
  title: 'Shared/Filters/FilterTag',
  component: FilterTag,
  args: {
    children: 'Filtres',
  },
  parameters: {
    controls: {
      exclude: ['className', 'onChange'],
    },
  },
} as ComponentMeta<typeof FilterTag>

const Template: ComponentStory<typeof FilterTag> = args => (
  <FilterTag {...args} />
)

export const Base = Template.bind({})

Base.args = {
  open: false,
}

export const Open = Template.bind({})

Open.args = {
  open: true,
}
