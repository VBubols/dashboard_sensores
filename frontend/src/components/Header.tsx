"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
    const pathname = usePathname();
    const isHome = pathname === "/";

    return (
        <header className="bg-surface border-b border-border px-8 py-4 flex items-center gap-4">
            {!isHome && (
                <Link href="/" className="text-muted hover:text-brand-light text-sm transition-colors">
                    ← Voltar
                </Link>
            )}
            <Link href="/" className="text-2xl font-bold text-brand-light tracking-tight">
                Dashboard
            </Link>
        </header>
    );
}