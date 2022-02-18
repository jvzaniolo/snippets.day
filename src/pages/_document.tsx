import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className="bg-white text-neutral-900 dark:bg-neutral-800 dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
