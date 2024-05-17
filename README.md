[![Netlify Status](https://api.netlify.com/api/v1/badges/825502d6-02db-45a6-88bc-6aed064eb748/deploy-status)](https://app.netlify.com/sites/neo-react-library-storybook/deploys)
![github workflow status](https://github.com/avaya-dux/neo-react-library/actions/workflows/run-yarn.yml/badge.svg)
[![npm version](https://badge.fury.io/js/@avaya%2Fneo-react.svg)](https://badge.fury.io/js/@avaya%2Fneo-react)

<!-- ![Coverage lines](https://github.com/avaya-dux/neo-react-library/blob/main/badges/badge-lines.svg)
![Coverage functions](https://github.com/avaya-dux/neo-react-library/blob/main/badges/badge-functions.svg)
![Coverage branches](https://github.com/avaya-dux/neo-react-library/blob/main/badges/badge-branches.svg)
![Coverage statements](https://github.com/avaya-dux/neo-react-library/blob/main/badges/badge-statements.svg) -->

![code-coverage](https://img.shields.io/endpoint?url=https://gist.github.com/joe-s-avaya/e90dadd4c95bbcf46094100f6591134e#file-jest-coverage-comment__main-json)

# Neo React Component Library

> This is the react version of the shared library called "NEO" buit by Avaya ([storybook site](https://neo-react-library-storybook.netlify.app/))

## Install

```bash
npm i @avaya/neo-react
```

```bash
yarn add @avaya/neo-react
```

```bash
pnpm add @avaya/neo-react
```

## Example Usage

At the root of your application, import the CSS styles via:

```javascript
import "@avaya/neo-react/avaya-neo-react.css";
```

Then, simply import the component(s) that you'd like to use, see [the documentation site](https://design.avayacloud.com/components/web) for more examples.

```tsx
import { IconNamesType, NoContent } from "@avaya/neo-react";

export const Example = () => {
  const agentIconName: IconNamesType = "agent";
  return <NoContent icon={agentIconName} text={"Agent has no content"} />;
};
```

NOTE: if you are using [Astro](https://astro.build/), add the following to your `astro.config.mjs` ([link to Astro docs on "why" to do this](https://docs.astro.build/en/guides/styling/#import-a-stylesheet-from-an-npm-package)):

```javascript
export default defineConfig({
  vite: {
    ssr: {
      noExternal: ["avaya-neo-react"],
    },
  },
});
```

**NOTE**: The Neo CSS Library is included with the Neo React Library. If you install the Neo React Library, you _do not_ need to install or import from the CSS Library.

## Project Recommendations

### [Vite w/ TS](https://vitejs.dev/guide/)

This team has experience building projects (both apps and libraries) using [CRA (create-react-app)](https://create-react-app.dev/), [Vite](https://vitejs.dev/), [Webpack](https://webpack.js.org/), [Parcel](https://parceljs.org/), and [Rollup](https://www.rollupjs.org/guide/en/). Of those, we recommend using Vite to build out brand new projects. Vite has shown itself to be not only a faster build tool, but also to be a better DX (Developer eXperience) due to its excellent documentation and intelligent defaults. [See this article](https://blog.logrocket.com/vite-3-vs-create-react-app-comparison-migration-guide/) for some further details on those points.

Example app creation with Vite using React+TS: `pnpm create vite my-react-ts-app --template react-ts`

This team also has experience building projects with the package managers NPM, [Yarn (classic)](https://classic.yarnpkg.com/lang/en/docs/install/), and [PNPM](https://pnpm.io/installation). Of the three, we have had good experiences with both Yarn (classic) and PNPM and recommend either of those.

## Adding to this library

If you would like to contribute to this project, you can start in our [how to dev doc](https://github.com/avaya-dux/neo-react-library/blob/main/readmes/how-to-dev.md)

## other readme files

- [accessibility guidelines](https://github.com/avaya-dux/neo-react-library/blob/main/readmes/accessibility-guidelines.md)
- [coding guidelines](https://github.com/avaya-dux/neo-react-library/blob/main/readmes/coding-guidelines.md)
- [how to dev](https://github.com/avaya-dux/neo-react-library/blob/main/readmes/how-to-dev.md)
- [how to publish](https://github.com/avaya-dux/neo-react-library/blob/main/readmes/how-to-publish.md)
- [periphery tech](https://github.com/avaya-dux/neo-react-library/blob/main/readmes/periphery-tech.md)
- [pr best practices](https://github.com/avaya-dux/neo-react-library/blob/main/readmes/pr-best-practices.md)

## License

Copyright 2020-2024 Avaya Inc. All Rights Reserved.
