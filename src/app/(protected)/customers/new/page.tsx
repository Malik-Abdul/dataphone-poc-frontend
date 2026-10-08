"use client";

import { useRouter } from "next/navigation";
import CustomerForm from "@/components/customers/CustomerForm";
import { customerService } from "@/services/customer.service";
import { CreateCustomerDto } from "@/types/customer";
import { useState } from "react";

export default function NewCustomerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CreateCustomerDto) => {
    try {
      setLoading(true);
      setError(null);

      await customerService.create(data);

      router.push("/customers");
    } catch (err) {
      console.error("Failed to create customer:", err);
      setError("Failed to create customer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Add Customer</h1>

        <p className="mt-1 text-sm text-gray-500">
          Create a new DataPhone customer.
        </p>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <CustomerForm
        loading={loading}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/customers")}
      />
    </div>
  );
}
