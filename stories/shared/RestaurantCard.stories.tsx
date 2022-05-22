import { ComponentStory, ComponentMeta } from '@storybook/react'

import RestaurantCard from '@/components/shared/RestaurantCard'

export default {
  title: 'Shared/RestaurantCard',
  component: RestaurantCard,
  args: {
    thumbnail: '/restaurant-card-thumbnail.png',
    certified: true,
    tags: [{ name: 'michelin', level: 2 }, { name: 'etoile-verte' }],
    name: 'Le Meurice Alain Ducasse',
    typesOfCooking: ['créative', 'traditionnelle'],
    location: 'PARIS (75001)',
    promotion: 50,
  },
  parameters: {
    controls: {
      exclude: ['className'],
    },
  },
} as ComponentMeta<typeof RestaurantCard>

const Template: ComponentStory<typeof RestaurantCard> = args => (
  <RestaurantCard {...args} />
)

export const Base = Template
