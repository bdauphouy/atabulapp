import { ComponentMeta, ComponentStory } from '@storybook/react'

import Footer from '@/components/shared/Footer'

export default {
  title: 'Shared/Footer',
  component: Footer,
  parameters: {
    controls: {
      exclude: ['className', 'onChange'],
    },
  },
} as ComponentMeta<typeof Footer>

const Template: ComponentStory<typeof Footer> = () => <Footer />

export const Base = Template
