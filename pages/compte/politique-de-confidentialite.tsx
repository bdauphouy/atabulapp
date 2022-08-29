import AccountLayout from '@/components/layouts/desktop/AccountLayout'
import { ReactElement } from 'react'

const PrivacyPolicy = () => {
  return (
    <div className="py-10">
      <h2 className="mb-6 text-2xl font-semibold text-black">
        Conditions générales d'utilisation et de vente (CGUV)
      </h2>
      <ul className="flex flex-col gap-20">
        <li>
          <h3 className="text-lg font-bold text-black">
            Présentation générale
          </h3>
          <p className="mt-4">
            Placerat lacus morbi ultricies sit in tincidunt vitae. Id in lacinia
            consectetur orci, arcu mauris pretium maecenas. Suspendisse aliquet
            id id laoreet vitae nulla pharetra, nec pretium. Dignissim
            scelerisque eu leo feugiat posuere. Commodo aliquet est sed
            porttitor elit dis cursus. Ornare montes, id sem enim sagittis.
            Vivamus justo vestibulum gravida in consectetur aliquam interdum
            risus sed. Nibh lorem quis condimentum dignissim. Mauris scelerisque
            egestas porttitor elementum morbi amet suspendisse nec. Rhoncus
            quisque viverra purus, volutpat justo, proin vitae ac pretium. Id
            aliquet orci, tortor magna massa enim quam id ac. Eu nisi, suscipit
            fames tincidunt egestas. Arcu ultrices aenean adipiscing cursus diam
            lectus nulla maecenas semper. Nam morbi quis amet tincidunt. Viverra
            tempor rhoncus, tincidunt ac facilisis nunc fermentum sed sociis.
            Faucibus pellentesque quis dolor turpis suspendisse lectus mus amet.
            Quis consectetur dictumst amet adipiscing semper lectus risus,
            tellus leo. Dolor mattis tincidunt ut amet.
          </p>
        </li>
        <li>
          <h3 className="text-lg font-bold text-black">
            ARTICLE 1 - Définition
          </h3>
          <p className="mt-4">
            Placerat lacus morbi ultricies sit in tincidunt vitae. Id in lacinia
            consectetur orci, arcu mauris pretium maecenas. Suspendisse aliquet
            id id laoreet vitae nulla pharetra, nec pretium. Dignissim
            scelerisque eu leo feugiat posuere. Commodo aliquet est sed
            porttitor elit dis cursus. Ornare montes, id sem enim sagittis.
            Vivamus justo vestibulum gravida in consectetur aliquam interdum
            risus sed. Nibh lorem quis condimentum dignissim. Mauris scelerisque
            egestas porttitor elementum morbi amet suspendisse nec. Rhoncus
            quisque viverra purus, volutpat justo, proin vitae ac pretium. Id
            aliquet orci, tortor magna massa enim quam id ac. Eu nisi, suscipit
            fames tincidunt egestas. Arcu ultrices aenean adipiscing cursus diam
            lectus nulla maecenas semper. Nam morbi quis amet tincidunt. Viverra
            tempor rhoncus, tincidunt ac facilisis nunc fermentum sed sociis.
            Faucibus pellentesque quis dolor turpis suspendisse lectus mus amet.
            Quis consectetur dictumst amet adipiscing semper lectus risus,
            tellus leo. Dolor mattis tincidunt ut amet.
          </p>
        </li>
      </ul>
    </div>
  )
}

export default PrivacyPolicy

PrivacyPolicy.getLayout = (page: ReactElement) => (
  <AccountLayout>{page}</AccountLayout>
)
