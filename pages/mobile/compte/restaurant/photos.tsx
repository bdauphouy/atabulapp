import AccountLayout from '@/components/layouts/mobile/AccountLayout'
import MobileLayout from '@/components/layouts/mobile/MobileLayout'
import Button from '@/components/shared/Button'
import ImportImageArea from '@/components/shared/ImportImageArea'
import Spin from '@/components/shared/Spin'
import api from '@/lib/api'
import urlToFile from '@/lib/functions/urlToFile'
import { IRestaurantPicturesForm } from '@/lib/interfaces'
import { requireAuth } from '@/lib/middlewares/requireAuth'
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RiAddLine } from 'react-icons/ri'

export const getServerSideProps = requireAuth(async ({ req }) => {
  const { token } = req.cookies
  const restaurantId = api.getRestaurantId(token)

  const { pictures } = await api.getRestaurantPictures(restaurantId)

  return {
    props: {
      pictures,
      restaurantId,
    },
  }
})

const Pictures = ({ pictures, restaurantId }) => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IRestaurantPicturesForm>({
    defaultValues: {
      additionalPictures: [],
      coverPicture: null,
    },
  })

  const [isLoading, setIsLoading] = useState(false)

  const setDefaultPictures = useCallback(async () => {
    setIsLoading(true)

    setValue('coverPicture', pictures[0] && (await urlToFile(pictures[0])))

    const additionalPictures = pictures.slice(1).map(async picture => {
      return await urlToFile(picture)
    })

    setValue('additionalPictures', await Promise.all(additionalPictures))

    setIsLoading(false)
  }, [setValue, pictures])

  useEffect(() => {
    setDefaultPictures()
  }, [setDefaultPictures])

  const picturesGridRef = useRef<HTMLDivElement>()

  const additionalPictures = watch(['additionalPictures'])

  const handleCoverEdit = () => {}

  const onSubmit: SubmitHandler<IRestaurantPicturesForm> = async data => {
    for (const picture of data.additionalPictures.filter(Boolean)) {
      await api.addRestaurantPicture(restaurantId, picture)
    }

    await api.addRestaurantPicture(restaurantId, data.coverPicture)
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
        {isLoading ? (
          <p className="flex items-center gap-2">
            <Spin size={16} color="scarlet" />
            Chargement des images...
          </p>
        ) : (
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
        )}
      </form>
    </div>
  )
}

export default Pictures
Pictures.getLayout = (page: ReactElement) => {
  return (
    <MobileLayout>
      <AccountLayout title="Photos">{page}</AccountLayout>
    </MobileLayout>
  )
}
