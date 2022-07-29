import * as React from 'react';
import {render} from '@testing-library/react';
import {CodeBlock} from '../src';

describe('CodeBlock', () => {
  it('should render', () => {
    const {getByText} = render(<CodeBlock>test</CodeBlock>);
    expect(getByText('test')).toBeDefined();
  });
});
