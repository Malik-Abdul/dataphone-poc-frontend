"use client";

import { PhoneNumber } from "@/types/phone-number";

interface PhoneNumberTableProps {
  phoneNumbers: PhoneNumber[];
  loading?: boolean;
}

export default function PhoneNumberTable({
  phoneNumbers,
  loading = false,
}: PhoneNumberTableProps) {
  if (loading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="p-10 text-center text-sm text-gray-500">
          Loading phone numbers...
        </div>
      </div>
    );
  }

  if (phoneNumbers.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="p-10 text-center">
          <p className="text-sm font-medium text-gray-900">
            No phone numbers found
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Try changing your search or filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <TableHeader>Phone Number</TableHeader>

              <TableHeader>Carrier</TableHeader>

              <TableHeader>Customer</TableHeader>

              <TableHeader>Status</TableHeader>

              <TableHeader>Acquired</TableHeader>

              <TableHeader>Location</TableHeader>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {phoneNumbers.map((phoneNumber) => (
              <tr key={phoneNumber.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {phoneNumber.phoneNumber}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                  {phoneNumber.carrier?.name ?? "—"}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                  {phoneNumber.customer?.name ?? "Unassigned"}
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                  <StatusBadge status={phoneNumber.status} />
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                  {formatDate(phoneNumber.acquiredAt)}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                  {formatLocation(phoneNumber.city, phoneNumber.state)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
    >
      {children}
    </th>
  );
}

function StatusBadge({ status }: { status: PhoneNumber["status"] }) {
  const styles = {
    UNASSIGNED: "bg-yellow-100 text-yellow-800",

    ASSIGNED: "bg-green-100 text-green-800",

    DISCONNECTED: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      {formatStatus(status)}
    </span>
  );
}

function formatStatus(status: PhoneNumber["status"]) {
  return status
    .toLowerCase()
    .replace("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(date: string | null) {
  if (!date) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

function formatLocation(city?: string | null, state?: string | null) {
  if (city && state) {
    return `${city}, ${state}`;
  }

  return city || state || "—";
}
