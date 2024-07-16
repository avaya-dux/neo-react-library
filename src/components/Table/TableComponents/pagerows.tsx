
// return page.map((row) => {
// 	prepareRow(row);
// 	const preparedRowProps = row.getRowProps();
// 	const checkboxLabel = row.original.label || row.id;

// 	return (
// 		<tr
// 			role={preparedRowProps.role}
// 			style={preparedRowProps.style}
// 			key={preparedRowProps.key || `table-row-${row.id}`}
// 			className={clsx(
// 				row.isSelected && "active",
// 				row.original.disabled && "disabled",
// 				preparedRowProps.className,
// 			)}
// 		>
// 			{shouldShowCheckbox && (
// 				<td style={{ padding: "0 0 0 5px" }}>
// 					<Checkbox
// 						checked={row.isSelected}
// 						aria-label={checkboxLabel}
// 						disabled={row.original.disabled}
// 						onChange={() => handleRowToggledInternal(row)}
// 						value={row.id}
// 					/>
// 				</td>
// 			)}

// 			{row.cells.map((cell, i) => (
// 				<td {...cell.getCellProps()} key={`td-${i}`}>
// 					{cell.render("Cell")}
// 				</td>
// 			))}
// 		</tr>
// 	);
// });
