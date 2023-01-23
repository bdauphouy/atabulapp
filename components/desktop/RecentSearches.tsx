import SearchTag from '../shared/SearchTag'

type RecentSearchesProps = {
  onClickOutside: () => void
}

const RecentSearches = ({ onClickOutside }: RecentSearchesProps) => {
  return (
    <>
      <div className="absolute z-10 h-max w-full bg-white px-5 py-12 xl:px-32">
        <h2 className="text-2xl font-bold text-black">Recherches récentes</h2>
        <p className="mt-8 text-lg text-black">Aucune recherche récente</p>
        {/* <ul className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          <li>
            <SearchTag type="near">A proximité</SearchTag>
          </li>
          {[...Array(7)].map((_, i) => (
            <li key={i}>
              <SearchTag type="place">Paris 8eme</SearchTag>
            </li>
          ))}
        </ul> */}
      </div>
      <div
        onClick={onClickOutside}
        className="absolute top-0 left-0 -z-10 h-screen w-full bg-black/20"
      ></div>
    </>
  )
}

export default RecentSearches
