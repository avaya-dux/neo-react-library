import type { Meta, Story } from "@storybook/react";

import { useEffect, useRef, useState } from "react";
import { Chip, type ChipProps, ChipsContainer } from "./";

export default {
	title: "Components/Chips",
	component: Chip,
} as Meta<ChipProps>;

export const Default = () => <Chip>Default Example</Chip>;

export const Closable = () => (
	<ChipsContainer>
		<Chip closable variant="info">
			Closable
		</Chip>

		<Chip closable variant="info">
			Also Closable
		</Chip>
	</ChipsContainer>
);

export const GetWidth = () => {
	const chipRef = useRef<HTMLDivElement>(null);

	const [chipWidth, setChipWidth] = useState(0);

	useEffect(() => {
		if (chipRef.current) {
			setChipWidth(chipRef.current.offsetWidth);
		}
	}, []);

	return (
		<section>
			<p>This example shows how to get width of a Chip using a ref.</p>
			<ChipsContainer>
				<Chip ref={chipRef} onClick={() => console.log("clicked")}>
					Chip to measure
				</Chip>
				<div>Width in px: {chipWidth}</div>
			</ChipsContainer>
		</section>
	);
};

export const GetWidths = () => {
	const chipRefs = useRef<HTMLDivElement[]>([]);
	const [chipWidths, setChipWidths] = useState<number[]>([]);

	useEffect(() => {
		const widths = chipRefs.current.map((chip) => chip.offsetWidth);
		setChipWidths(widths);
	}, []);

	const setChipRef = (el: HTMLDivElement | null, index: number) => {
		if (el) {
			chipRefs.current[index] = el;
		}
	};

	return (
		<section>
			<p>
				This example shows how to get width of Chips using an array of refs.
			</p>
			<ChipsContainer>
				<Chip ref={(el) => setChipRef(el, 0)}>Chip 1</Chip>
				<Chip ref={(el) => setChipRef(el, 1)}>Chip 2</Chip>
				<div>Widths in px: {JSON.stringify(chipWidths)}</div>
			</ChipsContainer>
		</section>
	);
};

export const ChipsContainerExamples = () => (
	<div>
		<section>
			<h2>Variants</h2>

			<ChipsContainer>
				<Chip variant="default">Default</Chip>
				<Chip variant="alert">Alert</Chip>
				<Chip variant="info">Info</Chip>
				<Chip variant="success">Success</Chip>
				<Chip variant="warning">Warning</Chip>
			</ChipsContainer>
		</section>

		<section>
			<h2>Disabled Variants</h2>

			<ChipsContainer>
				<Chip disabled variant="default">
					Default
				</Chip>

				<Chip disabled variant="alert">
					Alert
				</Chip>

				<Chip disabled variant="info">
					Info
				</Chip>

				<Chip disabled variant="success">
					Success
				</Chip>

				<Chip disabled variant="warning">
					Warning
				</Chip>
			</ChipsContainer>
		</section>

		<section>
			<h2>Chips with Avatar</h2>

			<ChipsContainer>
				<Chip avatarInitials="D1" variant="default">
					Default
				</Chip>
				<Chip avatarInitials="A1" variant="alert">
					Alert
				</Chip>
				<Chip avatarInitials="I1" variant="info">
					Info
				</Chip>
				<Chip avatarInitials="S1" variant="success">
					Success
				</Chip>
				<Chip avatarInitials="W1" variant="warning">
					Warning
				</Chip>
			</ChipsContainer>
		</section>
	</div>
);

const Template: Story<ChipProps> = (props: ChipProps) => <Chip {...props} />;
export const Templated = Template.bind({});
Templated.args = {
	avatarInitials: "",
	children: "Templated Example",
	closable: false,
	closeButtonAriaLabel: "Close",
	dir: "ltr",
	disabled: false,
	icon: undefined,
	variant: "default",
};
