import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {Theme, withTheme} from '../src';
import type {ThemeShape} from '../src';

const MockComponent = ({theme}: {theme: ThemeShape}): React.ReactElement => <p>{theme.textColors.colorText}</p>;
const MockComponentWithTheme = withTheme(MockComponent);

describe('withTheme', () => {
  it('should be able to access the theme object', () => {
    render(
      <Theme.Provider theme="default">
        <MockComponentWithTheme />
      </Theme.Provider>
    );

    expect(screen.getByText('rgb(18, 28, 45)')).toBeDefined();
  });
});
