"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/getUser";

export default function Navbar() {
    const pathname = usePathname();

    const links = [
        { href: "/", label: "Home" },
        { href: "/chat", label: "Chat" },
        { href: "/history", label: "History" },
        { href: "/profile", label: "Profile" },
    ];

    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser().then(setUser);
    }, []);

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
                <div className="flex gap-2">
                    {!user ? (
                        <>
                            <a href="/.auth/login/github">
                                <Button variant="outline">Login with GitHub</Button>
                            </a>
                            <a href="/.auth/login/aad">
                                <Button variant="outline">Login with Microsoft</Button>
                            </a>
                        </>
                    ) : (
                        <a href="/.auth/logout">
                            <Button variant="destructive">Logout</Button>
                        </a>
                    )}
                </div>
            </div>
        </nav>
    );
}
