import Image from 'next/image'
import Tag from '@/components/shared/Tag'

type RestaurantCardProps = {
  className?: string
  thumbnail: string
  certified?: boolean
  tags?: {
    name: 'michelin' | 'etoile-verte' | 'gault-et-millau' | 'bib-gourmand'
    level?: number
  }[]
  name: string
  typesOfCooking: string[]
  location: string
  promotion?: number
  size?: 'small' | 'large'
}

const RestaurantCard = ({
  className,
  thumbnail,
  certified,
  tags,
  name,
  typesOfCooking,
  location,
  promotion,
  size = 'small',
}: RestaurantCardProps) => {
  return (
    <article
      className={`${className} ${
        size === 'small' ? 'min-w-[384px]' : 'lg:min-w-[384px]'
      } flex w-full flex-col gap-2 overflow-hidden rounded-lg`}
    >
      <header className={`relative ${size === 'small' ? 'h-60' : 'h-72'}`}>
        {certified && (
          <div className="absolute left-2 z-10 flex h-16 w-14 items-center justify-center rounded-b-lg bg-scarlet">
            <Image
              width={40}
              height={45}
              src="/images/logo.svg"
              alt={`Badge de certification du restaurant ${name}`}
            />
          </div>
        )}
        <Image
          layout="fill"
          objectFit="cover"
          src={thumbnail}
          alt={`Image du restaurant ${name}`}
        />
      </header>
      {tags && (
        <div className="flex gap-2">
          {tags.map((tag, i) => (
            <Tag key={i} type={tag.name} number={tag.level ?? 1} />
          ))}
        </div>
      )}
      <div>
        <h3 className="text-lg font-medium text-black">{name}</h3>

        <div className="flex items-end justify-between">
          <div>
            <h4 className="text-base text-gray">
              Cuisine {typesOfCooking.join(', ')}
            </h4>
            <h4 className="text=base text-gray">{location}</h4>
          </div>
          {promotion && (
            <div className="rounded-[4px] bg-white-rock px-2 py-0.5 text-lg text-black">
              Jusqu'à <span className="text-scarlet">-{promotion}%</span>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default RestaurantCard
