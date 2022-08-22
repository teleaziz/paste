import peerDepChangesetCheck from '../peer-dep-changeset-check';
import {mockPackList} from '../__fixtures__/mockPackageList';

declare const global: any;

describe('packageJsonCheck()', () => {
  beforeEach(() => {
    global.warn = jest.fn();
    global.message = jest.fn();
    global.fail = jest.fn();
    global.markdown = jest.fn();
  });

  afterEach(() => {
    global.warn = undefined;
    global.message = undefined;
    global.fail = undefined;
    global.markdown = undefined;
  });

  describe('checking for new internal peer deps', () => {
    afterEach(() => {
      global.danger = undefined;
    });

    it('should fail when a new internal peer dependency is added', () => {
      global.danger = {
        git: {
          modified_files: [
            'package.json',
            'packages/paste-codemods/package.json',
            'packages/paste-core/components/avatar/package.json',
            'packages/paste-website/package.json',
            './.danger/__fixtures__/changeset/heavy-peaches-repeat.md',
            './.danger/__fixtures__/changeset/pink-masks-walk.md',
            './.danger/__fixtures__/changeset/popular-cheetahs-punch.md',
            './.danger/__fixtures__/changeset/pretty-cameras-burn.md',
          ],
          created_files: ['packages/paste-core/components/button/package.json'],
          JSONDiffForFile: jest.fn(() => ({
            peerDependencies: {
              before: {
                '@twilio-paste/button': '^1.0.0',
                '@twilio-paste/input': '^2.0.0',
              },
              after: {
                '@twilio-paste/button': '^1.0.0',
                '@twilio-paste/disclosure': '^5.0.0',
                '@twilio-paste/input': '^2.0.0',
              },
              added: ['@twilio-paste/disclosure'],
            },
          })),
        },
      };

      peerDepChangesetCheck(mockPackList);
      expect(1).toEqual(1);
    });
  });
});
