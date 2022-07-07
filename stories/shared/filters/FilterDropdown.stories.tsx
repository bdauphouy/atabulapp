import { ComponentStory, ComponentMeta } from '@storybook/react'

import FilterDropdown from '@/components/shared/FilterDropdown'

export default {
  title: 'Shared/Filters/FilterDropdown',
  component: FilterDropdown,
  args: {
    children: 'Filtres',
  },
  parameters: {
    controls: {
      exclude: ['className', 'onChange'],
    },
  },
} as ComponentMeta<typeof FilterDropdown>

const Template: ComponentStory<typeof FilterDropdown> = args => (
  <FilterDropdown {...args} />
)

export const Base = Template.bind({})

Base.args = {
  open: false,
}

export const Open = Template.bind({})

Open.args = {
  open: true,
}
