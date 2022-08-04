// import {themeGet} from '@styled-system/theme-get'; // kept in case new import didn't work
import {Tab, TabList} from 'reakit/Tab';
// import {Tooltip, TooltipArrow} from 'reakit/Tooltip'; //og import statement
import {TooltipArrow} from 'reakit/Tooltip';
// import styled, { css } from "styled-components"; // kept in case new import didn't work
import {styled, themeGet, css} from '@twilio-paste/styling-library';
import {variant, compose, space, color, system} from 'styled-system';
import type {BoxProps} from '@twilio-paste/box';

// import { StyledIcon } from "@twilio-labs/match-primitives";
const iconSize = system({
  size: {
    properties: ['width', 'height'],
    scale: 'iconSizes',
  },
});
const StyledIcon = styled.span<BoxProps>`
  display: inline-flex;
  line-height: 1;
  vertical-align: middle;
  ${compose(color, space, iconSize)}
`;

import {CodeBlockVariant, CodeBlockLanguage} from './constants';
// import type {StyledSnippetProps, StyledSnippetGroupProps, StyledTooltipProps} from './types'; // og import statement
import type {StyledSnippetProps} from './types';

export const StyledHighlighter = styled.div<StyledSnippetProps>`
  overflow-x: auto;
  scrollbar-width: thin;
  &:focus {
    outline-width: 2px;
    outline-style: solid;
    outline-color: ${themeGet('colors.blue60')};
  }
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-style: solid;
    border-width: 3px;
    border-radius: ${themeGet('radii.base')};
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
  }
  pre {
    margin: 0;
    padding: ${themeGet('space.scale100')} ${themeGet('space.scale60')};
    padding-left: ${({showLineNumbers, isSingleLine}) =>
      // cannot resolve theme.space error. Need to have parameter's type change to styled-systems theme type.
      // !isSingleLine && !showLineNumbers && `calc(${theme.space.scale260} - ${theme.space.scale7})`};
      !isSingleLine && !showLineNumbers && `space40`};
  }
  // @ ts-ignore don't know type
  ${({maxLines}) =>
    /* max-height: calc(${maxLines}em * ${themeGet('lineHeights.scale180')} + ${themeGet('space.scale100')}); */
    maxLines &&
    css`
      max-height: 'size20'; // took real calc out of css and replaced with constant to get things moving
    `}
  ${() =>
    variant({
      variants: {
        [CodeBlockVariant.DARK]: {
          // cannot resolve theme.color error. Replaced to get things moving
          // scrollbarColor: `${theme.colors.gray70} transparent`,
          scrollbarColor: `gray70 transparent`,
          ['::-webkit-scrollbar-thumb']: {
            borderColor: 'gray70',
          },
          ['span.linenumber']: {
            color: 'gray40',
          },
        },
        [CodeBlockVariant.LIGHT]: {
          // cannot resolve theme.color error. Replaced to get things moving
          // scrollbarColor: `${theme.colors.gray20} transparent`,
          scrollbarColor: `gray20 transparent`,
          ['::-webkit-scrollbar-thumb']: {
            borderColor: 'gray20',
          },
          ['span.linenumber']: {
            color: 'gray80',
          },
        },
      },
    })}
  ${({language}) => {
    switch (language) {
      case CodeBlockLanguage.BASH:
      case CodeBlockLanguage.SHELL:
        return variant({
          variants: {
            [CodeBlockVariant.DARK]: {
              ['.shell-symbol, .info']: {
                color: 'gray40',
              },
              ['.builtin, .function']: {
                color: 'blue30',
              },
            },
            [CodeBlockVariant.LIGHT]: {
              ['.shell-symbol, .info']: {
                color: 'gray80',
              },
              ['.builtin, .function']: {
                color: 'blue60',
              },
            },
          },
        });
      case CodeBlockLanguage.CSHARP:
        return variant({
          variants: {
            [CodeBlockVariant.DARK]: {
              ['.comment, .prolog']: {
                color: '#B8EBA4', // pastel green
              },
              ['.punctuation, .operator, .entity, .namespace, .attr-value, .attr-equals']: {
                color: 'gray40',
              },
              ['.property, .tag, .boolean, .number, .constant, .symbol, .inserted, .unit']: {
                color: '#92F6FF', // seafoam
              },
              ['.selector, .attr-name, .string, .char, .builtin, .deleted, .atrule']: {
                color: 'orange50',
              },
              ['.rule, .module, .control-flow']: {
                color: 'purple30',
              },
              ['.url, .constant, .class-name']: {
                color: 'green40',
              },
              ['.function']: {
                color: 'yellow40',
              },
              ['.regex']: {
                color: 'red40',
              },
              ['.doctype, .doctype-tag, .name, .operator.arrow, .keyword, .important, .entity']: {
                color: 'blue30',
              },
            },
            [CodeBlockVariant.LIGHT]: {
              ['.comment, .prolog']: {
                color: 'green90',
              },
              ['.punctuation, .operator, .entity, .namespace, .attr-value, .attr-equals']: {
                color: 'blue90',
              },
              ['.property, .tag, .boolean, .number, .constant, .symbol, .inserted, .unit']: {
                color: 'purple80',
              },
              ['.selector, .attr-name, .string, .char, .builtin, .deleted, .atrule']: {
                color: 'orange80',
              },
              ['.rule, .module, .control-flow']: {
                color: 'purple60',
              },
              ['.url, .constant, .class-name']: {
                color: 'green70',
              },
              ['.function']: {
                color: 'yellow80',
              },
              ['.regex']: {
                color: 'red60',
              },
              ['.doctype, .doctype-tag, .name, .operator.arrow, .keyword, .important, .entity']: {
                color: 'blue60',
              },
            },
          },
        });
      default:
        return variant({
          variants: {
            [CodeBlockVariant.DARK]: {
              ['.comment, .prolog, .doctype, .cdata']: {
                color: 'gray40',
              },
              ['.punctuation, .operator']: {
                color: 'blue30',
              },
              ['.property, .tag, .symbol, .keyword, .deleted']: {
                color: 'red40',
              },
              ['.boolean, .constant, .number']: {
                color: 'purple30',
              },
              ['.selector, .attr-name, .string, .char, .builtin, .inserted']: {
                color: 'yellow40',
              },
              ['.atrule, .attr-value, .function, .class-name']: {
                color: 'green40',
              },
              ['.regex, .important']: {
                color: 'orange50',
              },
            },
            [CodeBlockVariant.LIGHT]: {
              ['.comment, .prolog, .doctype, .cdata']: {
                color: 'gray80',
              },
              ['.punctuation, .operator']: {
                color: 'blue90',
              },
              ['.property, .tag, .symbol, .keyword, .deleted']: {
                color: 'red60',
              },
              ['.boolean, .constant, .number']: {
                color: 'purple60',
              },
              ['.selector, .attr-name, .string, .char, .builtin, .inserted']: {
                color: 'yellow80',
              },
              ['.atrule, .attr-value, .function, .class-name']: {
                color: 'green70',
              },
              ['.regex, .important']: {
                color: 'orange80',
              },
            },
          },
        });
    }
  }}
`;

