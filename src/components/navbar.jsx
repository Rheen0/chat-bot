"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; 
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const pathname = usePathname();

    const links = [
        { href: "/", label: "Home" },
        { href: "/chat", label: "Chat" },
        { href: "/history", label: "History" },
        { href: "/profile", label: "Profile" },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Brand */}
                <Link href="/" className="text-xl font-bold">
                    AzureChat
                </Link>

                {/* Links */}
                <div className="flex gap-6">
                    {links.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === href ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            {label}
                        </Link>
                    ))}
                </div>

                {/* Auth Button (placeholder for now) */}
                <Button size="sm" variant="outline">
                    Sign In
                </Button>
            </div>
        </nav>
    );
}
