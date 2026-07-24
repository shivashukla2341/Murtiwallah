import type { Metadata } from "next";

import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-900 px-5">
      <div className="w-full max-w-[380px] rounded-lg border border-neutral-700 bg-neutral-800 p-8">
        <div className="mb-7 flex items-baseline gap-2">
          <span className="font-heading text-[24px] text-accent-400">ॐ</span>
          <span className="font-heading text-[20px] font-semibold text-neutral-100">
            Murtiwallah Admin
          </span>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
