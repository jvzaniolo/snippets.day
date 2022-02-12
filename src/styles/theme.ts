import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: props => ({
      'html, body': {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.100',
      },
    }),
  },
  config: {
    initialColorMode: 'system',
    useSystemColorMode: false,
  },
})

export default theme
