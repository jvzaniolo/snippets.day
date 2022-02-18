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
  colors: {
    github: {
      50: '#f5f5f5',
      100: '#eeeeee',
      200: '#e0e0e0',
      300: '#bdbdbd',
      400: '#9e9e9e',
      500: '#757575',
      600: '#616161',
      700: '#424242',
      800: '#212121',
      900: '#000000',
    },
  },
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
})

export { theme }
