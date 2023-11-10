'use client';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, FieldError, Form, Input, Label, TextField } from 'react-aria-components';
import CountdownTimer from './components/CountdownTimer';

type Props = {
  params: {
    event_id: string;
  };
};

type Inputs = {
  name: string;
  email: string;
};

interface Event {
  participants?: Array<string>;
  description: string;
  title: string;
  date: string;
  registration_start: string;
  event_location?: string;
}

export default function Event({ params }: Props) {
  const slug = params.event_id;
  const [event, setEvent] = useState<Event | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);
  };

  useEffect(() => {
    console.log(
      'get event data here, then if none, show error page, otherwise registration form if the event registration has started.'
    );
    try {
      fetch(`http://localhost:7800/api/event/${slug}`)
        .then(response => response.json())
        .then(response => {
          console.log(response[0]);
          setEvent({
            title: response[0].title,
            description: response[0].event_description,
            date: response[0].event_date,
            registration_start: response[0].registration_starts,
            event_location: response[0].event_location,
          });
        });
    } catch (e) {
      return;
    }
  }, [slug]);

  return (
    <main className="flex min-h-screen w-screen items-start justify-center p-4">
      {event ? (
        <div className="flex h-full w-full max-w-[1200px] flex-col items-center justify-center space-y-10 divide-y-2 rounded-xl bg-gray-50 px-4 py-20 sm:px-10">
          <h1 className="text-2xl font-bold">{event.title}</h1>
          <div className="flex w-full flex-col justify-center space-y-4 pt-10 sm:flex-row sm:space-x-4 sm:space-y-0">
            <div className="w-max-[800px] flex flex-col space-y-4 sm:w-full sm:min-w-[300px]">
              <p>{event.description}</p>
            </div>
            <div className="flex w-full flex-col justify-between rounded-xl border border-zinc-400 p-4 sm:w-full">
              <span>When: {event.date}</span>
              <span>Where: {event.event_location}</span>
              <span>Registration starts: {event.date}</span>
            </div>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center space-y-4 pt-10">
            <TextField name="name" isRequired className="flex flex-col">
              <Label>Name</Label>
              <Input {...register('name')} />
              <FieldError />
            </TextField>
            <TextField name="email" type="email" isRequired className="flex flex-col">
              <Label>Email</Label>
              <Input {...register('email')} />
              <FieldError />
            </TextField>
            <Button type="submit">Submit</Button>
          </Form>
          {event?.participants && <p>Participants</p>}
        </div>
      ) : (
        <h1>No event</h1>
      )}
    </main>
  );
}
