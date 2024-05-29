import { useEffect, useRef } from "react";

export const useIsInitialRender = () => {
	const isInitialRenderRef = useRef(true);
	useEffect(() => {
		isInitialRenderRef.current = false;
	}, []);
	return isInitialRenderRef.current;
};
