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

  return (
    <button
      onClick={handleClick}
      className="absolute top-3 right-4 z-10 rounded bg-primary-500 py-1 px-2 text-xs text-white dark:bg-primary-600"
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

export default CopySnippet
