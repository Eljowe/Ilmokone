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
          <div>
            <h1>Hello</h1>
            <p>You are authorized</p>
          </div>
          {events &&
            events.map(event => (
              <div key={event.title} className="flex w-full">
                <div className="mx-auto flex w-full max-w-[500px] flex-row justify-between">
                  <h1>{event.title}</h1>
                  <button className="cursor w-20 transform rounded bg-blue-500 px-4 py-2 text-white duration-500 hover:bg-blue-400">
                    Edit
                  </button>
                </div>
              </div>
            ))}
        </div>
      </main>
    );
  }
}
