"use client";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUser } from "@/lib/auth";

export default function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const boxRef = useRef(null);

    useEffect(() => {
        async function loadUserAndHistory() {
            const u = await getUser();
            setUser(u);

            if (u) {
                const res = await fetch("/api/history");
                if (res.ok) {
                    const data = await res.json();
                    setMessages(data.history || []);
                }
            }
        }
        loadUserAndHistory();
    }, []);

    async function send() {
        if (!input.trim() || loading || !user) return;

        // local length guard (500 chars)
        if (input.length > 500) {
            alert("Message too long (max 500 characters).");
            return;
        }

        const next = [...messages, { role: "user", content: input.trim() }];
        setMessages(next);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: next }),
            });
            const data = await res.json();
            if (res.ok) {
                setMessages([...next, { role: "assistant", content: data.reply }]);
            } else {
                setMessages([...next, { role: "assistant", content: data.error }]);
            }
        } catch {
            setMessages([
                ...next,
                { role: "assistant", content: "Sorry, something went wrong." },
            ]);
        } finally {
            setLoading(false);
            setTimeout(
                () => boxRef.current?.scrollTo(0, boxRef.current.scrollHeight),
                0
            );
        }
    }

    return (
        <main className="mx-auto max-w-2xl p-6">
            <h1 className="text-2xl font-bold mb-4">Chat</h1>

            {!user ? (
                <p className="text-gray-600">Please log in to start chatting.</p>
            ) : (
                <>
                    <div
                        ref={boxRef}
                        className="border rounded-2xl p-4 h-[420px] overflow-y-auto space-y-3 bg-white/40"
                    >
                        {messages.map((m, i) => (
                            <p
                                key={i}
                                className={
                                    m.role === "user" ? "text-blue-700" : "text-emerald-700"
                                }
                            >
                                <b>{m.role}:</b> {m.content}
                            </p>
                        ))}
                        {loading && <p className="italic text-gray-500">thinking…</p>}
                    </div>

                    <div className="flex gap-2 mt-4">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything…"
                            onKeyDown={(e) => e.key === "Enter" && send()}
                        />
                        <Button onClick={send} disabled={loading}>
                            Send
                        </Button>
                    </div>
                </>
            )}
        </main>
    );
}
