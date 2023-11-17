'use client';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, FieldError, Form, Input, Label, TextField } from 'react-aria-components';
import { useRouter } from 'next/navigation';

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
  maximum_participants?: number;
}

export default function Event({ params }: Props) {
  const [authorized, setAuthorized] = useState<Boolean>(false);
  const slug = params.event_id;
  const [event, setEvent] = useState<Event | null>(null);

  const router = useRouter();

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
    try {
      fetch('/api/auth').then(response => {
        if (response.status == 200) {
          setAuthorized(true);
        } else {
          router.push('/login');
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
    try {
      fetch(`/api/event/${slug}`)
        .then(response => response.json())
        .then(response => {
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
  }, [slug, router]);

  if (authorized) {
    return (
      <main className="flex min-h-screen w-screen flex-col items-center justify-start p-4">
        {event ? (
          <div className="relative flex h-full w-full max-w-[1200px] flex-col items-center justify-center space-y-10 rounded-xl bg-gray-50 px-4 py-20 sm:px-10">
            <a
              href="/admin"
              className="absolute left-0 top-0 m-4 w-20 transform cursor-pointer text-center text-blue-500 underline duration-500"
            >
              Back
            </a>
            <h1 className="text-2xl font-bold">{event.title}</h1>
            <div className="flex w-full flex-col justify-center space-y-4 pt-10 sm:flex-row sm:space-x-4 sm:space-y-0">
              <div className="w-max-[800px] flex flex-col space-y-4 rounded-xl p-4 hover:border hover:border-blue-500 sm:w-full sm:min-w-[300px]">
                <p>{event.description}</p>
              </div>
              <div className="flex w-full flex-col justify-between rounded-xl border border-zinc-400 p-4 hover:border-blue-500 sm:w-full">
                <span>When: {event.date}</span>
                <span>Where: {event.event_location}</span>
                <span>Registration starts: {event.date}</span>
              </div>
            </div>
            <div className="flex w-full items-center justify-center">
              <Form onSubmit={handleSubmit(onSubmit)} className="mx-auto flex w-[300px] flex-col space-y-4 pt-10">
                <TextField name="name" isRequired className="flex flex-col">
                  <Label>Name</Label>
                  <Input
                    placeholder="Name"
                    {...register('name')}
                    className="focus:shadow-outline w-full appearance-none rounded border border-zinc-300  px-4 py-2 leading-tight text-gray-700 transition duration-150 ease-in-out focus:border-blue-400 focus:outline-none"
                  />
                  <FieldError />
                </TextField>
                <TextField name="email" type="email" isRequired className="flex flex-col">
                  <Label>Email</Label>
                  <Input
                    placeholder="user@email.com"
                    {...register('email')}
                    className="focus:shadow-outline w-full appearance-none rounded border border-zinc-300  px-4 py-2 leading-tight text-gray-700 transition duration-150 ease-in-out focus:border-blue-400 focus:outline-none"
                  />
                  <FieldError />
                </TextField>
                <Button
                  type="submit"
                  className="cursor w-20 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
                >
                  Submit
                </Button>
              </Form>
            </div>
            {event?.participants && <p>Participants</p>}
          </div>
        ) : (
          <h1>No event</h1>
        )}
      </main>
    );
  }
}
