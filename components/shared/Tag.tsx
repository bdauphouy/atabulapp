import Image from 'next/image'

type TagsProps = {
  className?: string
  type: 'michelin' | 'etoile-verte' | 'gault-et-millau' | 'bib-gourmand'
  number: number
}

const Tags = ({ className = '', type, number }: TagsProps) => {
  const iconSize = 13

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
          ? 'bg-[#FBE6EA]'
          : type === 'etoile-verte'
          ? 'bg-[#CCEAD7]'
          : 'bg-[#FFF5CE]'
      } flex w-max items-center gap-1 rounded-[4px] px-1.5 py-1`}
    >
      {[...Array(number)].map((_, i) => {
        return (
          <li key={i} className="flex items-center">
            <TagIcon />
          </li>
        )
      })}
    </ul>
  )
}

export default Tags
