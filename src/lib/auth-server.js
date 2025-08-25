export function getServerUser(headers) {
    const encoded = headers.get("x-ms-client-principal");
    if (!encoded) return null;
    try {
        const json = Buffer.from(encoded, "base64").toString("utf8");
        const principal = JSON.parse(json);
        // principal.userId, principal.userDetails, principal.identityProvider, principal.userRoles
        return principal || null;
    } catch {
        return null;
    }
}
