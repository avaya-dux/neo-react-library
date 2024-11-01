// biome-ignore lint/correctness/noUnusedImports: unsure why we need to import React, but without it the types break
import React from "react";
import clsx from "clsx";

import type { Preview } from "@storybook/react";

import "@avaya/neo/neo/dist/css/neo/neo.min.css";
import "./preview.css";

const preview: Preview = {
	parameters: {
		backgrounds: { disable: true },
	},
	decorators: [
		(Story, context) => {
			const {
				globals: { mode, dir },
			} = context;

			return (
				<div
					dir={dir}
					className={clsx("preview-story-wrapper", "neo-global-colors", mode)}
				>
					<Story />
				</div>
			);
		},
	],
	globalTypes: {
		dir: {
			description: "The text direction",
			defaultValue: "ltr",
			toolbar: {
				dynamicTitle: true,
				items: [
					{ value: "ltr", title: "LTR", icon: "arrowrightalt" },
					{ value: "rtl", title: "RTL", icon: "arrowleftalt" },
				],
			},
		},
		mode: {
			description: "The color theme/mode",
			defaultValue: "neo-light",
			toolbar: {
				dynamicTitle: true,
				items: [
					{
						value: "neo-light",
						title: "Light",
						icon: "accessibility",
						right: "☀️",
					},
					{
						value: "neo-dark",
						title: "Dark",
						icon: "accessibilityalt",
						right: "🌑",
					},
				],
			},
		},
	},
};

export default preview;
