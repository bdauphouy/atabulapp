import { ShowLoginModal } from '@/contexts/ShowLoginModal'
import api from '@/lib/api'
import Cookie from 'js-cookie'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { Flipped } from 'react-flip-toolkit'
import toast from 'react-hot-toast'
import Like from '../restaurant/Like'
import Tag from './Tag'

const Link = dynamic(import('next/link'), { ssr: false })

type RestaurantCardProps = {
  className?: string
  variant?: 'horizontal' | 'vertical'
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
  onLike?: (isLiked: boolean) => void
}

const RestaurantCard = ({
  className = '',
  variant = 'vertical',
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
  onLike = () => {},
}: RestaurantCardProps) => {
  const [isLiked, setIsLiked] = useState(isDefaultLiked)

  const { setShowLoginModal } = useContext(ShowLoginModal)

  const handleLike = async () => {
    const response = await api[isLiked ? 'removeFavorite' : 'addFavorite'](
      id,
      Cookie.get('token'),
    )

    const device = Cookie.get('deviceType')

    if (!response.success) {
      if (device !== 'desktop') {
        return toast(t => (
          <span className="">
            Vous devez être connecté pour ajouter un restaurant à vos favoris.{' '}
            <Link
              href={device === 'desktop' ? '/' : '/mobile/connexion'}
              className="text-scarlet underline"
              onClick={() => toast.dismiss(t.id)}
            >
              Se connecter
            </Link>
          </span>
        ))
      }

      return setShowLoginModal(true)
    }

    setIsLiked(!isLiked)
    onLike(!isLiked)
  }

  return (
    <Flipped flipId={id} stagger>
      <article
        className={`${className} ${
          size === 'sm' || size === 'md' ? 'min-w-0' : 'lg:min-w-[384px]'
        } ${
          isResult
            ? variant === 'horizontal'
              ? 'rounded-lg'
              : 'rounded-b-lg'
            : ''
        } ${
          variant === 'horizontal' ? 'overflow-hidden rounded-lg' : 'flex-col'
        } flex w-full gap-2 bg-white`}
      >
        <header
          className={`${
            variant === 'horizontal'
              ? 'h-full min-w-[100px] max-w-[160px] flex-1'
              : ''
          } relative overflow-hidden ${
            variant === 'vertical' ? 'rounded-lg' : ''
          } ${
            size === 'sm'
              ? variant === 'horizontal'
                ? 'h-auto'
                : 'h-44'
              : size === 'md'
              ? 'h-60'
              : 'h-72'
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
          <Like isLiked={isLiked} onClick={handleLike} />
        </header>{' '}
        <Link
          href={`${
            Cookie.get('deviceType') === 'desktop' ? '' : '/mobile'
          }/restaurants/${id}`}
        >
          <div
            className={`flex flex-auto flex-col gap-2 rounded-lg ${
              variant === 'horizontal' ? 'p-2 pl-0' : ''
            }`}
          >
            {variant === 'vertical' && tags && (
              <div className={`flex gap-2 ${isResult ? 'px-2' : ''}`}>
                {tags.map((tag, i) => (
                  <Tag key={i} type={tag.name} number={tag.level ?? 1} />
                ))}
              </div>
            )}

            <div className={isResult ? 'px-2 pb-2' : ''}>
              <h3 className="text-lg font-medium text-black">{name}</h3>
              <div
                className={`${
                  size === 'sm'
                    ? isResult
                      ? 'flex-row'
                      : 'flex-col items-start'
                    : 'flex-row items-end'
                } ${
                  variant === 'horizontal' ? 'flex-col items-start' : ''
                } flex flex-wrap justify-between gap-2`}
              >
                <div>
                  <h4 className="text-base text-gray">
                    Cuisine{' '}
                    {typesOfCooking
                      .map(typeOfCooking =>
                        typeOfCooking.replace('Cuisine', ''),
                      )
                      .join(', ')}
                  </h4>
                  {!isResult && (
                    <h4 className="text=base text-gray">{location}</h4>
                  )}
                </div>
                {promotion && (
                  <div className="rounded-[4px] bg-white-rock px-2 py-0.5 text-lg text-black">
                    Jusqu'à <span className="text-scarlet">-{promotion}%</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      </article>
    </Flipped>
  )
}

export default RestaurantCard
