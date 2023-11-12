'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Event {
  participants?: Array<string>;
  description: string;
  title: string;
  date: string;
  registration_start: string;
  event_location?: string;
  maximum_participants?: number;
  id: number;
}

export default function Page() {
  const [authorized, setAuthorized] = useState<Boolean>(false);
  const [events, setEvents] = useState<Array<Event> | null>(null);
  const router = useRouter();
  useEffect(() => {
    try {
      fetch('/api/auth').then(response => {
        if (response.status == 200) {
          setAuthorized(true);
          fetch('/api/events')
            .then(response => response.json())
            .then(response => {
              const events: Event[] = response.map((event: any) => ({
                participants: event.participants || [],
                description: event.description,
                title: event.title,
                date: event.date,
                registration_start: event.registration_start,
                event_location: event.event_location,
                maximum_participants: event.maximum_participants,
                id: event.id,
              }));
              setEvents(events);
            });
        } else {
          router.push('/login');
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }, [router]);

  if (authorized) {
    return (
      <main className="flex min-h-screen w-screen items-start justify-center p-4">
        <div className="flex h-full w-full max-w-[1200px] flex-col items-center justify-center space-y-10 divide-y-2 rounded-xl bg-gray-50 px-4 py-20 sm:px-10">
          <h1 className="text-2xl">Events control panel</h1>
          <div className="flex w-full flex-col space-y-4 pt-4">
            {events &&
              events.map(event => (
                <div
                  key={event.title}
                  className="mx-auto flex w-full max-w-[500px] flex-row justify-between rounded border border-zinc-400 p-2"
                >
                  <h1 className="my-auto">{event.title}</h1>
                  <a
                    href={`/admin/event/${event.id}`}
                    className="cursor w-20 transform rounded bg-blue-500 px-4 py-2 text-center text-white duration-500 hover:bg-blue-400"
                  >
                    Edit
                  </a>
                </div>
              ))}
          </div>
        </div>
      </main>
    );
  }
}
