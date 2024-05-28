import type { ReactNode } from "react";

import { reactNodeToString } from ".";

type Test = [input: ReactNode, expectedOutput: string];

describe("react-node-to-string", () => {
	it("extracts correct string", () => {
		const tests: Test[] = [
			["lorem ipsum", "lorem ipsum"],
			[123, "123"],
			[true, ""],
			[false, ""],
			[null, ""],
			[void 0, ""],
			[["lorem", "ipsum"], "loremipsum"],
			[["lorem", <>ipsum</>], "loremipsum"],
			[<></>, ""],
			[<>lorem ipsum</>, "lorem ipsum"],
			[
				<p key="p-tag">
					<strong>lorem</strong>ipsum
				</p>,
				"loremipsum",
			],
		];

		tests.forEach((test, index) => {
			assert.strictEqual(
				reactNodeToString(test[0]),
				test[1],
				`Test ${index} failed`,
			);
		});
	});
});
