import clsx from "clsx";
import { ReactElement } from "react";

import { AvatarProps } from "components/Avatar";

import { Timer } from "./Timer";

export interface AgentCardProps {
	agentName: string;
	agentStatus: "connected" | "not-ready" | "ready";
	avatar?: ReactElement<AvatarProps>;
}

export const AgentCard = ({
	agentName,
	agentStatus,
	avatar,
}: AgentCardProps) => {
	return (
		<div
			className={clsx(
				"neo-nav-status",
				agentStatus === "ready" && "neo-nav-status--ready",
				agentStatus === "not-ready" && "neo-nav-status--not-ready",
				agentStatus === "connected" && "neo-nav-status--connected",
			)}
		>
			<div className="neo-nav-status-info">
				<p>{agentName}</p>
				<span
					className={clsx(
						"neo-label",
						agentStatus === "ready" && "neo-label--ready",
						agentStatus === "not-ready" && "neo-label--not-ready",
						agentStatus === "connected" && "neo-label--connected",
					)}
				>
					{agentStatus === "ready" && "Ready"}
					{agentStatus === "not-ready" && "Not Ready"}
					{agentStatus === "connected" && "Connected"} {"  "}
					<Timer agentStatus={agentStatus} />
				</span>
			</div>
			{avatar}
		</div>
	);
};

AgentCard.displayName = "AgentCard";
