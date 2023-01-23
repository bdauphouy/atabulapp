import SearchTag from '../shared/SearchTag'

type DesktopHeaderSearchDropdownProps = {
  suggestions: string[]
  onSuggestionClick: (suggestion: string) => void
}

const DesktopHeaderSearchDropdown = ({ suggestions, onSuggestionClick }) => {
  return (
    <ul className=" absolute left-0 -bottom-8 z-50 flex w-full translate-y-full flex-col gap-4 rounded-xl border-[1px] border-alto/60 bg-white p-8 shadow-xl">
      {suggestions.map((suggestion: string, i: number) => (
        <li key={i} onClick={() => onSuggestionClick(suggestion)}>
          <SearchTag type="near" withUnderline={suggestions.length - 1 !== i}>
            {suggestion}
          </SearchTag>
        </li>
      ))}
    </ul>
  )
}

export default DesktopHeaderSearchDropdown
