import { NextResponse } from "next/server";
import { tableClient } from "@/lib/table";
import { getServerUser } from "@/lib/auth-server";

export async function GET(req) {
    if (!tableClient) {
        return NextResponse.json({ history: [], error: "Storage not configured" }, { status: 500 });
    }

    const principal = getServerUser(req.headers);
    if (!principal) {
        return NextResponse.json({ history: [] }, { status: 401 });
    }

    const userId = principal.userId;
    const partition = `user:${userId}`;
    const history = [];

    const iter = tableClient.listEntities({
        queryOptions: { filter: `PartitionKey eq '${partition}'` },
    });

    for await (const e of iter) {
        history.push({
            role: e.role,
            content: e.content,
            createdAt: e.Timestamp, 
        });
    }

    // sort by time (oldest → newest)
    history.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    return NextResponse.json({ history });
}
