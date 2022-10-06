import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {Theme, useTheme} from '../src';

const HookExampleComponent = (): React.ReactElement => {
  const theme = useTheme();
  return <p>{theme.textColors.colorText}</p>;
};

describe('useTheme', () => {
  it('should be able to access the theme object', () => {
    render(
      <Theme.Provider theme="default">
        <HookExampleComponent />
      </Theme.Provider>
    );

    expect(screen.getByText('rgb(18, 28, 45)')).toBeDefined();
  });
});
