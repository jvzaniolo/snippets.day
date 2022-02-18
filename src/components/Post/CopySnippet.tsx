import * as React from 'react'

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

  return <button onClick={handleClick}>{copied ? 'Copied' : 'Copy'}</button>
}

export default CopySnippet
