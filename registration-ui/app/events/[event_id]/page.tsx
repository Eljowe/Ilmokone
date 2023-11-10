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
}

export default function Event({ params }: Props) {
  const slug = params.event_id;
  const [event, setEvent] = useState<Event | null>({
    description:
      'Join us for an exciting day of innovation and collaboration at the TechXperience Summit 2023. This event brings together thought leaders, industry experts, and enthusiasts to explore the latest trends in technology and discuss the future of innovation.',
    title: 'TechXperience Summit 2023',
    date: '2023-11-15 09:00:00',
    registration_start: '2023-09-01 00:00:00',
  });

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
    fetch(`http://localhost:7800/api/event/${slug}`)
      .then(response => response.json())
      .then(response => {
        console.log(response[0]);
        setEvent({
          title: response[0].title,
          description: response[0].event_description,
          date: response[0].event_date,
          registration_start: response[0].registration_starts,
        });
      });
  }, [slug]);

  return (
    <main className="flex min-h-screen w-screen items-start justify-center p-4">
      <div className="flex h-full w-full max-w-[1200px] flex-col items-center justify-center space-y-10 divide-y-2 rounded-xl bg-gray-50 px-4 py-20 sm:px-10">
        {event ? (
          <div className="w-max-[800px] flex flex-col space-y-4">
            <h1 className="text-2xl font-bold">{event.title}</h1>
            <p>{event.description}</p>
            <p className="text-normal text-gray-500">Registration for the event starts: {event.registration_start}</p>
            <CountdownTimer start_time={event.registration_start} />
          </div>
        ) : (
          <h1>No event</h1>
        )}
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
    </main>
  );
}
