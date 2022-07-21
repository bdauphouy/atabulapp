import FiltersDropdown from '@/components/shared/FiltersDropdown'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Shared/Filters/FiltersDropdown',
  component: FiltersDropdown,
  args: {
    children: 'Filtres',
  },
  parameters: {
    controls: {
      exclude: ['className', 'onChange'],
    },
  },
} as ComponentMeta<typeof FiltersDropdown>

const Template: ComponentStory<typeof FiltersDropdown> = args => (
  <FiltersDropdown {...args} />
)

export const Base = Template.bind({})

Base.args = {
  open: false,
}

export const Open = Template.bind({})

Open.args = {
  open: true,
}
