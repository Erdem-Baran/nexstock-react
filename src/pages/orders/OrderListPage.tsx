import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../api/orderApi";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  type SortingState,
} from "@tanstack/react-table";
import { Loader2, ArrowUpDown, Eye } from "lucide-react";
import type { Order } from "../../types/order";
import { useState } from "react";

const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.accessor("id", {
    header: "Order No.",
    cell: (info) => (
      <span className="font-mono text-gray-500">#{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("customerName", {
    header: "Customer",
    cell: (info) => (
      <span className="font-medium text-gray-900">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("orderDate", {
    header: ({ column }) => (
      <button
        className="flex items-center gap-2 hover:text-gray-700"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date <ArrowUpDown className="w-4 h-4" />
      </button>
    ),
  }),
  columnHelper.accessor("totalAmount", {
    header: ({ column }) => (
      <button
        className="flex items-center gap-2 hover:text-gray-700"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amount <ArrowUpDown className="w-4 h-4" />
      </button>
    ),
    cell: (info) => (
      <span className="font-medium text-gray-900">
        ${info.getValue().toLocaleString("en-US")}
      </span>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
      const styles = {
        Pending: "bg-yellow-100 text-yellow-800",
        Processing: "bg-blue-100 text-blue-800",
        Shipped: "bg-purple-100 text-purple-800",
        Delivered: "bg-green-100 text-green-800",
        Cancelled: "bg-gray-100 text-gray-800",
      };
      return (
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}
        >
          {status}
        </span>
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "actions",
    cell: () => (
      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
        <Eye className="w-4 h-4" />
      </button>
    ),
  }),
];

export default function OrderListPage() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const table = useReactTable({
    data: orders,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading)
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin text-blue-600" />
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-500">
            You can track all customer orders here.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 text-sm text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
