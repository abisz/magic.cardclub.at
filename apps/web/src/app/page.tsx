import Image from "next/image";
import { fetchEvents, type Event } from "@/lib/events";

async function getUpcomingEvents(): Promise<Event[]> {
  const now = new Date();
  const in14Days = new Date(now);
  in14Days.setDate(in14Days.getDate() + 14);

  try {
    return await fetchEvents({ from: now, to: in14Days });
  } catch (error) {
    console.error("Failed to load upcoming events", error);
    return [];
  }
}

const whatsappGroups = [
  {
    name: "Draft",
    description: "Announcements and registration for upcoming drafts",
    inviteLink: "https://chat.whatsapp.com/KL6wum8TIjcAE1lJrrJgoc",
  },
  {
    name: "Commander",
    description: "Coordination for commander sessions",
    inviteLink: "https://chat.whatsapp.com/LWfBxpjy6n93crCEoVX9IR",
  },
];

function formatEventDate(date: string): string {
  return new Intl.DateTimeFormat("en-AT", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(date));
}

function formatEventDetails(event: Event): string {
  const parts: string[] = [];

  if (event.location) parts.push(event.location);
  if (event.description) parts.push(event.description);
  if (event.entryFee !== null) parts.push(`EUR ${event.entryFee} entry`);

  return parts.join(" - ");
}

export default async function Home() {
  const events = await getUpcomingEvents();

  return (
    <main className="mx-auto w-full max-w-[900px] px-5 py-10 text-black">
      <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-baseline">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Magic @ Card Club</h1>
          <p className="mt-2 text-sm text-zinc-700">
            Temporary page - we are building a new site. See events and join our groups below.
          </p>
        </div>
        <p className="text-sm text-zinc-600">Open play and tournaments - New players welcome</p>
      </header>

      <div className="mt-7 grid gap-7 md:grid-cols-[1fr_320px]">
        <section className="border-t-3 border-black px-5 py-4">
          <h2 className="text-2xl font-semibold">Upcoming events (next 2 weeks)</h2>

          <ul className="mt-4">
            {events.length === 0 ? (
              <li className="py-3 text-sm text-zinc-600">
                No events are currently scheduled for the next 14 days.
              </li>
            ) : (
              events.map((event) => {
                const details = formatEventDetails(event);

                return (
                  <li key={event.id} className="border-b border-dashed border-zinc-300 py-3">
                    <p className="font-semibold text-[0.95rem]">{formatEventDate(event.startDateTime)}</p>
                    <p className="mt-1 text-sm text-zinc-700">
                      <span className="font-medium">{event.title}</span>
                      {details ? ` - ${details}` : ""}
                    </p>
                  </li>
                );
              })
            )}
          </ul>

          <h3 className="mt-5 text-lg font-semibold">Quick notes</h3>
          <p className="mt-2 text-sm text-zinc-700">
            Please join our WhatsApp groups and let us know if you plan to come to any of our
            events so we can plan accordingly. For booster drafts you will need sleeves to play.
            For cube drafts nothing is required.
          </p>

          <a
            href="#whatsapp"
            className="mt-5 inline-block rounded-md bg-black px-3 py-2 text-sm font-semibold text-white md:hidden"
          >
            Join our WhatsApp groups
          </a>
        </section>

        <aside className="space-y-6">
          <section className="border-t-3 border-black px-5 py-4">
            <h3 className="text-xl font-semibold">Address</h3>
            <p className="mt-3 text-sm">
              WOW-Keepers
              <br />
              Holochergasse 53
              <br />
              1150 Vienna, Austria
            </p>
            <p className="mt-2 text-sm text-zinc-600">
              Nearest U-Bahn: U3 Johnstrasse. We are in the basement, entry directly from the
              street.
            </p>
            <a
              href="https://maps.app.goo.gl/HRWKqWG28ALz7x3D9"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block rounded-md border border-black px-3 py-2 text-sm font-semibold"
            >
              Open map
            </a>
          </section>

          <section id="whatsapp" className="border-t-3 border-black px-5 py-4">
            <h3 className="text-xl font-semibold">WhatsApp groups</h3>
            <p className="mt-2 text-sm text-zinc-600">
              Tap a link to open the group; scan the QR code to join on mobile.
            </p>

            <div className="mt-4 space-y-4">
              {whatsappGroups.map((group) => {
                const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(group.inviteLink)}`;

                return (
                  <article key={group.name} className="flex items-center gap-3">
                    <div className="flex-1">
                      <h4 className="font-semibold">{group.name}</h4>
                      <p className="mt-1 text-sm text-zinc-600">{group.description}</p>
                      <a
                        href={group.inviteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block rounded-md bg-black px-3 py-2 text-sm font-semibold text-white"
                      >
                        Open group
                      </a>
                    </div>
                    <Image
                      src={qrUrl}
                      alt={`QR code for ${group.name} WhatsApp group`}
                      width={120}
                      height={120}
                      unoptimized
                      className="h-[120px] w-[120px] border border-zinc-200 bg-zinc-100 p-1"
                    />
                  </article>
                );
              })}
            </div>

            <h4 className="mt-6 font-semibold">No WhatsApp?</h4>
            <p className="mt-1 text-sm text-zinc-600">
              If you do not use WhatsApp but want to join, please{" "}
              <a className="font-semibold underline" href="mailto:magic@cardclub.at">
                email us
              </a>{" "}
              for information.
            </p>
          </section>

          <section className="border-t-3 border-black px-5 py-4">
            <h3 className="text-xl font-semibold">FAQ</h3>
            <div className="mt-3 space-y-3 text-sm text-zinc-700">
              <details>
                <summary className="cursor-pointer font-semibold">Do I need to be an expert?</summary>
                <p className="mt-1">No - all skill levels are welcome.</p>
              </details>
              <details>
                <summary className="cursor-pointer font-semibold">How much does it cost?</summary>
                <p className="mt-1">
                  Most weekly meetups are free or have a small entry fee that is listed per event.
                </p>
              </details>
              <details>
                <summary className="cursor-pointer font-semibold">Can I bring friends?</summary>
                <p className="mt-1">
                  Yes - invite them. If you are bringing a larger group, let us know in WhatsApp.
                </p>
              </details>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}

