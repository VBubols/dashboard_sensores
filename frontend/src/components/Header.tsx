"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
    const pathname = usePathname();
    const isHome = pathname === "/";

    return (
        <header className="bg-slate-800 border-b border-slate-700 px-8 py-4 flex items-center gap-4">
            {!isHome && (
                <Link href="/" className="text-slate-400 hover:text-brand text-sm">
                    ← Voltar
                </Link>
            )}
        <Link href="/" className="text-2xl font-bold text-brand tracking-tight">
            Dashboard
        </Link>
        </header>
    );
}