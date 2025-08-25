"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
    // Placeholder: later use Azure SWA Auth context
    const user = {
        name: "Guest User",
        email: "guest@example.com",
        provider: "Not signed in",
    };

    return (
        <main className="mx-auto max-w-xl p-6">
            <h1 className="text-2xl font-bold mb-6">Profile</h1>
            <Card>
                <CardHeader>
                    <CardTitle>User Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p><b>Name:</b> {user.name}</p>
                    <p><b>Email:</b> {user.email}</p>
                    <p><b>Provider:</b> {user.provider}</p>
                </CardContent>
            </Card>

            <div className="mt-6 flex gap-4">
                <Button variant="outline">Sign In</Button>
                <Button variant="destructive">Sign Out</Button>
            </div>
        </main>
    );
}
