"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HistoryPage() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        // Placeholder — later connect with Azure Table Storage
        setHistory([
            { id: 1, title: "Chat about Azure", date: "2025-08-20" },
            { id: 2, title: "Exploring Next.js 15", date: "2025-08-22" },
        ]);
    }, []);

    return (
        <main className="mx-auto max-w-3xl p-6">
            <h1 className="text-2xl font-bold mb-6">Chat History</h1>
            <div className="space-y-4">
                {history.map((item) => (
                    <Card key={item.id} className="hover:shadow-md transition">
                        <CardHeader>
                            <CardTitle>{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                {item.date}
                            </p>
                        </CardContent>
                    </Card>
                ))}
                {history.length === 0 && (
                    <p className="text-muted-foreground">No past chats yet.</p>
                )}
            </div>
        </main>
    );
}
