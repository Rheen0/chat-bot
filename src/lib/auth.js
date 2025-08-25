export async function getUser() {
    try {
        const res = await fetch("/.auth/me");
        if (!res.ok) return null;
        const data = await res.json();
        return data.clientPrincipal || null;
    } catch (e) {
        return null;
    }
}
