import ReactSyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark, foundation } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { useThemeValue } from '~/contexts/theme';

interface SyntaxHighlighterProps {
  snippet: string;
  lang: string;
}

const SyntaxHighlighter = ({ snippet, lang }: SyntaxHighlighterProps) => {
  const style = useThemeValue(foundation, a11yDark);

  return (
    <ReactSyntaxHighlighter language={lang} style={style}>
      {snippet}
    </ReactSyntaxHighlighter>
  );
};

export default SyntaxHighlighter;
