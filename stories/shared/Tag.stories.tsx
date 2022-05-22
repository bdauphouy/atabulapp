import { ComponentStory, ComponentMeta } from '@storybook/react'
import bibGourmant from '@/public/tag-icons/bib-gourmant.png'

import Tag from '@/components/shared/Tag'

export default {
  title: 'Shared/Tag',
  component: Tag,
  args: {
    number: 3,
  },
  parameters: {
    controls: {
      exclude: ['className'],
    },
  },
} as ComponentMeta<typeof Tag>

const Template: ComponentStory<typeof Tag> = args => <Tag {...args} />

export const Michelin = Template.bind({})

Michelin.args = {
  type: 'michelin',
}

export const EtoileVerte = Template.bind({})

EtoileVerte.args = {
  type: 'etoile-verte',
}

export const GaultEtMillau = Template.bind({})

GaultEtMillau.args = {
  type: 'gault-et-millau',
}

export const BibGourmand = Template.bind({})

BibGourmand.args = {
  type: 'bib-gourmand',
}
