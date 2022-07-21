type RoleProps = {
  title: string
  subtitle: string
}

const Role = ({ title, subtitle }: RoleProps) => {
  return (
    <li>
      <h4 className="text-sm text-gray">{title}</h4>
      <span className="mt-1 inline-block text-base font-medium text-black">
        {subtitle}
      </span>
    </li>
  )
}

export default Role
