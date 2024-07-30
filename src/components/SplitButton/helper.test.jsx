import { MenuItem } from "components/Menu";
import { verifyFirstMenuItem } from "./helper";

describe("helper", () => {
	it("should throw exception if children is not provided", () => {
		const onClick = vi.fn();
		expect(() => verifyFirstMenuItem("text", onClick, undefined)).toThrow();
	});
	it("should throw exception if children is a string", () => {
		const onClick = vi.fn();
		expect(() =>
			verifyFirstMenuItem("text", onClick, "not a valid menu item"),
		).toThrow();
	});
	it("should throw exception if children is a number", () => {
		const onClick = vi.fn();
		expect(() => verifyFirstMenuItem("text", onClick, 2)).toThrow();
	});
	it("should throw exception if text does not match", () => {
		const onClick = vi.fn();
		const menuItemText = "item1";
		const buttonText = "Send";
		const firstMenuItem = <MenuItem onClick={onClick}>{menuItemText}</MenuItem>;
		expect(() =>
			verifyFirstMenuItem(buttonText, onClick, firstMenuItem),
		).toThrow();
	});
	it("should throw exception if onClick does not match", () => {
		const onClick = vi.fn();
		const text = "item1";
		const firstMenuItem = <MenuItem onClick={onClick}>{text}</MenuItem>;
		expect(() =>
			verifyFirstMenuItem(text, () => {}, [firstMenuItem]),
		).toThrow();
	});
	it("should pass if text and onClick match", () => {
		const onClick = vi.fn();
		const text = "item1";
		const firstMenuItem = <MenuItem onClick={onClick}>{text}</MenuItem>;
		expect(() =>
			verifyFirstMenuItem(text, onClick, [firstMenuItem]),
		).not.toThrow();
	});
	it("should pass if menu item body matches text", () => {
		const onClick = vi.fn();
		const text = "item1";
		const firstMenuItem = (
			<MenuItem onClick={onClick}>
				<b>{text}</b>
			</MenuItem>
		);
		expect(() =>
			verifyFirstMenuItem(text, onClick, [firstMenuItem]),
		).not.toThrow();
	});
	it("should pass if text is not defined but onClick match", () => {
		const onClick = vi.fn();
		const text = undefined;
		const firstMenuItem = <MenuItem onClick={onClick}>{text}</MenuItem>;
		expect(() =>
			verifyFirstMenuItem(text, onClick, [firstMenuItem]),
		).not.toThrow();
	});
});