export const StyledTooltipArrow = styled(TooltipArrow)`
  line-height: 1;
  .fill {
    fill: ${themeGet('colors.blue60')};
  }
`;

// Need more help with this Tooltip and the types in it
//
// export const StyledTooltip = styled('Tooltip').withConfig({
//   shouldForwardProp: (prop: string) => !['success'].includes(prop),
// })<StyledTooltipProps>`
//   padding: ${themeGet('space.scale7')} ${themeGet('space.scale20')};
//   color: ${themeGet('colors.white')};
//   font-weight: ${themeGet('fontWeights.light')};
//   font-size: ${themeGet('fontSizes.scale60')};
//   font-family: ${themeGet('fontFamilies.text')};
//   background: ${themeGet('colors.blue60')};
//   border-radius: ${themeGet('radii.small')};
//   // @ts-ignore not sure what type it should be
//   ${({success}) =>
//     success &&
//     css`
//       color: ${themeGet('colors.gray100')};
//       background: ${themeGet('colors.green40')};
//       ${StyledTooltipArrow} .fill {
//         fill: ${themeGet('colors.green40')};
//       }
//     `}
// `;

export const StyledSnippetHeader = styled.div<StyledSnippetProps>`
  display: grid;
  grid-column-gap: ${themeGet('space.scale140')};
  align-items: center;
  border-top-left-radius: ${themeGet('radii.base')};
  border-top-right-radius: ${themeGet('radii.base')};
  ${variant({
    variants: {
      [CodeBlockVariant.DARK]: {
        color: 'gray40',
        backgroundColor: 'gray100',
      },
      [CodeBlockVariant.LIGHT]: {
        color: 'gray80',
        backgroundColor: 'gray20',
      },
    },
  })}
`;

export const StyledSnippetActions = styled.div<StyledSnippetProps>`
  display: flex;
  align-items: center;
  padding-right: ${themeGet('space.scale180')};
  column-gap: ${themeGet('space.scale180')};
  a,
  button {
    padding: 0;
    color: inherit;
    line-height: 1;
    background: none;
    border: none;
    cursor: pointer;
    &:focus {
      outline-width: 2px;
      outline-style: solid;
      outline-color: ${themeGet('colors.blue60')};
      outline-offset: 2px;
      -moz-outline-radius: 4px;
    }
  }
  ${variant({
    variants: {
      [CodeBlockVariant.DARK]: {
        color: 'gray10',
      },
      [CodeBlockVariant.LIGHT]: {
        color: 'gray80',
      },
    },
  })}
`;

export const StyledSnippetTitle = styled.div`
  font-weight: ${themeGet('fontWeights.medium')};
  font-size: ${themeGet('fontSizes.scale80')};
  line-height: ${themeGet('lineHeights.scale180')};
`;

export const StyledSnippetBody = styled.div<StyledSnippetProps>`
  padding: ${themeGet('space.scale7')};
  overflow: hidden;
  font-weight: ${themeGet('fontWeights.regular')};
  font-size: ${themeGet('fontSizes.scale80')};
  line-height: ${themeGet('lineHeights.scale180')};
  .linenumber {
    margin-right: ${themeGet('space.scale260')};
  }
  code {
    font-family: ${themeGet('fontFamilies.code')};
  }
  ${({isSingleLine}) =>
    isSingleLine &&
    // Removed from css and commented out to keep things moving
    // padding: ${themeGet('space.scale7')} ${themeGet('space.scale100')};
    // ${StyledHighlighter} pre {
    //   padding: ${themeGet('space.scale20')} 0;
    // }
    // /* stylelint-disable-next-line a11y/media-prefers-reduced-motion -- animation is minimal */
    // &::before,
    // &::after {
    //   position: absolute;
    //   top: ${themeGet('space.scale60')};
    //   bottom: ${themeGet('space.scale60')};
    //   width: 10%;
    //   transition: opacity linear 0.15s;
    //   content: '';
    //   pointer-events: none;
    // }
    // &::before {
    //   left: ${themeGet('space.scale100')};
    // }
    // &::after {
    //   right: ${themeGet('space.scale100')};
    // }
    css`
      position: relative;
      &[data-scroll-x='0']::before {
        opacity: 0;
      }
      &[data-scroll-x='100']::after {
        opacity: 0;
      }
    `}
  ${({isSingleLine}) =>
    isSingleLine &&
    compose(
      variant({
        variants: {
          // replaced all the grays here with strings instead of calls to theme
          [CodeBlockVariant.DARK]: {
            ['::before']: {
              background: `linear-gradient(
                to right,
                gray90 0%,
                rgba(31, 48, 76, 0) 100%
              )`,
            },
            ['::after']: {
              background: `linear-gradient(
                to left,
                gray90 0%,
                rgba(31, 48, 76, 0) 100%
              )`,
            },
          },
          [CodeBlockVariant.LIGHT]: {
            ['::before']: {
              background: `linear-gradient(
                to right,
                gray10 0%,
                rgba(244,244,246,0) 100%
              )`,
            },
            ['::after']: {
              background: `linear-gradient(
                to left,
                gray10 0%,
                rgba(244,244,246,0) 100%
              )`,
            },
          },
        },
      })
    )}
`;

export const StyledSnippet = styled.div<StyledSnippetProps>`
  border-radius: ${themeGet('radii.base')};
  ${StyledSnippetHeader} {
    grid-template-columns: auto min-content;
  }
  ${StyledSnippetTitle} {
    padding: ${themeGet('space.scale100')} 0;
    padding-left: ${themeGet('space.scale260')};
  }
  ${({isSingleLine}) =>
    isSingleLine &&
    css`
      display: grid;
      grid-template-columns: auto min-content;
    `}
  ${compose(
    space,
    variant({
      variants: {
        [CodeBlockVariant.LIGHT]: {
          color: 'gray100',
          backgroundColor: 'gray10',
        },
        [CodeBlockVariant.DARK]: {
          color: 'white',
          backgroundColor: 'gray90',
        },
      },
    })
  )}
`;

