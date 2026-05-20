async function getMessage() {
    const res = await fetch("http://localhost:1337/api/messages", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch message");
    }

    const data = await res.json();

    console.log(data);

    return data.data[0]?.text;
}

export default async function Home() {
    const message = await getMessage();

    return (
        <main style={{ padding: "2rem" }}>
            <h1>Cube Kitchen 🍽️</h1>
            <p>CMS says:</p>
            <h2>{message || "No message found"}</h2>
        </main>
    );
}