import ReactSyntaxHighlighter from 'react-syntax-highlighter'
import useThemeValue from '~/hooks/useThemeValue'

import { atomOneLight, atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

interface SyntaxHighlighterProps {
  snippet: string
  lang: string
}

const SyntaxHighlighter = ({ snippet, lang }: SyntaxHighlighterProps) => {
  const style = useThemeValue(atomOneLight, atomOneDark)

  return (
    <ReactSyntaxHighlighter language={lang} style={style} showLineNumbers>
      {snippet}
    </ReactSyntaxHighlighter>
  )
}

export default SyntaxHighlighter
