import Tag from '@/components/shared/Tag'
import api from '@/lib/api'
import Cookie from 'js-cookie'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { RiHeartFill, RiHeartLine } from 'react-icons/ri'

const Link = dynamic(import('next/link'), { ssr: false })

type RestaurantCardProps = {
  className?: string
  id: number
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
  isResult?: boolean
  isDefaultLiked?: boolean
}

const RestaurantCard = ({
  className = '',
  id,
  thumbnail,
  isCertified,
  tags,
  name,
  typesOfCooking,
  location,
  promotion,
  size = 'md',
  isResult = false,
  isDefaultLiked = false,
}: RestaurantCardProps) => {
  const [isLiked, setIsLiked] = useState(isDefaultLiked)

  const handleLike = async () => {
    const response = await api[isLiked ? 'removeFavorite' : 'addFavorite'](
      1,
      Cookie.get('token'),
    )

    const device = Cookie.get('deviceType')

    if (!response.success) {
      return toast(t => (
        <span className="">
          Vous devez être connecté pour ajouter un restaurant à vos favoris.{' '}
          <Link
            href={device === 'desktop' ? '/' : '/mobile/connexion'}
            className="text-scarlet"
            onClick={() => toast.dismiss(t.id)}
          >
            Se connecter
          </Link>
        </span>
      ))
    }

    setIsLiked(!isLiked)
  }

  return (
    <article
      className={`${className} ${
        size === 'sm' || size === 'md' ? 'min-w-0' : 'lg:min-w-[384px]'
      } ${isResult ? 'rounded-b-lg' : ''} flex w-full flex-col gap-2 bg-white`}
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
        <div
          className="absolute bottom-3 right-3 cursor-pointer text-white"
          onClick={handleLike}
        >
          {isLiked ? <RiHeartFill size={32} /> : <RiHeartLine size={32} />}
        </div>
      </header>
      {tags && (
        <div className={`flex gap-2 ${isResult ? 'px-2' : ''}`}>
          {tags.map((tag, i) => (
            <Tag key={i} type={tag.name} number={tag.level ?? 1} />
          ))}
        </div>
      )}
      <Link href={`/mobile/restaurants/${id}`}>
        <div className={isResult ? 'px-2 pb-2' : ''}>
          <h3 className="text-lg font-medium text-black">{name}</h3>
          <div
            className={`${
              size === 'sm'
                ? isResult
                  ? 'flex-row'
                  : 'flex-col items-start'
                : 'flex-row items-end'
            } flex flex-wrap justify-between gap-2`}
          >
            <div>
              <h4 className="text-base text-gray">
                Cuisine{' '}
                {typesOfCooking
                  .map(typeOfCooking => typeOfCooking.replace('Cuisine', ''))
                  .join(', ')}
              </h4>
              {!isResult && <h4 className="text=base text-gray">{location}</h4>}
            </div>
            {promotion && (
              <div className="rounded-[4px] bg-white-rock px-2 py-0.5 text-lg text-black">
                Jusqu'à <span className="text-scarlet">-{promotion}%</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}

export default RestaurantCard
