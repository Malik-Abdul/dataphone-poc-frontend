"use client";

import Link from "next/link";
import { PhoneNumber } from "@/types/phone-number";

interface CustomerNumbersTableProps {
  phoneNumbers: PhoneNumber[];
  loading?: boolean;
}

function getStatusClasses(status: PhoneNumber["status"]) {
  switch (status) {
    case "ASSIGNED":
      return "bg-green-100 text-green-700";

    case "UNASSIGNED":
      return "bg-yellow-100 text-yellow-700";

    case "DISCONNECTED":
      return "bg-gray-100 text-gray-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function CustomerNumbersTable({
  phoneNumbers,
  loading = false,
}: CustomerNumbersTableProps) {
  if (loading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-500">Loading phone numbers...</p>
      </div>
    );
  }

  if (phoneNumbers.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
        <p className="text-sm text-gray-500">
          This customer has no assigned phone numbers.
        </p>
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
                Phone Number
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Carrier
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>

              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {phoneNumbers.map((phoneNumber) => (
              <tr key={phoneNumber.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {phoneNumber.phoneNumber}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {phoneNumber.carrier?.name || "—"}
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                      phoneNumber.status
                    )}`}
                  >
                    {phoneNumber.status}
                  </span>
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <Link
                    href={`/phone-numbers?search=${encodeURIComponent(
                      phoneNumber.phoneNumber
                    )}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
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
