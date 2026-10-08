"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import CustomerNumbersTable from "@/components/customers/CustomerNumbersTable";
import { customerService } from "@/services/customer.service";
import { phoneNumberService } from "@/services/phone-number.service";

import { Customer } from "@/types/customer";
import { PhoneNumber } from "@/types/phone-number";

export default function CustomerDetailsPage() {
  const params = useParams();
  const customerId = params.id as string;

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCustomer = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [customerResponse, phoneNumbersResponse] = await Promise.all([
        customerService.getCustomer(customerId),
        phoneNumberService.getPhoneNumbers(),
      ]);

      setCustomer(customerResponse);

      const customerNumbers = phoneNumbersResponse.filter(
        (phoneNumber) => phoneNumber.customer?.id === customerId
      );

      setPhoneNumbers(customerNumbers);
    } catch (err) {
      console.error("Failed to load customer:", err);
      setError("Failed to load customer.");
    } finally {
      setLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    loadCustomer();
  }, [loadCustomer]);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-sm text-gray-500">Loading customer...</p>
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="space-y-4 p-6">
        <Link
          href="/customers"
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          ← Back to Customers
        </Link>

        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error || "Customer not found."}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <Link
          href="/customers"
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          ← Back to Customers
        </Link>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {customer.name}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Customer details and assigned phone numbers.
          </p>
        </div>

        <Link
          href={`/customers/${customer.id}/edit`}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Edit Customer
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Email</p>

          <p className="mt-1 font-medium text-gray-900">
            {customer.email || "—"}
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Phone</p>

          <p className="mt-1 font-medium text-gray-900">
            {customer.phone || "—"}
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Assigned Numbers</p>

          <p className="mt-1 text-2xl font-semibold text-gray-900">
            {phoneNumbers.length}
          </p>
        </div>
      </div>

      {customer.address && (
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Address</p>

          <p className="mt-1 text-sm text-gray-900">{customer.address}</p>
        </div>
      )}

      <div className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Assigned Phone Numbers
          </h2>

          <p className="text-sm text-gray-500">
            All phone numbers currently assigned to this customer.
          </p>
        </div>

        <CustomerNumbersTable phoneNumbers={phoneNumbers} loading={loading} />
      </div>
    </div>
  );
}
