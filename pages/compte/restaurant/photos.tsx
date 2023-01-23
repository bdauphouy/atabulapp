import RestaurantAccountLayout from '@/components/layouts/desktop/RestaurantAccountLayout'
import Button from '@/components/shared/Button'
import ImportImageArea from '@/components/shared/ImportImageArea'
import api from '@/lib/api'
import { IRestaurantPicturesForm } from '@/lib/interfaces'
import { requireAuth } from '@/lib/middlewares/requireAuth'
import Image from 'next/image'
import { ReactElement, useEffect, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RiAddLine } from 'react-icons/ri'

export const getServerSideProps = requireAuth(async () => {
  const { error, pictures } = await api.getRestaurantPictures(7)

  return {
    props: {
      pictures,
    },
  }
})

const Pictures = ({ pictures }) => {
  const { handleSubmit, control, watch, setValue } =
    useForm<IRestaurantPicturesForm>({
      defaultValues: {
        additionalPictures: [],
        coverPicture: null,
      },
    })

  const picturesGridRef = useRef<HTMLDivElement>()

  const additionalPictures = watch(['additionalPictures'])

  const handleCoverEdit = () => {}

  const onSubmit: SubmitHandler<IRestaurantPicturesForm> = async data => {
    console.log(data)
    const res = await api.addRestaurantPicture(7, data.coverPicture)

    console.log(res)
  }

  const handleAddPictureClick = () => {
    setValue('additionalPictures', [...additionalPictures[0], undefined])
    setTimeout(() => {
      picturesGridRef.current.children[
        picturesGridRef.current.children.length - 2
      ]
        .querySelector('input')
        .click()
    })
  }

  console.log(pictures)

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
          coverPicture={pictures[0] && api.getRestaurantPictureUrl(pictures[0])}
        />
        <header className="mt-8 mb-4 flex flex-col">
          <h3 className="text-lg font-bold text-black">
            Photo supplémentaires
          </h3>
          <h4 className="text-sm text-gray">Minimum 4</h4>
        </header>
        <div className="grid grid-cols-2 gap-4" ref={picturesGridRef}>
          {additionalPictures[0].map((_, i) => {
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
          <div className="relative" onClick={handleAddPictureClick}>
            <div className="relative flex h-40 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-scarlet">
              <RiAddLine
                className="rounded-full border-2 border-solid border-scarlet text-scarlet"
                size={36}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Pictures

Pictures.getLayout = (page: ReactElement) => (
  <RestaurantAccountLayout>{page}</RestaurantAccountLayout>
)
