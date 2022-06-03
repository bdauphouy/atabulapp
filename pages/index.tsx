import Input from '@/components/shared/Input'
import { useForm, SubmitHandler } from 'react-hook-form'

interface IPersonalTwoForm {
  test: string
}

const Home = () => {
  const { control, setValue, handleSubmit } = useForm<IPersonalTwoForm>({
    defaultValues: {
      test: 'test',
    },
  })

  const onSubmit: SubmitHandler<IPersonalTwoForm> = data => {
    console.log(data)
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-medium">Atabulapp</h1>
      <h2 className="text-gray">En cours de développement...</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          setValue={setValue}
          placeholder="Test"
          control={control}
          name="test"
          options={['test1', 'test2']}
        />
        <button>submit</button>
      </form>
    </div>
  )
}

export default Home
