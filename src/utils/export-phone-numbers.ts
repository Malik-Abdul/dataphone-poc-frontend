import { PhoneNumber } from "@/types/phone-number";

function escapeCsvValue(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

export function exportPhoneNumbersToCsv(phoneNumbers: PhoneNumber[]) {
  const headers = [
    "Phone Number",
    "Carrier",
    "Customer",
    "Status",
    "Acquired Date",
    "City",
    "State",
  ];

  const rows = phoneNumbers.map((phoneNumber) => [
    phoneNumber.phoneNumber,
    phoneNumber.carrier?.name ?? "",
    phoneNumber.customer?.name ?? "Unassigned",
    phoneNumber.status,
    phoneNumber.acquiredAt ?? "",
    phoneNumber.city ?? "",
    phoneNumber.state ?? "",
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((value) => escapeCsvValue(String(value))).join(","))
    .join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = `phone-numbers-${new Date().toISOString().split("T")[0]}.csv`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
