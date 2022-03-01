import ReactSyntaxHighlighter from 'react-syntax-highlighter'
import useThemeValue from '~/hooks/useThemeValue'

import { foundation, a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

interface SyntaxHighlighterProps {
  snippet: string
  lang: string
}

const SyntaxHighlighter = ({ snippet, lang }: SyntaxHighlighterProps) => {
  const style = useThemeValue(foundation, a11yDark)

  return (
    <ReactSyntaxHighlighter language={lang} style={style}>
      {snippet}
    </ReactSyntaxHighlighter>
  )
}

export default SyntaxHighlighter
