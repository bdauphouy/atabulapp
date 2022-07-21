import { SearchContext } from '@/contexts/SearchContext'
import { ISearchForm } from '@/lib/interfaces'
import Image from 'next/image'
import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RiUser6Line } from 'react-icons/ri'
import Button from '../shared/Button'

const DesktopHeader = () => {
  const { setLocation, setPeriod, setNumberOfPersons, ...searchData } =
    useContext(SearchContext)

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

  return (
    <header className="flex items-center justify-between border-b-[1px] border-solid border-alto/60 p-6 pb-3 lg:px-32">
      <div className="bg relative h-14 w-24">
        <Image
          src="/images/full-logo.svg"
          alt="Logo d'Atabulapp"
          layout="fill"
        />
      </div>
      <form
        className="flex gap-4"
        id="search-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex rounded-full bg-alto/30 p-2">
          <input
            type="text"
            className="border-r-2 border-solid border-white bg-[transparent] px-2 text-base text-black outline-none"
            name="location"
            {...register('location')}
            placeholder="Localisation"
          />
          <input
            type="text"
            className="border-r-2 border-solid border-white bg-[transparent] px-2 text-base text-black outline-none"
            name="months"
            {...register('period')}
            placeholder="Période"
          />
          <input
            type="text"
            className="bg-[transparent] px-2 text-base text-black outline-none"
            name="numberOfPersons"
            {...register('numberOfPersons')}
            placeholder="Nombre de personnes"
          />
        </div>
        <Button variant="primary" submit form="search-form">
          Chercher
        </Button>
      </form>
      <Button variant="primary">
        <RiUser6Line />
        Profil
      </Button>
    </header>
  )
}

export default DesktopHeader
