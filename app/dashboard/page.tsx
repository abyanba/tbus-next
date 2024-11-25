"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Proteksi halaman
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated" || session?.user?.role !== "ADMIN") {
    if (typeof window !== "undefined") {
      router.push("/"); // Redirect jika bukan admin
    }
    return null;
  }

  return (
    <div>
      <h1>Welcome to Admin Dashboard</h1>
      <p>Your role: {session.user.role}</p>
    </div>
  );
}
