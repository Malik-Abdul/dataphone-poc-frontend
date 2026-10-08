"use client";

import Link from "next/link";
import { Customer } from "@/types/customer";

interface CustomerTableProps {
  customers: Customer[];
  loading?: boolean;
}

export default function CustomerTable({
  customers,
  loading = false,
}: CustomerTableProps) {
  if (loading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-500">Loading customers...</p>
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
        <p className="text-sm text-gray-500">No customers found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Customer
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Email
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Phone
              </th>

              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="font-medium text-gray-900">
                    {customer.name}
                  </div>
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {customer.email || "—"}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {customer.phone || "—"}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                  <Link
                    href={`/customers/${customer.id}`}
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
