import type { Column } from "react-table";

export interface IRecordingTableMockData {
	id: string;
	recordingName: string;
	date?: Date;
	duration?: number;
	agentName: string;
	status?: "reviewed" | "transcribed" | "not-reviewed" | "incomplete";
	disabled?: boolean;
}

export const recordingColumns: Column<IRecordingTableMockData>[] = [
	{
		Header: "Recording",
		accessor: "recordingName",
		disableFilters: true, // HACK: need to update to not need this
	},
	{
		Header: "Duration in minutes",
		accessor: "duration",
		disableFilters: true,
	},
	{
		Header: "Recording Status",
		accessor: "status",
		disableFilters: true,
	},
	{
		Header: "Agent Name",
		accessor: "agentName",
		disableFilters: true,
	},
];

const getRandomDate = (start: Date, end: Date): Date => {
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime()),
	);
};

const range = (len: number) => {
	const arr = [];
	for (let i = 0; i < len; i++) {
		arr.push(i);
	}
	return arr;
};

const newRecording = (index: number): IRecordingTableMockData => {
	const statusChance = Math.random();

	return {
		id: index.toString(),
		recordingName: `call recording-${index}`,
		date: getRandomDate(new Date(2020, 1, 1), new Date()),
		duration: Math.floor(Math.random() * 120),
		agentName: `Agent-${index}`,
		status:
			statusChance > 0.66
				? "reviewed"
				: statusChance > 0.33
					? "transcribed"
					: "not-reviewed",
		disabled: false,
	};
};

export const makeData = (len: number) => {
	const makeDataRow = () => {
		return range(len).map((index) => {
			return {
				...newRecording(index),
			};
		});
	};

	return makeDataRow();
};
