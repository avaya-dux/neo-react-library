import type { Meta, StoryObj } from "@storybook/react";

import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
	title: "Components/Avatar",
	component: Avatar,
	args: { label: "Jimmy Bob", variant: "basic", size: "md" },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const AvatarWithStatusIndicator: Story = {
	render: () => (
		<main>
			<section style={{ width: 200, paddingBottom: 10 }}>
				<h4>Do Not Disturb</h4>

				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<Avatar status="do-not-disturb" size="sm" />
					<Avatar status="do-not-disturb" size="md" />
					<Avatar status="do-not-disturb" size="lg" />
				</div>
			</section>

			<section style={{ width: 200, paddingBottom: 10 }}>
				<h4>Busy</h4>

				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<Avatar status="busy" size="sm" />
					<Avatar status="busy" size="md" />
					<Avatar status="busy" size="lg" />
				</div>
			</section>

			<section style={{ width: 200, paddingBottom: 10 }}>
				<h4>Available</h4>

				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<Avatar status="available" size="sm" />
					<Avatar status="available" size="md" />
					<Avatar status="available" size="lg" />
				</div>
			</section>

			<section style={{ width: 200, paddingBottom: 10 }}>
				<h4>Offline</h4>

				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<Avatar status="offline" size="sm" />
					<Avatar status="offline" size="md" />
					<Avatar status="offline" size="lg" />
				</div>
			</section>

			<section style={{ width: 200, paddingBottom: 10 }}>
				<h4>Away</h4>

				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<Avatar status="away" size="sm" />
					<Avatar status="away" size="md" />
					<Avatar status="away" size="lg" />
				</div>
			</section>
		</main>
	),
};

export const Default: Story = { render: () => <Avatar label="Jimmy Bob" /> };

export const Template: Story = { render: () => <Avatar /> };

export const SmallBot: Story = {
	args: { label: "Small Bot", variant: "bot", size: "sm" },
	render: ({ label, variant, size }) => (
		<Avatar label={label} variant={variant} size={size} />
	),
};
