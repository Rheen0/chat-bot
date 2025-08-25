const endpoint = process.env.AZURE_OPENAI_ENDPOINT;      // e.g. https://<res>.openai.azure.com
const apiKey = process.env.AZURE_OPENAI_KEY;
const deploy = process.env.AZURE_OPENAI_DEPLOYMENT;    // your deployment name

// Current Azure OpenAI REST (chat completions). Track API lifecycle docs for updates.
const apiVersion = "2024-10-21"; // update if you opt into v1 later

// Reuse a single HTTP client (global scope) for Functions cold-start efficiency.
module.exports = async function (context, req) {
    try {
        const userMessages = Array.isArray(req.body?.messages) ? req.body.messages : [];
        const trimmed = userMessages.slice(-10); // keep last 10 turns to save tokens

        const messages = [
            { role: "system", content: "You are a helpful, concise assistant." },
            ...trimmed
        ];

        const url = `${endpoint}/openai/deployments/${deploy}/chat/completions?api-version=${apiVersion}`;

        const resp = await fetch(url, {
            method: "POST",
            headers: {
                "api-key": apiKey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messages,
                temperature: 0.6,
                max_tokens: 300 // cap output to control cost
            })
        });

        if (!resp.ok) {
            const t = await resp.text();
            context.res = { status: resp.status, body: { error: t } };
            return;
        }

        const data = await resp.json();
        const reply = data?.choices?.[0]?.message?.content ?? "No reply.";
        context.res = { status: 200, body: { reply } };
    } catch (err) {
        context.log.error(err);
        context.res = { status: 500, body: { error: "Server error." } };
    }
};
