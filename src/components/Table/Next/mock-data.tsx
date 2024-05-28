import { faker } from "@faker-js/faker";

export interface ITableNextMockData {
	id?: number;
	firstName: string;
	lastName: string;
	age: number;
	visits: number;
	status: string;
	progress: number;
	subRows?: ITableNextMockData[]; // TODO: utilize
}

// the below is copy-pasted from the tanstack docs: https://tanstack.com/table/v8/docs/framework/react/
const range = (len: number) => {
	const arr: number[] = [];
	for (let i = 0; i < len; i++) {
		arr.push(i);
	}
	return arr;
};

const newPerson = (num: number): ITableNextMockData => {
	return {
		id: num,
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		age: faker.number.int(40),
		visits: faker.number.int(1000),
		progress: faker.number.int(100),
		status: faker.helpers.shuffle<ITableNextMockData["status"]>([
			"relationship",
			"complicated",
			"single",
		])[0]!,
	};
};

export function makeData(...lens: number[]) {
	const makeDataLevel = (depth = 0): ITableNextMockData[] => {
		const len = lens[depth]!;
		return range(len).map((index): ITableNextMockData => {
			return {
				...newPerson(index),
				subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
			};
		});
	};

	return makeDataLevel();
}
