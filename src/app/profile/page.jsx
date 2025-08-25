"use client";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/getUser";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ProfilePage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser().then(setUser);
    }, []);

    if (!user) {
        return (
            <main className="mx-auto max-w-xl p-6">
                <h1 className="text-2xl font-bold mb-4">Profile</h1>
                <p className="text-gray-600">You are not logged in.</p>
                <p className="mt-2 text-sm text-gray-500">
                    Please <a href="/.auth/login/github" className="underline">login with GitHub</a>
                    {" "}or{" "}
                    <a href="/.auth/login/aad" className="underline">Microsoft</a>.
                </p>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-xl p-6">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>

            <Card>
                <CardHeader>
                    <CardTitle>User Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <p><b>User ID:</b> {user.userId}</p>
                    <p><b>Email / Username:</b> {user.userDetails}</p>
                    <p><b>Provider:</b> {user.identityProvider}</p>
                    {user.userRoles?.length > 0 && (
                        <p><b>Roles:</b> {user.userRoles.join(", ")}</p>
                    )}
                </CardContent>
            </Card>
        </main>
    );
}
