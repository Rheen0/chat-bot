"use client";
import { useState, useRef } from "react";
// If you added shadcn components:
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Page() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const boxRef = useRef(null);

  async function send() {
    if (!input.trim() || loading) return;
    const next = [...messages, { role: "user", content: input.trim() }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }), // send last turns
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.reply }]);
      // scroll to bottom
      setTimeout(() => boxRef.current?.scrollTo(0, boxRef.current.scrollHeight), 0);
    } catch {
      setMessages([...next, { role: "assistant", content: "Sorry, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold mb-4">Azure Chatbot</h1>

      <div
        ref={boxRef}
        className="border rounded-2xl p-4 h-[420px] overflow-y-auto space-y-3 bg-white/40"
      >
        {messages.map((m, i) => (
          <p key={i} className={m.role === "user" ? "text-blue-700" : "text-emerald-700"}>
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
        <Button onClick={send} disabled={loading}>Send</Button>
      </div>
    </main>
  );
}
