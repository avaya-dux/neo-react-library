# how to dev

> Scaffolded via [create-react-library](https://github.com/transitive-bullshit/create-react-library) (with TypeScript support) and then modified to simplify the build process with [rollupjs](https://www.rollupjs.org/).

> For unit testing we use [jest](https://jestjs.io/), for integration testing we use [Cypress](https://www.cypress.io/how-it-works), for linting we use [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/).

> You can see an overview of [the libraries structure here](https://app.codesee.io/maps/public/188812a0-d098-11ec-bea5-0157c94ef4f8). Generated via [CodeSee](https://www.codesee.io/).

## first steps

- use [NodeJS LTS](https://nodejs.org/) (preferably via nvm, [mac nvm](https://tecadmin.net/install-nvm-macos-with-homebrew/) | [windows nvm](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows))
- run `npm install -g yarn`
- run `yarn all`, which will install all dependancies, run linting, build the project, and run jest+cypress tests
- to see existing components, run `yarn storybook`, else you can the section "development linking"

## development linking

To run a project which consumes this project while it is running in development mode, you need to create a symlink in your consuming project.

Yarn provides a convenient way to do this:

```bash
# register this project
yarn link

# now go to your consuming project directory
cd ~/other-project

# create the symlink to your local development package (note, you MUST use `yarn`, NOT `npm`)
yarn link @avaya/neo-react
```
## to build a production version of the library

```
yarn build
```

## to run in 'develop' mode with hot module reloading

This will run in watch mode and produce builds to `dist`.

```
yarn start
```

## run storybook

```
yarn storybook
```

## testing commands

Run jest tests

```
yarn test
```

Run jest tests and watch for new tests

```
yarn test:watch
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
