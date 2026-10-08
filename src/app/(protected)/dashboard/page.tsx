"use client";

import { useAuth } from "@/providers/AuthProvider";

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <p>
        Welcome, {user?.firstName} {user?.lastName}
      </p>

      {/* <p>{user?.email}</p> */}
    </div>
  );
}
