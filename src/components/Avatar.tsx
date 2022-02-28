import * as Avatar from '@radix-ui/react-avatar'

type AvatarProps = {
  image?: string
  firstName?: string
  lastName?: string
  className?: string
}

export default ({ image = undefined, firstName, lastName, className }: AvatarProps) => {
  const initials = firstName && lastName ? firstName[0] + lastName[0] : undefined

  return (
    <Avatar.Root className={`${className} h-full w-full rounded-full`}>
      <Avatar.Image alt={`${firstName} ${lastName}`} src={image} />
      <Avatar.Fallback className="gradient-primary grid h-full w-full place-items-center rounded-full text-sm font-semibold text-white ">
        {initials?.toUpperCase()}
      </Avatar.Fallback>
    </Avatar.Root>
  )
}
