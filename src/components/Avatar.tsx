import * as Avatar from '@radix-ui/react-avatar'

type AvatarProps = {
  image?: string
  name: string
  className?: string
}

export default ({ image = undefined, name, className }: AvatarProps) => {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')

  return (
    <Avatar.Root className={`${className} h-full w-full rounded-full`}>
      <Avatar.Image alt={name} src={image} />
      <Avatar.Fallback className="gradient-primary grid h-full w-full place-items-center rounded-full text-sm font-semibold text-white ">
        {initials.toUpperCase()}
      </Avatar.Fallback>
    </Avatar.Root>
  )
}
