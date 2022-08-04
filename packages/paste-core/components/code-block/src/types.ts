// import { MarginProps } from "@twilio-labs/match-props";

import type {BoxProps} from '@twilio-paste/box';

import type {CodeBlockVariant, CodeBlockLanguage} from './constants'; //are these types??

export interface SnippetProps extends BoxProps {
  children: string;
  variant?: `${CodeBlockVariant}`;
  language: `${CodeBlockLanguage}`;
  /** Filename or snippet name. */
  label?: string;
  /** Link to full GitHub or Gist source code. */
  githubLink?: string;
  /** Include line numbers in code block. */
  showLineNumbers?: boolean;
  /** Wraps long lines of code. */
  wrapLines?: boolean;
  /**
   * Set to true automatically when nested inside of SnippetGroup.
   * @ignore
   */
  isGrouped?: boolean;
  /** Constrains the height of code block to a set number of lines. */
  maxLines?: number;
}

export interface SnippetActionsProps {
  code: string;
  githubLink?: string;
  variant?: `${CodeBlockVariant}`;
}

export interface SnippetGroupProps extends BoxProps {
  variant?: `${CodeBlockVariant}`;
  children: Array<React.ReactElement<SnippetProps>>;
  /** File name or snippet name. */
  label?: string;
  /** Force mobile optimized layout for all breakpoints. */
  compact?: boolean;
}

export interface StyledSnippetGroupProps extends BoxProps {
  variant?: `${CodeBlockVariant}`;
  compact?: boolean;
  hasTitle?: boolean;
}

export interface StyledSnippetProps extends BoxProps {
  variant?: `${CodeBlockVariant}`;
  language?: `${CodeBlockLanguage}`;
  isSingleLine?: boolean;
  maxLines?: number;
  showLineNumbers?: boolean;
}

export interface StyledTooltipProps {
  success?: boolean;
}
