import { TableClient } from "@azure/data-tables";

const tableName = "ChatHistory";
const conn = process.env.AZURE_STORAGE_CONNECTION_STRING;

if (!conn) {
    console.warn("AZURE_STORAGE_CONNECTION_STRING is not set.");
}

export const tableClient = conn
    ? TableClient.fromConnectionString(conn, tableName)
    : null;
