import { extendTheme } from '@chakra-ui/react'

type Props = {
  colorMode: 'light' | 'dark'
}

const theme = extendTheme({
  styles: {
    global: (props: Props) => ({
      'html, body': {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.100',
      },
    }),
  },
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
})

export default theme
