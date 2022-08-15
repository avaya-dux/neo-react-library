import { mount } from "cypress/react";

// copy-pasted from:
// https://github.com/cypress-io/cypress-component-testing-apps/blob/main/react-vite-ts/cypress.d.ts
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add("mount", mount);
