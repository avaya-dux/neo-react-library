# how to dev

> Scaffolded via [Vite](https://vitejs.dev/).

> For unit testing we use [Vitest](https://vitest.dev/), for integration testing we use [Cypress](https://www.cypress.io/how-it-works), for linting we use [ESLint](https://eslint.org/) and for code consistency we use [Prettier](https://prettier.io/).

> You can see an overview of [the libraries structure here](https://app.codesee.io/maps/public/fe362a60-1da7-11ed-8a0e-8356adbc562c). Generated via [CodeSee](https://www.codesee.io/).

## first steps

- use [NodeJS LTS](https://nodejs.org/) (preferably via nvm, [mac nvm](https://tecadmin.net/install-nvm-macos-with-homebrew/) | [windows nvm](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows))
- run `npm install -g yarn`
- run `yarn all`, which will install all dependancies, run linting, build the project, and run jest+cypress tests
- to see existing components, run `yarn storybook`, else you can the section "development linking"

## development linking

To run a project which consumes this project while it is running in development mode, you need to create a symlink in your consuming project.

Yarn provides a convenient way to do this:

```bash
# register neo-react in the global space
cd ~/dev/neo-react-library
yarn link

# go to your consuming project directory
cd ~/dev/other-project

# create the symlink
yarn link @avaya/neo-react
```

After you have completed your work, you should "unlink" to ensure that your environment is clean.

```bash
# remove the link from your project
cd ~/dev/other-project
yarn unlink @avaya/neo-react

# re-pull data from NPM
yarn install --force

# unlink neo-react from the global space
cd ~/dev/neo-react-library
yarn unlink
```

### Vite note

If you are using Vite in your project, you must add neo-react to your [optimized deps](https://vitejs.dev/config/dep-optimization-options.html#optimizedeps-exclude):
```javascript
export default defineConfig({
  plugins: [react()],
  ...
  optimizeDeps: {
    exclude: ["@avaya/neo-react"],
  },
});
```

This is due to how Vite optomizes dependancies. It simply doesn't view code in `node_modules` unless explicitely told to. You can read more about the [how and why here](https://vitejs.dev/guide/dep-pre-bundling.html#monorepos-and-linked-dependencies).

## to build a production version of the library

```
yarn build
```

## run storybook

```
yarn storybook
```

## testing commands

Run tests

```
yarn test
```

Run tests in watch mode

```
yarn test:watch
```

Run, in watch mode, tests that match a certain name pattern, e.g. below command runs only Checkbox related tests
Note: if vitest does not pick up changes in source files, press 'f' or 'a' to force it to run immediately.

```
yarn test:watch Checkbox
```

Run cypress tests

```
yarn test:cypress
```

Open cypress tests in browser

```
yarn test:cypress-open
```

Run jest tests and display the code coverage results
TODO: need to filter out stories and `index.*` files

```
yarn test:coverage
```

Use VS Code's debugger tool to debug tests or a single test. See "Debug CRA Tests" or "Debug Specific Test" in the debugger dropdown.

[See here for the full description](https://jestjs.io/docs/en/troubleshooting) of how to debug in Chrome and/or VS Code.

## linting

```
yarn lint
```

```
yarn lint --fix
```

## before commiting to this repo, please read

- our [accessibility guidelines](./accessibility-guidelines.md)
- our [coding guidelines](./coding-guidelines.md)
- and the team's [PR best practices](./pr-best-practices.md)

## publishing this repo

see [how to publish readme](./how-to-publish.md)
