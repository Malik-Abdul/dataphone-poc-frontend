"use client";

import { FormEvent, useState } from "react";
import { CreateCustomerDto, Customer } from "@/types/customer";

interface CustomerFormProps {
  customer?: Customer;
  loading?: boolean;
  onSubmit: (data: CreateCustomerDto) => Promise<void>;
  onCancel?: () => void;
}

export default function CustomerForm({
  customer,
  loading = false,
  onSubmit,
  onCancel,
}: CustomerFormProps) {
  const [name, setName] = useState(customer?.name ?? "");
  const [email, setEmail] = useState(customer?.email ?? "");
  const [phone, setPhone] = useState(customer?.phone ?? "");
  const [address, setAddress] = useState(customer?.address ?? "");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    await onSubmit({
      name: name.trim(),
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      address: address.trim() || undefined,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-lg border border-gray-200 bg-white p-6"
    >
      <div>
        <label
          htmlFor="customer-name"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Customer Name
        </label>

        <input
          id="customer-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter customer name"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
        />
      </div>

      <div>
        <label
          htmlFor="customer-email"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Email
        </label>

        <input
          id="customer-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="customer@example.com"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
        />
      </div>

      <div>
        <label
          htmlFor="customer-phone"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Phone
        </label>

        <input
          id="customer-phone"
          type="text"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Customer contact number"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
        />
      </div>

      <div>
        <label
          htmlFor="customer-address"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Address
        </label>

        <textarea
          id="customer-address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          placeholder="Customer address"
          rows={3}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
        />
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={loading || !name.trim()}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : customer
            ? "Update Customer"
            : "Add Customer"}
        </button>
      </div>
    </form>
  );
}
