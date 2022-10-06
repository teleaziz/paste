import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {Theme} from '../src';

const ThemeConsumerExampleComponent = (): React.ReactElement => {
  return (
    <Theme.Consumer>
      {({theme}) => <p>{theme.breakpoints.map((breakpoint: string) => `${breakpoint},`)}</p>}
    </Theme.Consumer>
  );
};

const ThemeConsumerExampleTextColor = (): React.ReactElement => {
  return <Theme.Consumer>{({theme}) => <p>Color: {theme.textColors.colorTextLink}</p>}</Theme.Consumer>;
};

describe('Theme.Provider', () => {
  it('should render without crashing', (): void => {
    render(<Theme.Provider>hello</Theme.Provider>);

    expect(screen.getByText('hello')).toBeDefined();
  });

  it('should render the sendgrid link text color', (): void => {
    render(
      <Theme.Provider theme="sendgrid">
        <ThemeConsumerExampleTextColor />
      </Theme.Provider>
    );

    expect(screen.getByText('Color: rgb(2, 99, 224)')).toBeDefined();
  });

  it('should rely on the default breakpoints set on the theme object', () => {
    render(
      <Theme.Provider theme="default">
        <ThemeConsumerExampleComponent />
      </Theme.Provider>
    );

    expect(screen.getByText('25rem,64rem,77rem,')).toBeDefined();
  });

  it('should set custom breakpoints when provided', () => {
    const customBreakpoints = ['30rem', '20rem', '90rem'];

    render(
      <Theme.Provider customBreakpoints={customBreakpoints}>
        <ThemeConsumerExampleComponent />
      </Theme.Provider>
    );

    expect(screen.getByText('30rem,20rem,90rem,')).toBeDefined();
  });
});
