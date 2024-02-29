# Publishing

Publishing is automatically done when a new version is updated in `main`. This is automated via the [publish-lib.yml](../.github/workflows/publish-lib.yml) file.

It is still a manual process to add the release note to GitHub, see these steps once the automated release has completed:

- navigate to our [GitHub releases page](https://github.com/avaya-dux/neo-react-library/releases)
- click: "Draft a new release" (top right corner)
- choose tag (or create a new tag on publish), using format `vX.X.X`
- target `main` branch
- add title using format: "v0.2.0 (Jan 18th 2022)"
- click: "Auto-generate release notes"
- attach the binary generated from `yarn all` (tgz file)
- click: "Publish release"
- create a PR and bump package.json version

## how to manually publish

If you need to manually publish (to test functionality for example), you can do so by following these steps:

From the root of the directory:

- `npm login`: to ensure that you are properly logged in to the NPM network
- `yarn all`: this will clean out all build artifacts, rebuild everything, run all tests, and "pack" the tarball if everything was successful
- `yarn publish`: publishes the generated tarball to our registry
- - note: At "new version" prompt, type in current version.
- - note: to skip the "version" prompt, you can use: `yarn publish --new-version <version to publish>`

You can check that the package was properly published by viewing it on NPMJS

- [link to registry](https://registry.npmjs.org/@avaya%2fneo-react): api call, returns JSON, no cache
- [link to npmjs page](https://www.npmjs.com/package/@avaya/neo-react): our page on NPMJS, is on a 60min cache

If you made a mistake, you can simply `unpublish` the package via

- `npm unpublish @avaya/neo-react@<version>`
- - [see NPMJS docs](https://docs.npmjs.com/cli/v8/commands/npm-unpublish) for further details on unpublishing
