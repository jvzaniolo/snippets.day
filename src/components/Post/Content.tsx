import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import * as theme from 'react-syntax-highlighter/dist/cjs/styles/prism'
import useThemeValue from '../../hooks/useThemeValue'
import CopySnippet from './CopySnippet'

const PostContent = ({ content }: { content: string }) => {
  const style = useThemeValue(theme.base16AteliersulphurpoolLight, theme.duotoneDark)

  return (
    <ReactMarkdown
      className="font-serif"
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')

          return (
            <div className="relative">
              <CopySnippet snippet={children} />

              {!inline && match ? (
                <SyntaxHighlighter
                  style={style}
                  showLineNumbers
                  language={match[1]}
                  PreTag="div"
                  codeTagProps={{
                    className: 'font-mono',
                  }}
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
