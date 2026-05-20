import { fetchEvents } from "@/lib/events";

async function getEvents() {
  return fetchEvents();
}

export default async function EventsPage() {
    const events = await getEvents();

    return (
        <main className="mx-auto max-w-3xl p-8">
            <h1 className="text-4xl font-bold">Upcoming Events</h1>

            <div className="mt-8 space-y-6">
                {events.map((event) => (
                    <article key={event.id} className="rounded-xl border p-6">
                        <p className="text-sm uppercase tracking-wide">
                            {event.eventType ?? "event"}
                        </p>

                        <h2 className="mt-2 text-2xl font-semibold">
                            {event.title}
                        </h2>

                        <p className="mt-2">
                            {new Date(event.startDateTime).toLocaleString("en-AT", {
                                dateStyle: "full",
                                timeStyle: "short",
                            })}
                        </p>

                        {event.location && <p className="mt-2">{event.location}</p>}

                        {event.entryFee !== null && (
                            <p className="mt-2">Entry: {event.entryFee}</p>
                        )}
                    </article>
                ))}
            </div>
        </main>
    );
}