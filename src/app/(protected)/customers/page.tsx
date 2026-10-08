"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import CustomerTable from "@/components/customers/CustomerTable";
import { customerService } from "@/services/customer.service";
import { Customer } from "@/types/customer";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCustomers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await customerService.getCustomers();

      setCustomers(response);
    } catch (err) {
      console.error("Failed to load customers:", err);
      setError("Failed to load customers.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const filteredCustomers = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return customers;
    }

    return customers.filter((customer) => {
      return (
        customer.name.toLowerCase().includes(value) ||
        customer.email?.toLowerCase().includes(value) ||
        customer.phone?.toLowerCase().includes(value)
      );
    });
  }, [customers, search]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage DataPhone customers and their phone numbers.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={loadCustomers}
            disabled={loading}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>

          <Link
            href="/customers/new"
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Add Customer
          </Link>
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <label
          htmlFor="customer-search"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Search customers
        </label>

        <input
          id="customer-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name, email or phone..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">
          {filteredCustomers.length}{" "}
          {filteredCustomers.length === 1 ? "customer" : "customers"}
        </p>
      </div>

      <CustomerTable customers={filteredCustomers} loading={loading} />
    </div>
  );
}
