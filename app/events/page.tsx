import { Content } from "./Content";

async function getEvents() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events`);

  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function Events() {
  const events = await getEvents();
  return <Content eventData={events} />;
}
