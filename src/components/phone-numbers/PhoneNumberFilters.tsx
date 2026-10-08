"use client";

import {
  PhoneNumber,
  PhoneNumberFilters as PhoneNumberFilterValues,
} from "@/types/phone-number";

interface PhoneNumberFiltersProps {
  phoneNumbers: PhoneNumber[];
  filters: PhoneNumberFilterValues;
  onChange: (filters: PhoneNumberFilterValues) => void;
  onClear: () => void;
}

export default function PhoneNumberFilters({
  phoneNumbers,
  filters,
  onChange,
  onClear,
}: PhoneNumberFiltersProps) {
  const carriers = Array.from(
    new Map(
      phoneNumbers
        .filter((item) => item.carrier)
        .map((item) => [item.carrier.id, item.carrier])
    ).values()
  );

  const customers = Array.from(
    new Map(
      phoneNumbers
        .filter((item) => item.customer)
        .map((item) => [item.customer!.id, item.customer!])
    ).values()
  );

  const updateFilter = (key: keyof PhoneNumberFilterValues, value: string) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  const hasFilters =
    filters.search || filters.carrierId || filters.customerId || filters.status;

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
      <div>
        <label
          htmlFor="phone-number-search"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Search
        </label>

        <input
          id="phone-number-search"
          type="text"
          value={filters.search}
          onChange={(event) => updateFilter("search", event.target.value)}
          placeholder="Search phone number or customer..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label
            htmlFor="carrier-filter"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Carrier
          </label>

          <select
            id="carrier-filter"
            value={filters.carrierId}
            onChange={(event) => updateFilter("carrierId", event.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
          >
            <option value="">All Carriers</option>

            {carriers.map((carrier) => (
              <option key={carrier.id} value={carrier.id}>
                {carrier.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="customer-filter"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Customer
          </label>

          <select
            id="customer-filter"
            value={filters.customerId}
            onChange={(event) => updateFilter("customerId", event.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
          >
            <option value="">All Customers</option>

            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="status-filter"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Status
          </label>

          <select
            id="status-filter"
            value={filters.status}
            onChange={(event) => updateFilter("status", event.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
          >
            <option value="">All Statuses</option>

            <option value="UNASSIGNED">Unassigned</option>

            <option value="ASSIGNED">Assigned</option>

            <option value="DISCONNECTED">Disconnected</option>
          </select>
        </div>
      </div>

      {hasFilters && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClear}
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
