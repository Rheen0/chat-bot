import { NextResponse } from "next/server";
import { TableClient } from "@azure/data-tables";
import { v4 as uuidv4 } from "uuid";
import { getUser } from "@/lib/auth";

// Initialize tableClient lazily when needed
let tableClient;

function getTableClient() {
    if (!tableClient) {
        const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
        if (!connectionString) {
            throw new Error("AZURE_STORAGE_CONNECTION_STRING is not set");
        }
        tableClient = TableClient.fromConnectionString(
            connectionString,
            "ChatHistory"
        );
    }
    return tableClient;
}

const DAILY_LIMIT = 20;
const MAX_MESSAGE_LENGTH = 500;

export async function POST(req) {
    try {
        const user = await getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { messages } = await req.json();
        if (!messages || messages.length === 0) {
            return NextResponse.json({ error: "No messages provided" }, { status: 400 });
        }

        const lastMessage = messages[messages.length - 1];

        // length guard
        if (lastMessage.content.length > MAX_MESSAGE_LENGTH) {
            return NextResponse.json(
                { error: `Message too long (max ${MAX_MESSAGE_LENGTH} characters).` },
                { status: 400 }
            );
        }

        const tableClient = getTableClient();

        // daily limit guard
        const today = new Date().toISOString().split("T")[0];
        let count = 0;

        const entities = tableClient.listEntities({
            queryOptions: {
                filter: `PartitionKey eq 'user:${user.userId}'`
            }
        });

        for await (const entity of entities) {
            if (entity.Timestamp && entity.Timestamp.startsWith(today)) {
                count++;
            }
        }

        if (count >= DAILY_LIMIT) {
            return NextResponse.json(
                { error: "Daily message limit reached" },
                { status: 429 }
            );
        }

        // store user message
        await tableClient.createEntity({
            partitionKey: `user:${user.userId}`,
            rowKey: uuidv4(),
            userId: user.userId,
            role: "user",
            content: lastMessage.content,
            Timestamp: new Date().toISOString(),
        });

        // temporary echo reply (swap with OpenAI later)
        const reply = `Echo: ${lastMessage.content}`;

        // store assistant message
        await tableClient.createEntity({
            partitionKey: `user:${user.userId}`,
            rowKey: uuidv4(),
            userId: user.userId,
            role: "assistant",
            content: reply,
            Timestamp: new Date().toISOString(),
        });

        return NextResponse.json({ reply });

    } catch (error) {
        console.error("API Error:", error);

        // Handle missing connection string specifically
        if (error.message.includes("AZURE_STORAGE_CONNECTION_STRING is not set")) {
            return NextResponse.json(
                { error: "Storage service not configured. Please check environment variables." },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}