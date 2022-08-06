import Tag from '@/components/shared/Tag'
import Image from 'next/image'

type RestaurantCardProps = {
  className?: string
  thumbnail: string
  isCertified?: boolean
  tags?: {
    name: 'michelin' | 'etoile-verte' | 'gault-et-millau' | 'bib-gourmand'
    level?: number
  }[]
  name: string
  typesOfCooking: string[]
  location: string
  promotion?: number
  size?: 'sm' | 'md' | 'lg'
}

const RestaurantCard = ({
  className = '',
  thumbnail,
  isCertified,
  tags,
  name,
  typesOfCooking,
  location,
  promotion,
  size = 'md',
}: RestaurantCardProps) => {
  return (
    <article
      className={`${className} ${
        size === 'sm' || size === 'md' ? 'min-w-0' : 'lg:min-w-[384px]'
      } flex w-full flex-col gap-2`}
    >
      <header
        className={`relative overflow-hidden rounded-lg ${
          size === 'sm' ? 'h-44' : size === 'md' ? 'h-60' : 'h-72'
        }`}
      >
        {isCertified && (
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

        <div
          className={`${
            size === 'sm' ? 'flex-col items-start' : 'citems-end flex-row'
          } flex flex-wrap justify-between gap-2`}
        >
          <div>
            <h4 className="text-base text-gray">
              Cuisine{' '}
              {typesOfCooking
                .map(typeOfCooking => typeOfCooking.replace('Cuisine', ''))
                .join(', ')}
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
