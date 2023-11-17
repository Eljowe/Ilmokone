'use client';
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller, useFieldArray } from 'react-hook-form';
import { Button, FieldError, Form, Input, Label, TextField, FileTrigger } from 'react-aria-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRouter } from 'next/navigation';

type Inputs = {
  title: string;
  event_description: string;
  alcohol_options: Boolean;
  event_date: string;
  registration_starts: string;
  event_location: string;
  maximum_participants: number;
  event_picture: string;
};

const NewEventPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [authorized, setAuthorized] = useState<Boolean>(false);
  const [descriptionValue, setDescriptionValue] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  let [file, setFile] = useState<File[] | null>(null);
  let [fileName, setFileName] = useState<string[] | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const router = useRouter();

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
  }, [router]);

  const onSubmit: SubmitHandler<Inputs> = data => {
    if (descriptionValue === null) {
      setDescriptionError('Event description is required');
      return;
    }
    if (file && file[0].size > 1000000) {
      setFileError('Image is too large');
      return;
    }
    console.log('tries to submit');
    console.log(data);
    console.log(descriptionValue);
    console.log(file);

    const formData = new FormData();
    if (!file) return;
    formData.append('files', file[0]);
    data = { ...data, event_picture: file[0].name };
    formData.append('description', JSON.stringify(descriptionValue));
    setFileError(null);
    return fetch('/api/addEvent', {
      method: 'POST',
      body: formData,
    }).then(response => {
      if (response.ok) {
      } else {
        console.log('error');
      }
    });
  };
  if (authorized) {
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
              {...register('title', {
                required: 'Event title is required',
              })}
              className="focus:shadow-outline w-full appearance-none border border-zinc-300  px-4 py-2 leading-tight text-gray-700 transition duration-150 ease-in-out focus:border-blue-400 focus:outline-none"
            />
            <FieldError />
          </TextField>
          {errors.title && <span className="text-red-600">Event title is required</span>}
          <TextField name="description" isRequired className="flex flex-col">
            <Label>Event description</Label>
            <ReactQuill theme="snow" onChange={setDescriptionValue} />;
            <FieldError />
          </TextField>
          {descriptionError && <span className="text-red-600">Event description is required</span>}
          {errors.event_description && <span>Event description is required</span>}
          <div className="flex w-full flex-col">
            <FileTrigger
              {...register('event_picture', {
                required: 'Event picture is required',
              })}
              onSelect={e => {
                let files = Array.from(e as FileList);
                setFile(files);
                let filenames = files.map(file => file.name);
                setFileName(filenames);
              }}
            >
              <Label>Event image</Label>
              <Button className="border border-zinc-300 p-4">Select a file</Button>
              <FieldError />
              {errors.event_picture && <span className="text-red-600">Event image is required</span>}
            </FileTrigger>
            {file && <span>{fileName}</span>}
            {fileError && <span className="text-red-600">Image is too large</span>}
          </div>

          <Button type="submit" className="cursor w-20 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-400">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
};

export default NewEventPage;
