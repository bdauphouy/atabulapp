import SearchTag from '../shared/SearchTag'

const RecentSearches = () => {
  return (
    <div className="absolute z-50 h-full w-full bg-white px-5 pt-12 xl:px-32">
      <h2 className="text-2xl font-bold text-black">Recherches récentes</h2>
      <ul className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <li>
          <SearchTag type="near">A proximité</SearchTag>
        </li>
        {[...Array(7)].map((_, i) => (
          <li key={i}>
            <SearchTag type="place">Paris 8eme</SearchTag>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecentSearches
