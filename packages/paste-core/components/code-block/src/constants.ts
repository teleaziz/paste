export enum CodeBlockVariant {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum CodeBlockLanguage {
  JAVASCRIPT = 'javascript',
  CSHARP = 'csharp',
  PHP = 'php',
  RUBY = 'ruby',
  PYTHON = 'python',
  JAVA = 'java',
  JSON = 'json',
  C = 'c',
  BASH = 'bash',
  SHELL = 'shell-session',
  GO = 'go',
  GROOVY = 'groovy',
}

const niceNameMap = {
  [CodeBlockLanguage.JAVASCRIPT]: 'JavaScript',
  [CodeBlockLanguage.CSHARP]: 'C#',
  [CodeBlockLanguage.PHP]: 'PHP',
  [CodeBlockLanguage.RUBY]: 'Ruby',
  [CodeBlockLanguage.PYTHON]: 'Python',
  [CodeBlockLanguage.JAVA]: 'Java',
  [CodeBlockLanguage.JSON]: 'JSON',
  [CodeBlockLanguage.C]: 'C',
  [CodeBlockLanguage.BASH]: 'Bash',
  [CodeBlockLanguage.SHELL]: 'Shell',
  [CodeBlockLanguage.GO]: 'Go',
  [CodeBlockLanguage.GROOVY]: 'Groovy',
};

export const getLanguageNiceName = (language: `${CodeBlockLanguage}`): string => {
  return niceNameMap[language];
};
