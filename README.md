[![Netlify Status](https://api.netlify.com/api/v1/badges/d59de19f-79ec-4c57-8282-cd07357a66cc/deploy-status)](https://app.netlify.com/sites/neo-react-library-storybook/deploys)
![github workflow status](https://github.com/avaya-dux/neo-react-library/actions/workflows/run-yarn.yml/badge.svg)
[![npm version](https://badge.fury.io/js/@avaya%2Fneo-react.svg)](https://badge.fury.io/js/@avaya%2Fneo-react)

![Coverage lines](https://github.com/avaya-dux/neo-react-library/blob/main/badges/badge-lines.svg)
![Coverage functions](https://github.com/avaya-dux/neo-react-library/blob/main/badges/badge-functions.svg)
![Coverage branches](https://github.com/avaya-dux/neo-react-library/blob/main/badges/badge-branches.svg)
![Coverage statements](https://github.com/avaya-dux/neo-react-library/blob/main/badges/badge-statements.svg)

# Neo React Component Library

> This is the react version of the shared library called "NEO" buit by Avaya ([storybook site](https://neo-react-library-storybook.netlify.app/))

## Install

```bash
npm i @avaya/neo-react
```

or

```bash
yarn add @avaya/neo-react
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

Copyright 2020-2022 Avaya Inc. All Rights Reserved.
