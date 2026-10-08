"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import AuthProvider, { useAuth } from "@/providers/AuthProvider";
import MainLayout from "@/components/layouts/MainLayout";

function ProtectedContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { user, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ProtectedContent>
        <MainLayout>{children}</MainLayout>
      </ProtectedContent>
    </AuthProvider>
  );
}
