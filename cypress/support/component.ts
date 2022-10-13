import { mount } from "cypress/react";

// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import "./commands";
import "@avaya/neo/neo/dist/css/neo/neo.min.css";
import "cypress-real-events/support";

// HACK: from `cypress-io` issue: https://github.com/cypress-io/cypress/issues/21434
global.process = global.process || {};
global.process.env = global.process.env || {};

Cypress.Commands.add("mount", mount);
