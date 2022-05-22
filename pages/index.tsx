import Head from 'next/head'
import Checkbox from '@/components/shared/Checkbox'
import Button from '@/components/shared/Button'
import Radio from '@/components/shared/Radio'
import Switch from '@/components/shared/Switch'
import FilterDropdown from '@/components/shared/filters/FilterDropdown'
import FilterTag from '@/components/shared/filters/FilterTag'
import Input from '@/components/shared/Input'
import Tag from '@/components/shared/Tag'
import TabBar from '@/components/shared/TabBar'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

type FormValues = {
  checkbox: boolean
  radio: 'primary' | 'secondary'
  switch: boolean
  filterTag: boolean
  input: string
}

const Home = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      checkbox: true,
      radio: 'secondary',
      switch: true,
      filterTag: true,
      input: '',
    },
  })

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data)
  }

  return (
    <>
      <Head>
        <title>
          Atabul&apos;app - Offres et avantages pour les professionnels de la
          restauration et de l&apos;hôtellerie
        </title>
        <meta
          name="description"
          content="Atabul'app est une application qui a pour but de permettre des professionnelles de l’hôtellerie et de la restauration de profiter des avantages et des offres à d'autres pros du milieu (les étudiants, les brigades etc)."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-3xl">Atabul&apos;app</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 flex w-[500px] flex-col items-center gap-4"
        >
          <Controller
            control={control}
            name="checkbox"
            render={({ field: { onChange, name, value } }) => {
              return (
                <Checkbox name={name} onChange={onChange} checked={value} />
              )
            }}
          />
          <Controller
            control={control}
            name="radio"
            render={({ field: { onChange, name, value } }) => {
              return (
                <div className="flex gap-4">
                  <Radio
                    value="primary"
                    name={name}
                    checked={value === 'primary'}
                    onChange={onChange}
                  ></Radio>
                  <Radio
                    value="secondary"
                    name={name}
                    checked={value === 'secondary'}
                    onChange={onChange}
                  ></Radio>
                </div>
              )
            }}
          />
          <Controller
            control={control}
            name="switch"
            render={({ field: { onChange, name, value } }) => {
              return (
                <Switch
                  label="Mon super switch"
                  name={name}
                  on={value}
                  onChange={onChange}
                />
              )
            }}
          />

          <Button variant="tertiary" textColor="scarlet">
            Submit
          </Button>
          <FilterDropdown onToggle={({ isOpen }) => console.log(isOpen)}>
            Filtres
          </FilterDropdown>
          <Controller
            control={control}
            name="filterTag"
            render={({ field: { onChange, name, value } }) => {
              return (
                <FilterTag name={name} onChange={onChange} selected={value}>
                  Last minute
                </FilterTag>
              )
            }}
          />
          <Controller
            control={control}
            name="input"
            render={({ field: { onChange, name, value } }) => {
              return (
                <Input
                  options={[
                    'option 1',
                    'option 2',
                    'option 3',
                    'option 4',
                    'option 5',
                    'option 6',
                    'option 7',
                    'option 8',
                    'option 9',
                  ]}
                  defaultValue={value}
                  className="mt-4"
                  name={name}
                  placeholder="Nom"
                  onChange={onChange}
                />
              )
            }}
          />
        </form>
        <Tag type="michelin" number={5} />
        <Tag type="etoile-verte" number={5} />
        <Tag type="gault-et-millau" number={3} />
        <Tag type="bib-gourmand" number={3} />
        <TabBar />
      </div>
    </>
  )
}

export default Home
