import { useMemo } from "react";
import { type ExternalLabelProps, Label } from "./Label";

export const useLabel = (
	label: string | ExternalLabelProps,
	htmlFor: string,
) => {
	const labelProps = useMemo(() => {
		if (typeof label === "string") {
			return {
				text: label,
				htmlFor,
			};
		}
		return { ...label, htmlFor };
	}, [label, htmlFor]);
	return useMemo(() => <Label {...labelProps} />, [labelProps]);
};
