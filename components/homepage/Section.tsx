type SectionProps = {
  title: string
  children: React.ReactNode
  isGrid?: boolean
}

const Section = ({ title, children, isGrid }: SectionProps) => {
  return (
    <div>
      <h3 className="px-6 text-2xl font-bold text-black lg:px-32">{title}</h3>
      <div
        className={`mt-4 gap-6 px-6 lg:px-32 ${
          isGrid ? 'grid grid-cols-1 lg:grid-cols-2' : 'flex overflow-auto'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export default Section
