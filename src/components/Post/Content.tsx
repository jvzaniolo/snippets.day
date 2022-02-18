import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { duotoneDark, duotoneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import CopySnippet from './CopySnippet'

const PostContent = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')

          return (
            <div>
              <CopySnippet snippet={children} />

              {!inline && match ? (
                <SyntaxHighlighter
                  style={duotoneDark}
                  showLineNumbers
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )}
            </div>
          )
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export default PostContent
