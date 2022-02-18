import * as React from 'react'
import { Button } from '@chakra-ui/react'

const CopySnippet = ({ snippet }: { snippet: React.ReactNode }) => {
  const [copied, setCopied] = React.useState(false)

  function handleClick() {
    try {
      navigator.clipboard.writeText(String(snippet).replace(/\n$/, ''))
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Button
      size="xs"
      top="2"
      right="2"
      position={'absolute'}
      colorScheme={copied ? 'green' : undefined}
      onClick={handleClick}
    >
      {copied ? 'Copied' : 'Copy'}
    </Button>
  )
}

export default CopySnippet
