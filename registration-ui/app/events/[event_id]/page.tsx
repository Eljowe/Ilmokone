"use client";
import { useEffect, useState } from "react";

type Props = {
  params: {
    event_id: string;
  };
};

interface Event {
  participants?: Array<string>;
  description: string;
  title: string;
  date: string;
  registration_start: string;
}

export default function Event({ params }: Props) {
  const [event, setEvent] = useState<Event>({
    description: "first event",
    title: "First",
    date: "today",
    registration_start: "tomorrow",
  });
  const slug = params.event_id;
  useEffect(() => {
    console.log(
      "get event data here, then if none, show error page, otherwise registration form if the event registration has started."
    );
  }, [slug]);

  return (
    <main>
      <h1>{slug}</h1>
    </main>
  );
}
