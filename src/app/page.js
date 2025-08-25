import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      <h1 className="text-5xl font-bold tracking-tight mb-6">
        Welcome to <span className="text-primary">AzureChat</span>
      </h1>
      <p className="text-lg text-muted-foreground max-w-xl mb-8">
        Your intelligent AI assistant powered by Azure OpenAI.
        Chat, recall your history, and manage your profile seamlessly.
      </p>
      <div className="flex gap-4">
        <Button asChild size="lg">
          <Link href="/chat">Start Chatting</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/history">View History</Link>
        </Button>
      </div>
    </main>
  );
}
