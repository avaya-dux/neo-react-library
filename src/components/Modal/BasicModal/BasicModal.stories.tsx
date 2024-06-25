import type { Meta } from "@storybook/react";

import { Button } from "components/Button";

import useModal from "../useModal";
import { BasicModal, type BasicModalProps } from "./BasicModal";
import catImg from "components/Image/200by300image.jpeg";

export default {
	title: "Components/Modal",
	component: BasicModal,
} as Meta<BasicModalProps>;

export const BasicModalExample = () => {
	const { isOpen, toggle } = useModal(true);
	return (
		<>
			<Button
				data-testid="neo-button-show"
				id="btn-show"
				variant="primary"
				onClick={() => {
					toggle();
				}}
			>
				Activate Full Modal Example
			</Button>
			<BasicModal
				open={isOpen}
				onClose={toggle}
				title="Header of Modal Window"
				actions={[
					<Button
						key="example1"
						onClick={() => console.log("Clicked on the action button.")}
					>
						Remove
					</Button>,
				]}
			>
				<p>
					This is just some plain text inside a paragraph tag, let&apos;s try
					longer text to see how it <strong>wraps</strong> and aligns
				</p>
			</BasicModal>
		</>
	);
};

export const BasicModalExampleWithDiffContent = () => {
	const { isOpen, toggle } = useModal(false);
	return (
		<>
			<Button
				data-testid="neo-button-show"
				id="btn-show"
				variant="primary"
				onClick={() => {
					toggle();
				}}
			>
				Activate Full Modal Example
			</Button>
			<BasicModal
				open={isOpen}
				onClose={toggle}
				title="Header of Modal Window"
				actions={[
					<Button
						key="example1"
						onClick={() => console.log("Clicked on the action1 button.")}
					>
						Action 1
					</Button>,
					<Button
						key="example2"
						onClick={() => console.log("Clicked on the action2 button.")}
					>
						Action 2
					</Button>,
				]}
			>
				<p>
					This is just some plain text inside a paragraph tag, let&apos;s try
					longer text to see how it <strong>wraps</strong> and aligns
				</p>
				<br />
				<img src={catImg} alt="A cat" />
			</BasicModal>
		</>
	);
};
