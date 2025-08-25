export async function getUser() {
    try {
        const res = await fetch("/.auth/me", { cache: "no-store" });
        if (!res.ok) return null;

        const data = await res.json();
        if (!data || !data.clientPrincipal) return null;

        return data.clientPrincipal; // { userId, userDetails, identityProvider, ... }
    } catch (e) {
        console.error("Auth fetch failed:", e);
        return null;
    }
}
