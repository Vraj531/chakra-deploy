import { getCoreRowModel, type ColumnDef, type TableOptions } from '@tanstack/svelte-table';
import { writable } from 'svelte/store';
import { defaultData, type Person } from './persons';

export const defaultColumns: ColumnDef<Person>[] = [
	{
		accessorKey: 'firstName',
		cell: (info) => info.getValue(),
		footer: (info) => info.column.id
	},
	{
		accessorFn: (row) => row.lastName,
		id: 'lastName',
		cell: (info) => info.getValue(),
		header: () => 'Last Name',
		footer: (info) => info.column.id
	},
	{
		accessorKey: 'age',
		header: () => 'Age',
		footer: (info) => info.column.id
	},
	{
		accessorKey: 'visits',
		header: () => 'Visits',
		footer: (info) => info.column.id
	},
	{
		accessorKey: 'status',
		header: 'Status',
		footer: (info) => info.column.id
	},
	{
		accessorKey: 'progress',
		header: 'Profile Progress',
		footer: (info) => info.column.id
	}
];

export const options = writable<TableOptions<Person>>({
	data: defaultData,
	columns: defaultColumns,
	getCoreRowModel: getCoreRowModel()
});
