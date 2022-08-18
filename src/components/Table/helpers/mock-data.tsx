import { Column } from "react-table";

import { TableProps } from "../types";
import { translations } from "./default-data";

export interface IDataTableMockData {
  id: string;
  label: string;
  name: string | JSX.Element;
  other: string;
  date?: Date;
  status?: "active" | "inactive" | "awc" | "in call";
  hexValue: string;
  level?: "low" | "medium" | "high";
  hasOnCallBeeper?: boolean;
  longText?: string;
}

const columnsExample: Array<Column<IDataTableMockData>> = [
  {
    Header: "Name",
    accessor: "name",
    disableFilters: true, // HACK: need to update to not need this
  },
  {
    Header: "Color",
    accessor: "hexValue",
    disableFilters: true,
    sortType: "alphanumeric",
  },
  {
    Header: "Other",
    accessor: "other",
    disableFilters: true,
    disableSortBy: true,
  },
];
const dataExample: IDataTableMockData[] = [
  {
    id: "20",
    label: "Daniel",
    name: "Sir Daniel",
    other: "Delor Itum",
    date: new Date(2000, 2, 1),
    status: "inactive",
    hexValue: "00FF00",
    level: "low",
    hasOnCallBeeper: false,
  },
  {
    id: "10",
    label: "Fred",
    name: "Sir Fred",
    other: "Lorem Ipsum",
    date: new Date(2001, 1, 1),
    status: "active",
    hexValue: "FF0000",
    level: "low",
    hasOnCallBeeper: true,
    longText:
      "Emojis! 😀 😎 😱 😈 And a buncha text to test the ellipsis. Oh yeah, and a buncha rando special characters: \n\"<>&'{}[]!@#$%^&*()_+-=|\\/?.~`",
  },
  {
    id: "30",
    label: "Tif",
    name: "Madam Tif",
    other: "Asdf Fded",
    date: new Date(2010, 2, 12),
    status: "in call",
    hexValue: "0000FF",
    level: "high",
    hasOnCallBeeper: true,
  },
  {
    id: "40",
    label: "Hailey",
    name: "Madam Hailey",
    other: "Consectetur Adipiscing",
    date: new Date(2020, 1, 21),
    status: "awc",
    hexValue: "FFFF00",
    level: "medium",
    hasOnCallBeeper: false,
  },
  {
    id: "50",
    label: "Alex",
    name: "Intersex Alex",
    other: "Duis aute",
    date: new Date(2000, 2, 11),
    status: "awc",
    hexValue: "FF00FF",
    level: "low",
    hasOnCallBeeper: true,
  },
  {
    id: "60",
    label: "Skyler",
    name: "Androgynous Skyler",
    other: "Excepteur sint",
    date: new Date(2000, 2, 26),
    status: "in call",
    hexValue: "00FFFF",
    level: "medium",
    hasOnCallBeeper: false,
  },
  {
    id: "70",
    label: "Frank",
    name: <a href="#frank">Fancy Frank</a>,
    other: "Nulla pariatur",
    date: new Date(2000, 3, 11),
    status: "awc",
    hexValue: "FF0000",
    level: "low",
    hasOnCallBeeper: true,
  },
  {
    id: "80",
    label: "Scott",
    name: <a href="#scott">Synchronous Scott</a>,
    other: "Etora platurude",
    date: new Date(2000, 3, 15),
    status: "active",
    hexValue: "AA0000",
    level: "medium",
    hasOnCallBeeper: false,
  },
];

export const FilledFields: TableProps<IDataTableMockData> = {
  caption: "table caption",
  columns: columnsExample,
  data: dataExample,
  itemsPerPageOptions: [1, 2, 5, 10, 20, 50, 100],
  readonly: false,
  summary: "table summary",
  translations,
};
