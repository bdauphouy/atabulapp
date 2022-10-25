import { SearchContext } from '@/contexts/SearchContext'
import { ISearchForm } from '@/lib/interfaces'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RiUser6Line } from 'react-icons/ri'
import Button from '../shared/Button'
import RecentSearches from './RecentSearches'

const DesktopHeader = () => {
  const { setLocation, setPeriod, setNumberOfPersons, ...searchData } =
    useContext(SearchContext)

  const [isRecentSearchesOpen, setIsRecentSearchesOpen] = useState(false)

  const { register, handleSubmit } = useForm<ISearchForm>({
    defaultValues: {
      location: searchData.location,
      period: searchData.period,
      numberOfPersons: searchData.numberOfPersons,
    },
  })

  const onSubmit: SubmitHandler<ISearchForm> = ({
    location,
    period,
    numberOfPersons,
  }) => {
    setLocation(location)
    setPeriod(period)
    setNumberOfPersons(numberOfPersons)
  }

  const router = useRouter()

  return (
    <>
      <header className="flex flex-col flex-wrap items-start justify-between gap-6 border-b-[1px] border-solid border-alto/60 p-6 pb-3 md:flex-row md:items-center xl:px-32">
        <Link href="/">
          <div className="bg relative h-14 w-24">
            <Image
              src="/images/full-logo.svg"
              alt="Logo d'Atabulapp"
              layout="fill"
            />
          </div>
        </Link>
        <form
          className="flex w-full flex-col items-start gap-4 md:w-auto md:flex-row"
          id="search-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex w-full flex-col gap-4 rounded-md bg-alto/30 p-2 md:flex-row md:gap-0 md:rounded-full">
            <input
              type="text"
              className="border-solid border-white bg-[transparent] py-1 px-2 text-base text-black outline-none md:border-r-2"
              name="location"
              {...register('location')}
              placeholder="Localisation"
              onFocus={() => setIsRecentSearchesOpen(true)}
              onBlur={() => setIsRecentSearchesOpen(false)}
            />
            <input
              type="text"
              className="border-solid border-white bg-[transparent] py-1 px-2 text-base text-black outline-none md:border-r-2"
              name="months"
              {...register('period')}
              placeholder="Période"
            />
            <input
              type="text"
              className="bg-[transparent] px-2 py-1 text-base text-black outline-none"
              name="numberOfPersons"
              {...register('numberOfPersons')}
              placeholder="Nombre de personnes"
            />
          </div>
          <Button variant="primary" isSubmit form="search-form">
            Chercher
          </Button>
        </form>
        <Button
          variant="primary"
          onClick={() => router.push('/compte/personnel')}
        >
          <RiUser6Line />
          Profil
        </Button>
      </header>
      {isRecentSearchesOpen && <RecentSearches />}
    </>
  )
}

export default DesktopHeader
