'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, FieldError, Form, Input, Label, TextField, FileTrigger } from 'react-aria-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type Inputs = {
  title: string;
  event_description: string;
  alcohol_options: Boolean;
  event_date: string;
  registration_starts: string;
  event_location: string;
  maximum_participants: number;
};

const NewEventPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [descriptionValue, setDescriptionValue] = useState('');
  let [file, setFile] = useState<string[] | null>(null);

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(descriptionValue);
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center p-4">
      <h1>Create New Event</h1>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-[300px] flex-col space-y-8 pt-10 sm:w-3/4 sm:max-w-[600px]"
      >
        <TextField name="title" isRequired className="flex flex-col">
          <Label>Event name</Label>
          <Input
            placeholder="name"
            {...register('title')}
            className="focus:shadow-outline w-full appearance-none rounded border border-zinc-300  px-4 py-2 leading-tight text-gray-700 transition duration-150 ease-in-out focus:border-blue-400 focus:outline-none"
          />
          <FieldError />
        </TextField>
        <TextField name="description" isRequired className="flex flex-col">
          <Label>Event description</Label>
          <ReactQuill theme="snow" onChange={setDescriptionValue} />;
          <FieldError />
        </TextField>

        <FileTrigger
          onSelect={e => {
            let files = Array.from(e);
            let filenames = files.map(file => file.name);
            setFile(filenames);
          }}
        >
          <Label>Event image</Label>
          <Button className="border border-zinc-300 p-4">Select a file</Button>
        </FileTrigger>
        {file && file}
        <Button type="submit" className="cursor w-20 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-400">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default NewEventPage;
