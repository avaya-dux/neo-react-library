import { Button } from "components/Button";

import type { SecondaryButtonProps } from "./ButtonActionTypes";

export const SecondaryButton = ({
	children,
	notificationType = "info",
	...rest
}: SecondaryButtonProps) => {
	return (
		<Button
			className="neo-notification__button"
			size="compact"
			variant="secondary"
			status={notificationType}
			{...rest}
		>
			{children}
		</Button>
	);
};
