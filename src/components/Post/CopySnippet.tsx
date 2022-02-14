import * as React from 'react'
import { Button } from '@chakra-ui/react'

const CopySnippet = ({ snippet }: { snippet: React.ReactNode }) => {
  const [text, setText] = React.useState('Copy')

  function handleClick() {
    try {
      navigator.clipboard.writeText(String(snippet).replace(/\n$/, ''))
      setText('Copied')

      setTimeout(() => {
        setText('Copy')
      }, 1500)
    } catch {
      setText('Error')
    }
  }

  return (
    <Button size="xs" position={'absolute'} top="2" right="2" onClick={handleClick}>
      {text}
    </Button>
  )
}

export default CopySnippet
