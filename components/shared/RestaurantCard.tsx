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
}: RestaurantCardProps) => {
  tags.map(tag => console.log(tag))

  return (
    <article className={`${className} flex w-96 flex-col gap-2`}>
      <header className="relative h-60">
        {certified && (
          <div className="absolute left-2 z-10 flex h-16 w-14 items-center justify-center rounded-b-lg bg-scarlet">
            <Image
              width={40}
              height={45}
              src="/certified-restaurant-icon.svg"
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
          <div className="rounded-[4px] bg-white-rock px-2 py-0.5 text-lg text-black">
            Jusqu'à <span className="text-scarlet">-{promotion}%</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default RestaurantCard
