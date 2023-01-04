import { RenderResult } from "@testing-library/react";

type Queries = typeof import("@testing-library/dom/types/queries");

export type RenderResultType = RenderResult<Queries, HTMLElement, HTMLElement>;
