import clsx from "clsx";
import { useContext, useMemo, useState } from "react";

import type { NoteProps, ContentProps, TitleProps } from "./NoteTypes";
import type { INoteContext } from "./NoteContext";
import { NoteContext } from "./NoteContext";
import { TextArea } from "components/TextArea";
import { genId } from "utils";

export const Note = ({
	children,
	state,
	...rest
}: NoteProps & INoteContext) => {
	const classNames = useMemo(
		() => clsx("neo-note", rest.className),
		[rest.className],
	);

	return (
		<NoteContext.Provider value={{ state }}>
			<div {...rest} className={classNames}>
				{children}
			</div>
		</NoteContext.Provider>
	);
};
Note.displayName = "Note";

export const Title = ({ actions, children, ...rest }: TitleProps) => {
	const classNames = useMemo(
		() => clsx("neo-note__title", rest.className),
		[rest.className],
	);

	const { state } = useContext(NoteContext);

	return (
		<div {...rest} className={classNames}>
			<div>{children}</div>

			<div className="neo-note__title__actions">
				{state !== "edit" && actions}
			</div>
		</div>
	);
};
Title.displayName = "NoteTitle";

export const Content = ({
	actions,
	author,
	children,
	className,
	id,
	onTextAreaChange,
	self = false,
	subtext,

	// text area props
	maxLength = 500,
	translations = {
		remaining: "remaining",
		over: "over",
		error: "Over the limit.",
	},
	...rest
}: ContentProps) => {
	const classNames = useMemo(
		() =>
			clsx(
				"neo-note__content",
				self ? "neo-note__content--primary" : "neo-note__content--secondary",
				className,
			),
		[className, self],
	);

	const { state } = useContext(NoteContext);

	const authorId = useMemo(() => id || `note-content-${genId()}`, [id]);

	const [inputLength, setInputLength] = useState(0);
	const error = useMemo(
		() => inputLength > maxLength,
		[inputLength, maxLength],
	);

	return (
		<div {...rest} className={classNames} id={id}>
			<div className="neo-note__content__author" id={authorId}>
				{author}
			</div>

			{state === "edit" ? (
				<>
					<TextArea
						label=""
						aria-labelledby={authorId}
						defaultValue={children as string}
						maxLength={maxLength}
						translations={translations}
						error={error}
						helperText={error ? translations.error : undefined}
						onChange={(e) => {
							onTextAreaChange?.(e);
							setInputLength(e.target.value.length);
						}}
					/>

					<div className="neo-note__content__actions">{actions}</div>
				</>
			) : (
				<>
					{children}

					{subtext && (
						<div className="neo-note__content__subtext neo-body-small">
							{subtext}
						</div>
					)}
				</>
			)}
		</div>
	);
};
Content.displayName = "NoteContent";

Note.Title = Title;
Note.Content = Content;
