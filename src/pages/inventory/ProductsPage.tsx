import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { getProducts } from "../../api/productApi";
import type { Product } from "../../types/product";
import { Loader2, AlertCircle } from "lucide-react";

// Defining Table Columns
const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.accessor("name", {
    header: "Product Name",
    cell: (info) => <span className="font-medium text-gray-900">{info.getValue()}</span>,
  }),
  columnHelper.accessor("category", {
    header: "Category",
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => (
      <span className="text-blue-600 font-medium">
        ₺{info.getValue().toLocaleString("en-US")}
      </span>
    ),
  }),
  columnHelper.accessor("stock", {
    header: "Stock",
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
      // Color determination based on the situation
      const colors = {
        "In Stock": "bg-green-100 text-green-800",
        "Low Stock": "bg-yellow-100 text-yellow-800",
        "Out of Stock": "bg-red-100 text-red-800",
      };
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[status]}`}>
          {status}
        </span>
      );
    },
  }),
];

export default function ProductsPage() {
  // 1. Pulling Data with React Query
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // 2. creating the table
  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Loading Status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  // Error Status
  if (isError) {
    return (
      <div className="p-6 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
        <AlertCircle className="w-5 h-5" />
        <span>An error occurred while loading the data. Is the backend (json-server) running?</span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
          <p className="text-gray-500 mt-1">Manage your products here.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          + New Product
        </button>
      </div>

      {/* TABLE AREA */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {flexRender(header.column.columnDef.header, header.getContext())}
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
        
        {products.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No products have been added yet.
          </div>
        )}
      </div>
    </div>
  );
}