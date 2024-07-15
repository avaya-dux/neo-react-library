import styled from "styled-components";

interface HandleWrapperProps {
	isDragging?: boolean;
}

const HandleWrapper = styled.div<HandleWrapperProps>`
  height: 1rem;
  vertical-align: bottom;
  display: inline-block;
  margin-right: 0.5rem;
  svg {
    width: 100%;
    height: 100%;
  }
  cursor: ${({ isDragging }) => (isDragging ? "grabbing" : "grab")};
`;

interface DragHandleProps {
	isDragging?: boolean;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	[key: string]: any; // To allow spreading other props
}

export const DragHandle: React.FC<DragHandleProps> = (props) => {
	return (
		<HandleWrapper {...props}>
			<svg
				aria-hidden="true"
				focusable="false"
				data-prefix="fas"
				data-icon="grip-vertical"
				role="img"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 320 512"
			>
				<path
					fill="currentColor"
					d="M96 32H32C14.33 32 0 46.33 0 64v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32V64c0-17.67-14.33-32-32-32zm0 160H32c-17.67 0-32 14.33-32 32v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32v-64c0-17.67-14.33-32-32-32zm0 160H32c-17.67 0-32 14.33-32 32v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32v-64c0-17.67-14.33-32-32-32zM288 32h-64c-17.67 0-32 14.33-32 32v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32V64c0-17.67-14.33-32-32-32zm0 160h-64c-17.67 0-32 14.33-32 32v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32v-64c0-17.67-14.33-32-32-32zm0 160h-64c-17.67 0-32 14.33-32 32v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32v-64c0-17.67-14.33-32-32-32z"
				/>
			</svg>
		</HandleWrapper>
	);
};