export const StyledTab = styled(Tab)`
  padding: ${themeGet('space.scale20')};
  font-weight: ${themeGet('fontWeights.medium')};
  font-size: ${themeGet('fontSizes.scale80')};
  font-family: inherit;
  letter-spacing: 0.01rem;
  background-color: transparent;
  border: 0;
  border-radius: ${themeGet('radii.base')};
  cursor: pointer;
  &[aria-selected='true'] {
    font-weight: ${themeGet('fontWeights.semibold')};
    letter-spacing: 0;
  }
  &:focus {
    outline-width: 2px;
    outline-style: solid;
    outline-color: ${themeGet('colors.blue60')};
    outline-offset: 2px;
    -moz-outline-radius: 4px;
  }
`;

export const StyledTabList = styled(TabList)`
  display: flex;
  gap: ${themeGet('space.scale180')};
  padding: ${themeGet('space.scale60')} ${themeGet('space.scale180')};
`;

export const StyledSnippetSelect = styled.div`
  position: relative;
  ${StyledIcon} {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    pointer-events: none;
  }
  select {
    display: block;
    padding-right: ${themeGet('space.scale100')};
    color: inherit;
    font-size: ${themeGet('fontSizes.scale80')};
    white-space: nowrap;
    text-align: right;
    background: transparent;
    border: 0;
    cursor: pointer;
    appearance: none;
    &:focus {
      outline-width: 2px;
      outline-style: solid;
      outline-color: ${themeGet('colors.blue60')};
      outline-offset: 2px;
      -moz-outline-radius: 4px;
    }
  }
  option {
    color: initial;
  }
`;

// Not using Snippet group yet to keep things moving
//
// export const StyledSnippetGroup = styled.div<StyledSnippetGroupProps>`
//   ${StyledSnippet} {
//     border-top-left-radius: 0;
//     border-top-right-radius: 0;
//   }
//   ${StyledSnippetHeader} {
//     grid-template-columns: auto min-content min-content;
//   }
//   ${StyledTabList} {
//     display: none;
//   }
//   ${StyledSnippetTitle} {
//     padding: ${themeGet('space.scale140')} 0;
//     padding-left: ${themeGet('space.scale180')};
//   }
//   ${({compact}) =>
//     !compact &&
//     css`
//       @media ${'themeGet('mediaQueries.medium')'} {
//         ${StyledSnippetHeader} {
//           grid-template-columns: auto min-content;
//         }
//         ${StyledSnippetTitle} {
//           padding: ${themeGet('space.scale100')} 0;
//           padding-left: ${themeGet('space.scale260')};
//           line-height: ${themeGet('lineHeights.scale140')};
//         }
//         /* stylelint-disable-next-line no-duplicate-selectors -- intentionally overridden */
//         ${StyledSnippetTitle} {
//           grid-column-end: span 2;
//           border-style: solid;
//           border-width: 0;
//           border-bottom-width: ${themeGet('borderWidths.thin')};
//         }
//         ${StyledTabList} {
//           display: flex;
//         }
//         ${StyledSnippetSelect} {
//           display: none;
//         }
//       }
//     `}
//   ${({compact, hasTitle}) =>
//     compact &&
//     !hasTitle &&
//     css`
//       /* stylelint-disable-next-line no-duplicate-selectors -- intentionally overridden */
//       ${StyledSnippetHeader} {
//         grid-template-columns: min-content min-content;
//         justify-content: space-between;
//         padding: ${themeGet('space.scale100')} 0;
//         padding-left: ${themeGet('space.scale260')};
//       }
//     `}
//   ${compose(
//     space,
//     variant({
//       variants: {
//         [CodeBlockVariant.DARK]: {
//           [StyledSnippetTitle]: {
//             borderColor: 'gray80',
//           },
//           [StyledSnippetSelect]: {
//             color: 'blue30',
//           },
//           [StyledTab]: {
//             color: 'white',
//             ['&[aria-selected=true]']: {
//               color: 'blue30',
//               backgroundColor: 'gray90',
//             },
//           },
//         },
//         [CodeBlockVariant.LIGHT]: {
//           [StyledSnippetTitle]: {
//             borderColor: 'white',
//           },
//           [StyledSnippetSelect]: {
//             color: 'gray100',
//           },
//           [StyledTab]: {
//             color: 'gray100',
//             ['&[aria-selected=true]']: {
//               backgroundColor: 'white',
//             },
//           },
//         },
//       },
//     })
//   )}
// `;
