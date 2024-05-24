import { createColumnHelper } from "@tanstack/react-table";
import { render, screen } from "@testing-library/react";

import { TableNext } from "./";
import { ITableNextMockData, makeData } from "./mock-data";

describe("Table (Next)", () => {
  const columnHelper = createColumnHelper<ITableNextMockData>();
  const columns = [
    columnHelper.accessor("firstName", {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.lastName, {
      id: "lastName",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Last Name</span>,
    }),
    columnHelper.accessor("age", {
      header: () => "Age",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("visits", {
      header: () => <span>Visits</span>,
    }),
    columnHelper.accessor("status", {
      header: "Status",
    }),
    columnHelper.accessor("progress", {
      header: "Profile Progress",
    }),
  ];
  const data = makeData(200);

  describe("base tests", () => {
    it("renders a basic example without exploding", () => {
      render(<TableNext data={data} columns={columns} />);

      expect(screen.getByRole("table")).toBeVisible();
    });
  });
});
