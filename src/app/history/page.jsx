"use client";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";

export default function HistoryPage() {
    const [history, setHistory] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function load() {
            const u = await getUser();
            setUser(u);

            if (u) {
                const res = await fetch("/api/history");
                if (res.ok) {
                    const data = await res.json();
                    setHistory(data.history || []);
                }
            }
        }
        load();
    }, []);

    return (
        <main className="mx-auto max-w-2xl p-6 space-y-4">
            {!user ? (
                <p className="text-gray-600">Please log in to view your history.</p>
            ) : (
                <>
                    <h1 className="text-2xl font-bold">Chat History</h1>
                    {history.length === 0 && (
                        <p className="text-gray-500">No history yet.</p>
                    )}
                    {history.map((chat, i) => (
                        <div
                            key={i}
                            className="border rounded-xl p-3 bg-white/40"
                        >
                            <p className="text-sm text-gray-700">
                                <b>{chat.role}</b>: {chat.content}
                            </p>
                        </div>
                    ))}
                </>
            )}
        </main>
    );
}
