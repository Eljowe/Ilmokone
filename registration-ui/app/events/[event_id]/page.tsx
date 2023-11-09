'use client';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, FieldError, Form, Input, Label, TextField } from 'react-aria-components';

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
    description: 'first event',
    title: 'First',
    date: 'today',
    registration_start: 'tomorrow',
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
          description: response[0].description,
          date: response[0].event_date,
          registration_start: response[0].registration_starts,
        });
      });
  }, [slug]);

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="flex h-3/4 w-3/4 flex-col items-center justify-center rounded-xl bg-blue-50 p-4">
        {event ? <h1>{event.title}</h1> : <h1>No event</h1>}
        <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start space-y-2">
          <TextField name="name" isRequired className="flex flex-col">
            <Label>Name</Label>
            <input defaultValue="John Doe" {...register('name')} />
          </TextField>
          <TextField name="email" type="email" isRequired className="flex flex-col">
            <Label>Email</Label>
            <input {...register('email', { required: true })} />
          </TextField>

          {errors.email && <span>This field is required</span>}

          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </main>
  );
}
