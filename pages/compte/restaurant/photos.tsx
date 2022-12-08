import RestaurantAccountLayout from '@/components/layouts/desktop/RestaurantAccountLayout'
import Button from '@/components/shared/Button'
import ImportImageArea from '@/components/shared/ImportImageArea'
import { IRestaurantPicturesForm } from '@/lib/interfaces'
import { ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const Pictures = () => {
  const { handleSubmit, control, watch } = useForm<IRestaurantPicturesForm>({
    defaultValues: {
      additionalPictures: [],
      coverPicture: null,
    },
  })

  const additionalPictures = watch(['additionalPictures'])

  const handleCoverEdit = () => {}

  const onSubmit: SubmitHandler<IRestaurantPicturesForm> = data => {
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <header className="mb-4 flex justify-between">
          <h3 className="text-lg font-bold text-black">Photo de couverture</h3>
          <Button isSubmit variant="tertiary" onClick={() => handleCoverEdit()}>
            Modifier
          </Button>
        </header>
        <ImportImageArea
          title="Photo de couverture"
          variant="full"
          control={control}
          name="coverPicture"
        />
        <header className="mt-8 mb-4 flex flex-col">
          <h3 className="text-lg font-bold text-black">
            Photo supplémentaires
          </h3>
          <h4 className="text-sm text-gray">Minimum 4</h4>
        </header>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => {
            return (
              <ImportImageArea
                key={i}
                title={`Photo supplémentaire ${i + 1}`}
                variant="full"
                control={control}
                name={`additionalPictures.${i}`}
              />
            )
          })}
          <ImportImageArea
            title="Photo supplémentaire 5"
            name="additionalPictures.4"
            control={control}
            variant="dashed-full"
          />
          {[
            ...Array(
              Math.max(0, additionalPictures[0].filter(Boolean).length - 4),
            ),
          ].map((_, i) => (
            <ImportImageArea
              key={i}
              title={`Photo supplémentaire ${i + 6}`}
              name={`additionalPictures.${i + 5}`}
              control={control}
              variant="dashed-full"
            />
          ))}
        </div>
      </form>
    </div>
  )
}

export default Pictures

Pictures.getLayout = (page: ReactElement) => (
  <RestaurantAccountLayout>{page}</RestaurantAccountLayout>
)
