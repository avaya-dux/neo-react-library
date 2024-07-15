import clsx from "clsx";
import { Icon } from "components";
import styled from "styled-components";

interface HandleWrapperProps {
	isDragging?: boolean;
}

const HandleWrapper = styled.div<HandleWrapperProps>`
  height: 16px;
  width: 16px;
  vertical-align: center;
  display: inline-block;
  margin-right: 0.5rem;
  cursor: ${({ isDragging }) => (isDragging ? "grabbing" : "grab")};
`;

interface DragHandleProps {
	isDragging?: boolean;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	[key: string]: any; // To allow spreading other props
}

export const DragHandle: React.FC<DragHandleProps> = (props) => {
	const { isDragging } = props;
	return (
		<HandleWrapper
			{...props}
			className={clsx(isDragging && "neo-set-keyboard-focus")}
		>
			<Icon
				icon="drag"
				size="sm"
				aria-label="drag"
				style={{ display: "flex", height: 14, alignItems: "center" }}
			/>
		</HandleWrapper>
	);
};
