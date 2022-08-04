import * as React from 'react';
import * as PropTypes from 'prop-types';
// import {Box} from '@twilio-paste/box';
// for snippet group:
// import { ChevronDownIcon } from "@twilio-paste/icons/esm/ChevronDownIcon";

// for snippet actions:
// import { CopyIcon } from "@twilio-paste/icons/esm/CopyIcon";
import {PrismLight as SyntaxHighlighter} from 'react-syntax-highlighter';
import nightOwl from 'react-syntax-highlighter/dist/esm/styles/prism/night-owl';

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
// import shell from 'react-syntax-highlighter/dist/cjs/languages/prism/shellSession'; // craps out

// import {marginPropTypes} from '@twilio-labs/match-props'; //Do we need this? only used in PropTypes.

import {CodeBlockLanguage, CodeBlockVariant} from './constants';
// import {SnippetActions} from './snippet-actions'; // this is for the copy/paste action, skip for now
// import {StyledSnippet, StyledSnippetHeader, StyledSnippetTitle, StyledSnippetBody, StyledHighlighter} from './styles';
import type {SnippetProps} from './types';

SyntaxHighlighter.registerLanguage(CodeBlockLanguage.JAVASCRIPT, javascript);
SyntaxHighlighter.registerLanguage(CodeBlockLanguage.CSHARP, csharp);
SyntaxHighlighter.registerLanguage(CodeBlockLanguage.PHP, php);
SyntaxHighlighter.registerLanguage(CodeBlockLanguage.RUBY, ruby);
SyntaxHighlighter.registerLanguage(CodeBlockLanguage.PYTHON, python);
SyntaxHighlighter.registerLanguage(CodeBlockLanguage.JAVA, java);
SyntaxHighlighter.registerLanguage(CodeBlockLanguage.JSON, json);
SyntaxHighlighter.registerLanguage(CodeBlockLanguage.C, c);
// SyntaxHighlighter.registerLanguage(CodeBlockLanguage.BASH, bash); // bash import not working
// SyntaxHighlighter.registerLanguage(CodeBlockLanguage.SHELL, shell); // shell import isn't working
SyntaxHighlighter.registerLanguage(CodeBlockLanguage.GO, go);
SyntaxHighlighter.registerLanguage(CodeBlockLanguage.GROOVY, groovy);

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
  // const [scrollX, setScrollX] = React.useState(0);
  const lineCount = children.split(/\n/g).length;
  const lineNumberWidth = lineCount.toString().length;
  const isSingleLine = Boolean(!wrapLines && lineCount === 1);
  const isShell = Boolean(language === CodeBlockLanguage.SHELL);

  // Gotta fix typing issues with scrolling:
  // const handleScroll = (e: React.SyntheticEvent<HTMLDivElement>): void => {
  //   setScrollX(
  //     Math.round((e.currentTarget.scrollLeft / (e.currentTarget.scrollWidth - e.currentTarget.clientWidth)) * 100)
  //   );
  // };

  return (
    <SyntaxHighlighter
      {...props}
      style={nightOwl}
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
  );
};

Snippet.propTypes = {
  // ...marginPropTypes,
  children: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(Object.values(CodeBlockVariant)),
  language: PropTypes.oneOf(Object.values(CodeBlockLanguage)).isRequired,
  label: PropTypes.string,
  showLineNumbers: PropTypes.bool,
  wrapLines: PropTypes.bool,
  githubLink: PropTypes.string,
  isGrouped: PropTypes.bool,
  maxLines: PropTypes.number,
};

Snippet.defaultProps = {
  variant: CodeBlockVariant.DARK,
  showLineNumbers: true,
  wrapLines: false,
};

/////////////////////////////////////
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
