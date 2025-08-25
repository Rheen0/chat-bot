"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { getUser } from "@/lib/getUser";

export default function Navbar() {
    const pathname = usePathname();
    const [user, setUser] = useState(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const links = [
        { href: "/", label: "Home" },
        { href: "/chat", label: "Chat" },
        { href: "/history", label: "History" },
        { href: "/profile", label: "Profile" },
    ];

    useEffect(() => {
        getUser().then(setUser);
    }, []);

    const controlNavbar = useCallback(() => {
        if (typeof window !== 'undefined') {
            const currentScrollY = window.scrollY;

            // Always show navbar at the top of the page
            if (currentScrollY < 50) {
                setIsVisible(true);
                setLastScrollY(currentScrollY);
                return;
            }

            // Hide navbar when scrolling down, show when scrolling up
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false); // Scrolling down - hide
            } else {
                setIsVisible(true); // Scrolling up - show
            }

            setLastScrollY(currentScrollY);
        }
    }, [lastScrollY]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);

            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [controlNavbar]);

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-lg transition-transform duration-300 ease-in-out",
            isVisible ? "translate-y-0" : "-translate-y-full"
        )}>
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-xl font-bold text-foreground hover:text-primary transition-colors"
                >
                    <div className="w-8 h-8 text-primary">
                        <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v-.07zM17.9 17.39c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                            <path d="M12 1l-2 4h4l-2-4zm0 0l1 2-1 1-1-1 1-2z" opacity="0.7" />
                        </svg>
                    </div>
                    TechWiz
                </Link>

                {/* Links */}
                <div className="hidden md:flex gap-6">
                    {links.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === href
                                    ? "text-primary"
                                    : "text-muted-foreground"
                            )}
                        >
                            {label}
                        </Link>
                    ))}
                </div>

                <div className="md:hidden">
                    <Button variant="ghost" size="icon">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </Button>
                </div>

                <div className={cn(
                    "flex gap-2 transition-opacity duration-200",
                    isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                )}>
                    {!user ? (
                        <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    Login
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Choose Login Method</DialogTitle>
                                    <DialogDescription>
                                        Select your preferred way to sign in to TechWiz
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="flex flex-col gap-3 mt-4">
                                    <a
                                        href="/.auth/login/github"
                                        className="w-full"
                                        onClick={() => setIsLoginModalOpen(false)}
                                    >
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start gap-3"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                            Continue with GitHub
                                        </Button>
                                    </a>

                                    <a
                                        href="/.auth/login/aad"
                                        className="w-full"
                                        onClick={() => setIsLoginModalOpen(false)}
                                    >
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start gap-3"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.5 12.5h-11v-11h11v11zm-12 0h-11v-11h11v11zm0 12h-11v-11h11v11zm12 0h-11v-11h11v11z" />
                                            </svg>
                                            Continue with Microsoft
                                        </Button>
                                    </a>
                                </div>
                            </DialogContent>
                        </Dialog>
                    ) : (
                        <a href="/.auth/logout">
                            <Button variant="destructive">
                                Logout
                            </Button>
                        </a>
                    )}
                </div>
            </div>
        </nav>
    );
}