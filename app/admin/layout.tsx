"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  // Don't show layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const navItems = [
    { href: "/admin/kos", label: "Kelola Kos" },
  ];

  return (
    <>
      <div className="min-h-screen bg-zinc-950 text-white flex">
        {/* Sidebar */}
        <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col shrink-0">
          <div className="p-6 border-b border-zinc-800">
            <Link href="/admin/kos" className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight">Kosku</span>
              <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-0.5 rounded-full font-medium">Admin</span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith(item.href)
                    ? "bg-white text-black"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-zinc-800">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
      <Toaster theme="dark" />
    </>
  );
}
