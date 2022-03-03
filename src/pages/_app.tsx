import type { AppProps } from 'next/app'
import Header from '~/components/Header'
import { ThemeProvider } from '~/contexts/ThemeContext'

import '~/styles/global.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
