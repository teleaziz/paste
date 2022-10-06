import * as React from 'react';
import {Box} from '@twilio-paste/box';
import {useTheme} from '@twilio-paste/theme';
import {Codeblock} from './codeblock';
import {format as prettyFormat} from 'pretty-format';

export const ThemeObjectDisplay: React.FC = () => {
  const theme = useTheme();
  const themeKeys = Object.keys(theme);
  const reducedTheme: {[key: string]: unknown} = {};
  for (const key of themeKeys) {
    reducedTheme[key] = {};
  }
  return (
    <Box as="pre" marginBottom="space70">
      <Codeblock>{prettyFormat(reducedTheme)}</Codeblock>
    </Box>
  );
};
