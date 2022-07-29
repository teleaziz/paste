import * as React from 'react';
import {CodeBlock} from '../src';


// eslint-disable-next-line import/no-default-export
export default {
  title: 'Components/Code Block',
  component: CodeBlock,
};

export const Default = (): React.ReactNode => {
  return (
    <CodeBlock>
      Initial story
    </CodeBlock>
  );
};
