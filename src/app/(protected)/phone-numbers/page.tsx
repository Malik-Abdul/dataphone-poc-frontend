"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import PhoneNumberFilters from "@/components/phone-numbers/PhoneNumberFilters";
import PhoneNumberTable from "@/components/phone-numbers/PhoneNumberTable";

import { phoneNumberService } from "@/services/phone-number.service";

import {
  PhoneNumber,
  PhoneNumberFilters as PhoneNumberFilterValues,
} from "@/types/phone-number";

import { exportPhoneNumbersToCsv } from "@/utils/export-phone-numbers";

const INITIAL_FILTERS: PhoneNumberFilterValues = {
  search: "",
  carrierId: "",
  customerId: "",
  status: "",
};

export default function PhoneNumbersPage() {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([]);

  const [filters, setFilters] =
    useState<PhoneNumberFilterValues>(INITIAL_FILTERS);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const loadPhoneNumbers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await phoneNumberService.getPhoneNumbers();
      console.log("Phone numbers API response:", response);

      setPhoneNumbers(response);
    } catch (err) {
      console.error("Failed to load phone numbers:", err);

      setError("Failed to load phone numbers.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPhoneNumbers();
  }, [loadPhoneNumbers]);

  const filteredPhoneNumbers = useMemo(() => {
    const search = filters.search.trim().toLowerCase();

    return phoneNumbers.filter((phoneNumber) => {
      // Search phone number or customer name
      if (search) {
        const phoneNumberValue = phoneNumber.phoneNumber.toLowerCase();

        const customerName = phoneNumber.customer?.name?.toLowerCase() ?? "";

        const matchesSearch =
          phoneNumberValue.includes(search) || customerName.includes(search);

        if (!matchesSearch) {
          return false;
        }
      }

      // Carrier filter
      if (filters.carrierId && phoneNumber.carrier?.id !== filters.carrierId) {
        return false;
      }

      // Customer filter
      if (
        filters.customerId &&
        phoneNumber.customer?.id !== filters.customerId
      ) {
        return false;
      }

      // Status filter
      if (filters.status && phoneNumber.status !== filters.status) {
        return false;
      }

      return true;
    });
  }, [phoneNumbers, filters]);

  const clearFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const handleExport = () => {
    exportPhoneNumbersToCsv(filteredPhoneNumbers);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Phone Numbers
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage all DataPhone numbers across carriers.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={loadPhoneNumbers}
            disabled={loading}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>

          <button
            type="button"
            onClick={handleExport}
            disabled={filteredPhoneNumbers.length === 0}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Filters */}
      <PhoneNumberFilters
        phoneNumbers={phoneNumbers}
        filters={filters}
        onChange={setFilters}
        onClear={clearFilters}
      />

      {/* Results summary */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-900">
            {filteredPhoneNumbers.length}{" "}
            {filteredPhoneNumbers.length === 1 ? "number" : "numbers"}
          </p>

          {filteredPhoneNumbers.length !== phoneNumbers.length && (
            <p className="text-xs text-gray-500">
              Showing filtered results from {phoneNumbers.length} total
            </p>
          )}
        </div>
      </div>

      {/* Table */}
      <PhoneNumberTable phoneNumbers={filteredPhoneNumbers} loading={loading} />
    </div>
  );
}
