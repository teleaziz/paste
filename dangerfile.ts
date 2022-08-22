// https://danger.systems/js/reference.html
import packageJsonCheck from './.danger/package-json-check';
import missingChangesetsCheck from './.danger/missing-changesets-check';
import changesetsThatNeedCoreCheck from './.danger/changesets-that-need-core-check';
import majorCoreMissingUpgradeGuide from './.danger/major-core-missing-upgrade-guide';
import peerDepChangesetCheck from './.danger/peer-dep-changeset-check';
import {getRepoPackages} from './tools/utils/getRepoPackages';
import type {PackageShape} from './tools/utils/getRepoPackages';

// eslint-disable-next-line import/no-default-export
export default async (): Promise<void> => {
  // Get all the repo packages here and share it all around as it's async
  const packageList: PackageShape[] | null = await getRepoPackages();

  // Check package json file
  packageJsonCheck();

  // Check for packages that have missing changeset
  if (packageList) missingChangesetsCheck(packageList);

  // Check changesets that need core
  changesetsThatNeedCoreCheck();

  // Check that any major upgrades to core have an upgrade guide attached
  majorCoreMissingUpgradeGuide();

  // Check that when we touch peer deps on packages, we do it correctly
  peerDepChangesetCheck();
};
