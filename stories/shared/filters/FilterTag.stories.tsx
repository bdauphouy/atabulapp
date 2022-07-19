import FilterTag from '@/components/shared/FilterTag'
import { ComponentMeta, ComponentStory } from '@storybook/react'

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
  isSelected: false,
}

export const Selected = Template.bind({})

Selected.args = {
  isSelected: true,
}
