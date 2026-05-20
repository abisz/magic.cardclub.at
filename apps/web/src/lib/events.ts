export type Event = {
  id: number;
  title: string;
  description: string | null;
  startDateTime: string;
  endDateTime: string | null;
  location: string | null;
  eventType: "cube" | "booster-draft" | "special" | null;
  entryFee: number | null;
  capacity: number | null;
};

type EventsResponse = {
  data: Event[];
};

type EventRange = {
  from?: Date;
  to?: Date;
};

const STRAPI_URL = process.env.STRAPI_URL ?? process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

export async function fetchEvents(range?: EventRange): Promise<Event[]> {
  const query = new URLSearchParams({
    "sort[0]": "startDateTime:asc",
    "pagination[pageSize]": "100",
  });

  if (range?.from) {
    query.set("filters[startDateTime][$gte]", range.from.toISOString());
  }

  if (range?.to) {
    query.set("filters[startDateTime][$lte]", range.to.toISOString());
  }

  const res = await fetch(`${STRAPI_URL}/api/events?${query.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch events (${res.status})`);
  }

  const payload = (await res.json()) as EventsResponse;
  return payload.data;
}

