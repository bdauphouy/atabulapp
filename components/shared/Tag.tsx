import { Tag as T } from '@/lib/types'
import Image from 'next/image'
import { useMemo } from 'react'

interface TagProps extends T {
  className?: string
  withText?: boolean
}

const Tag = ({ className = '', type, number, withText = false }: TagProps) => {
  const iconSize = useMemo(() => 13, [])

  const TagIcon = () => {
    switch (type) {
      case 'michelin':
        return (
          <Image
            width={iconSize}
            height={iconSize}
            src="/tag-icons/michelin.svg"
            alt="Icône Michelin"
          />
        )
      case 'etoile-verte':
        return (
          <Image
            width={iconSize}
            height={iconSize}
            src="/tag-icons/etoile-verte.svg"
            alt="Icône Etoile Verte"
          />
        )
      case 'gault-et-millau':
        return (
          <Image
            width={iconSize}
            height={iconSize}
            src="/tag-icons/gault-et-millau.svg"
            alt="Icône Gault et Millau"
          />
        )
      case 'bib-gourmand':
        return (
          <Image
            width={iconSize}
            height={iconSize}
            src="/tag-icons/bib-gourmand.svg"
            alt="Icône Bib Gourmant"
          />
        )
    }
  }

  return (
    <ul
      className={`${className} ${
        type === 'michelin' || type === 'bib-gourmand'
          ? 'bg-[#FBE6EA] text-[#D3072B]'
          : type === 'etoile-verte'
          ? 'bg-[#CCEAD7] text-[#009739]'
          : 'bg-[#FFF5CE] text-[#BB980E]'
      } flex w-max items-center gap-1 rounded-[4px] px-1.5 py-1 leading-5`}
    >
      {[...Array(number)].map((_, i) => {
        return (
          <li key={i} className="flex items-center">
            <TagIcon />
          </li>
        )
      })}
      {withText && (
        <li className="ml-1 mt-0.5">
          {type.replaceAll('-', ' ').toUpperCase()}
        </li>
      )}
    </ul>
  )
}

export default Tag
