import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {Theme} from '../src';

const ThemeConsumerExampleComponent = (): React.ReactElement => {
  return <Theme.Consumer>{({theme}) => <p>{theme.textColors.colorText}</p>}</Theme.Consumer>;
};

describe('Theme.Consumer', () => {
  it('should be able to access the theme object', () => {
    render(
      <Theme.Provider theme="default">
        <ThemeConsumerExampleComponent />
      </Theme.Provider>
    );

    expect(screen.getByText('rgb(18, 28, 45)')).toBeDefined();
  });
});
