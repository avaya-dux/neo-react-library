import toDiffableHtml from "diffable-html";
import type { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

export const elementToStaticHtml = (element: ReactElement) => {
	return toDiffableHtml(renderToStaticMarkup(element)).trim();
};
