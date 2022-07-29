import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface CodeBlockProps {
  children?: React.ReactNode;
}

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>((props, ref) => {
  return <div ref={ref}>{props.children}</div>;
});

CodeBlock.displayName = 'CodeBlock';

CodeBlock.propTypes = {
  children: PropTypes.node,
};

export {CodeBlock};

import {PrismLight as SyntaxHighlighter} from 'react-syntax-highlighter';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import c from 'react-syntax-highlighter/dist/cjs/languages/prism/c';
import csharp from 'react-syntax-highlighter/dist/cjs/languages/prism/csharp';
import go from 'react-syntax-highlighter/dist/cjs/languages/prism/go';
import groovy from 'react-syntax-highlighter/dist/cjs/languages/prism/groovy';
import java from 'react-syntax-highlighter/dist/cjs/languages/prism/java';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import php from 'react-syntax-highlighter/dist/cjs/languages/prism/php';
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';
import ruby from 'react-syntax-highlighter/dist/cjs/languages/prism/ruby';
import shell from 'react-syntax-highlighter/dist/cjs/languages/prism/shell-session';

import {marginPropTypes} from '@twilio-labs/match-props';

import {SnippetLanguage, SnippetVariant} from './constants';
import {getLanguageNiceName} from './get-language-nice-name';
import {SnippetActions} from './snippet-actions';
import {StyledSnippet, StyledSnippetHeader, StyledSnippetTitle, StyledSnippetBody, StyledHighlighter} from './styles';
import type {SnippetProps} from './types';

SyntaxHighlighter.registerLanguage(SnippetLanguage.JAVASCRIPT, javascript);
SyntaxHighlighter.registerLanguage(SnippetLanguage.CSHARP, csharp);
SyntaxHighlighter.registerLanguage(SnippetLanguage.PHP, php);
SyntaxHighlighter.registerLanguage(SnippetLanguage.RUBY, ruby);
SyntaxHighlighter.registerLanguage(SnippetLanguage.PYTHON, python);
SyntaxHighlighter.registerLanguage(SnippetLanguage.JAVA, java);
SyntaxHighlighter.registerLanguage(SnippetLanguage.JSON, json);
SyntaxHighlighter.registerLanguage(SnippetLanguage.C, c);
SyntaxHighlighter.registerLanguage(SnippetLanguage.BASH, bash);
SyntaxHighlighter.registerLanguage(SnippetLanguage.SHELL, shell);
SyntaxHighlighter.registerLanguage(SnippetLanguage.GO, go);
SyntaxHighlighter.registerLanguage(SnippetLanguage.GROOVY, groovy);

export const Snippet: React.FC<SnippetProps> = ({
  children,
  label,
  language,
  wrapLines,
  githubLink,
  isGrouped,
  variant,
  showLineNumbers,
  maxLines,
  marginX,
  marginY,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  ...props
}) => {
  const [scrollX, setScrollX] = React.useState(0);
  const lineCount = children.split(/\n/g).length;
  const lineNumberWidth = lineCount.toString().length;
  const isSingleLine = Boolean(!wrapLines && lineCount === 1);
  const isShell = Boolean(language === SnippetLanguage.SHELL);

  const handleScroll = (e: React.SyntheticEvent<HTMLDivElement>) => {
    setScrollX(
      Math.round((e.currentTarget.scrollLeft / (e.currentTarget.scrollWidth - e.currentTarget.clientWidth)) * 100)
    );
  };

  return (
    <StyledSnippet
      variant={variant}
      isSingleLine={isSingleLine}
      marginX={marginX}
      marginY={marginY}
      marginTop={marginTop}
      marginRight={marginRight}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
    >
      {!isSingleLine && !isGrouped && (
        <StyledSnippetHeader variant={variant}>
          <StyledSnippetTitle>{label ? label : getLanguageNiceName(language)}</StyledSnippetTitle>
          <SnippetActions variant={variant} code={children} githubLink={githubLink} />
        </StyledSnippetHeader>
      )}
      <StyledSnippetBody
        variant={variant}
        isSingleLine={isSingleLine}
        data-scroll-x={isSingleLine ? scrollX.toString() : undefined}
        data-testid="scrollable-parent"
      >
        <StyledHighlighter
          tabIndex={0}
          variant={variant}
          language={language}
          maxLines={maxLines}
          data-testid="scrollable"
          onScroll={isSingleLine ? handleScroll : undefined}
        >
          <SyntaxHighlighter
            {...props}
            language={language}
            showLineNumbers={!isSingleLine && !isShell && showLineNumbers}
            wrapLongLines={wrapLines}
            wrapLines={true}
            useInlineStyles={false}
            lineNumberStyle={{
              display: !isSingleLine && !isShell && showLineNumbers ? 'inline-block' : 'none',
              paddingRight: undefined,
              minWidth: `${lineNumberWidth}ch`,
            }}
            lineProps={{
              style: {
                display: 'flex',
                flexWrap: wrapLines ? 'wrap' : 'nowrap',
              },
            }}
          >
            {children}
          </SyntaxHighlighter>
        </StyledHighlighter>
      </StyledSnippetBody>
      {isSingleLine && <SnippetActions variant={variant} code={children} githubLink={githubLink} />}
    </StyledSnippet>
  );
};

Snippet.propTypes = {
  ...marginPropTypes,
  children: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(Object.values(SnippetVariant)),
  language: PropTypes.oneOf(Object.values(SnippetLanguage)).isRequired,
  label: PropTypes.string,
  showLineNumbers: PropTypes.bool,
  wrapLines: PropTypes.bool,
  githubLink: PropTypes.string,
  isGrouped: PropTypes.bool,
  maxLines: PropTypes.number,
};

Snippet.defaultProps = {
  variant: SnippetVariant.DARK,
  showLineNumbers: true,
  wrapLines: false,
};
