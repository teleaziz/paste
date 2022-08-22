import {
  getPackageNameFromPath,
  getPackagePaths,
  getPackJsonsFromFiles,
  getPublicPackageFilesFromFiles,
  getPublicPackages,
  getUnpublishedPackageNames,
} from './utils';
// you kind of have to treat Danger plugins as global?
// https://danger.systems/js/usage/extending-danger.html#writing-your-plugin
import {DangerDSLType} from 'danger/distribution/dsl/DangerDSL';
import {JSONDiffValue} from 'danger/distribution/dsl/GitDSL';
import {PackageShape} from '../tools/utils/getRepoPackages';
declare const danger: DangerDSLType;
export declare function fail(message: string): void;

const getPeerDepDiff = async (filePath: string) => {
  const {peerDependencies} = await danger.git.JSONDiffForFile(filePath);
  return peerDependencies;
};

export const getPeerDepsDiffFromPackages = async (packageJsons: string[], publicPackages: PackageShape[]) => {
  let peerDepDiffs: Record<string, JSONDiffValue> = {};
  for (const file of packageJsons) {
    const peerDiff = await getPeerDepDiff(file);
    const newDiff = {
      [getPackageNameFromPath(file, publicPackages)]: peerDiff,
    };
    peerDepDiffs = {...peerDepDiffs, ...newDiff};
  }
  return peerDepDiffs;
};

export const getPackagesWithNewInternalPeerDeps = (depDiffs: Record<string, JSONDiffValue>) => {
  // console.log(depDiffs);
};

export const getPackagesWithNewExternalPeerDeps = (depDiffs: Record<string, JSONDiffValue>) => {
  Object.entries(depDiffs).map((diff) => console.log(diff[1].added));
};

/**
 * This is a Danger plugin that checks that you have marked peer dependency changes correctly
 * 1. New internal peer dependency = major new version of package, minor version of core
 * 2. New external peer dependency = major new version of package, major version of core
 * 3. New external peer dependency = new external peer dep added to Core
 * 2. Peer dependency major version update = major new version of package, minor version of core.
 */
export default async (packageList: PackageShape[]) => {
  const publicPackages = getPublicPackages(packageList);
  const publicPackagePaths = getPackagePaths(publicPackages);

  // package.json related files
  const packageJSONsChanged = getPackJsonsFromFiles([...danger.git.modified_files, ...danger.git.created_files]);

  /** Modified files that belong to public packages */
  const modifiedPublicPackageJsonFiles = getPublicPackageFilesFromFiles(packageJSONsChanged, publicPackagePaths);

  // get names of packages that have had their package.json files touched
  const packagesChanged = getUnpublishedPackageNames(modifiedPublicPackageJsonFiles, publicPackages);

  // grab all the peer dep diffs from each package.json file
  const packagePeerDepDiffs = await getPeerDepsDiffFromPackages(modifiedPublicPackageJsonFiles, publicPackages);

  const packagesWithNewInternalPeerDeps = getPackagesWithNewInternalPeerDeps(packagePeerDepDiffs);
  const packagesWithNewExternalPeerDeps = getPackagesWithNewExternalPeerDeps(packagePeerDepDiffs);

  /**
   * Warn when user potentially forgets to update lockfile
   */
  if (packageJSONsChanged.length > 0) {
    const message = 'Changes were made to package.json, but not to yarn.lock';
    const idea = 'Perhaps you need to run `yarn install`?';
    fail(`${message} - <i>${idea}</i>`);
  }
};
