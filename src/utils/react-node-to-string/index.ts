// mostly copy-pasted from: https://github.com/sunknudsen/react-node-to-string

import type React from "react";
import { isValidElement } from "react";

export const reactNodeToString = (reactNode: React.ReactNode): string => {
	let string = "";
	if (typeof reactNode === "string") {
		string = reactNode;
	} else if (typeof reactNode === "number") {
		string = reactNode.toString();
	} else if (Array.isArray(reactNode)) {
		reactNode.forEach((child) => {
			string += reactNodeToString(child);
		});
	} else if (isValidElement(reactNode)) {
		string += reactNodeToString(reactNode.props.children);
	}
	return string;
};
