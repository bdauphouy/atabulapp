import { ComponentStory, ComponentMeta } from '@storybook/react'

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

const Template: ComponentStory<typeof Footer> = args => <Footer {...args} />

export const Base = Template
