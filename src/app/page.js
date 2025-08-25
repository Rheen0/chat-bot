import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto flex items-center justify-center flex-col h-screen">
        {/* Wizard Icon with subtle styling */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto text-primary bg-primary/5 rounded-full flex items-center justify-center border border-primary/10 shadow-sm">
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-12 h-12">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v-.07zM17.9 17.39c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              {/* Wizard hat */}
              <path d="M12 1l-2 4h4l-2-4zm0 0l1 2-1 1-1-1 1-2z" opacity="0.7" />
            </svg>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
          Welcome to <span className="text-primary">TechWiz</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Your intelligent AI wizard companion for technology and beyond.
          Start conversations, explore your history, and manage your digital world.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="shadow-sm hover:shadow-md transition-shadow">
            <Link href="/chat" className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
              Start Chatting
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="shadow-sm hover:shadow-md transition-shadow">
            <Link href="/history" className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13,3A9,9 0 0,0 4,12H1L4.89,15.89L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3Z" />
              </svg>
              View History
            </Link>
          </Button>
        </div>
      </div>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center h-screen">
        <div className="p-4">
          <div className="w-12 h-12 mx-auto mb-3 text-primary bg-primary/5 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">Smart Conversations</h3>
          <p className="text-sm text-muted-foreground">Engage in intelligent discussions with your AI companion</p>
        </div>
        <div className="p-4">
          <div className="w-12 h-12 mx-auto mb-3 text-primary bg-primary/5 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13,3A9,9 0 0,0 4,12H1L4.89,15.89L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3Z" />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">Chat History</h3>
          <p className="text-sm text-muted-foreground">Keep track of all your conversations and insights</p>
        </div>
        <div className="p-4">
          <div className="w-12 h-12 mx-auto mb-3 text-primary bg-primary/5 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">Personal Profile</h3>
          <p className="text-sm text-muted-foreground">Customize your experience and preferences</p>
        </div>
      </div>
    </main>
  );
}