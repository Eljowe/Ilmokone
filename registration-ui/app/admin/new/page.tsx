'use client';
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller, useFieldArray } from 'react-hook-form';
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  FileTrigger,
  DatePicker,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DateSegment,
  Dialog,
  Group,
  Header,
  Heading,
  Popover,
  TimeField,
  TimeValue,
  DateValue,
} from 'react-aria-components';
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
  const [eventTime, setEventTime] = useState<TimeValue | null>(null);
  const [eventDate, setEventDate] = useState<DateValue | null>(null);
  const [eventRegistrationTime, setEventRegistrationTime] = useState<TimeValue | null>(null);
  const [eventRegistrationDate, setEventRegistrationDate] = useState<DateValue | null>(null);

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
    if (eventDate && eventTime) {
      data.event_date = eventDate.toString() + ' ' + eventTime.toString();
    } else {
      return;
    }
    if (eventRegistrationDate && eventRegistrationTime) {
      data.registration_starts = eventRegistrationDate.toString() + ' ' + eventRegistrationTime.toString();
    }
    if (descriptionValue === null) {
      setDescriptionError('Event description is required');
      return;
    }
    if (file && file[0].size > 1000000) {
      setFileError('Image is too large');
      return;
    }
    console.log('trying to submit');

    const formData = new FormData();
    if (!file) return;
    formData.append('files', file[0]);
    formData.append('description', JSON.stringify(descriptionValue));
    formData.append('alcohol_options', JSON.stringify(data.alcohol_options));
    formData.append('title', data.title);
    formData.append('event_date', data.event_date);
    formData.append('registration_starts', data.registration_starts);
    formData.append('event_location', data.event_location);
    formData.append('maximum_participants', JSON.stringify(data.maximum_participants));

    console.log(formData);

    setFileError(null);
    return fetch('/api/addEvent', {
      method: 'POST',
      body: formData,
    }).then(response => {
      if (response.ok) {
        console.log('success');
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
          <div className="flex w-full flex-col">
            <Label>Event date and time</Label>
            <div className="flex w-full flex-row space-x-2">
              <DatePicker className="flex w-max flex-row space-x-2 border border-zinc-300 p-4" aria-label="event date">
                <Group className="flex w-full flex-row">
                  <DateInput className="flex w-max flex-row">{segment => <DateSegment segment={segment} />}</DateInput>
                  <Button className="rounded px-2 hover:bg-zinc-300">▼</Button>
                </Group>
                <Popover className="w-max border border-zinc-300 bg-zinc-100 p-4">
                  <Dialog>
                    <Calendar
                      onChange={e => {
                        setEventDate(e);
                      }}
                    >
                      <header className="flex w-full justify-between">
                        <Button slot="previous" className="rounded px-2 hover:bg-zinc-300">
                          ◀
                        </Button>
                        <Heading />
                        <Button slot="next" className="rounded px-2 hover:bg-zinc-300">
                          ▶
                        </Button>
                      </header>
                      <CalendarGrid>
                        {date => <CalendarCell className="rounded p-2 hover:bg-zinc-300" date={date} />}
                      </CalendarGrid>
                    </Calendar>
                  </Dialog>
                </Popover>
              </DatePicker>
              <TimeField
                className="flex w-max flex-row space-x-2 border border-zinc-300 p-4"
                hourCycle={24}
                aria-label="event time"
                isRequired
                onChange={e => {
                  setEventTime(e);
                }}
              >
                <DateInput className="flex w-full flex-row">{segment => <DateSegment segment={segment} />}</DateInput>
              </TimeField>
            </div>
          </div>
          <div className="flex w-full flex-col">
            <Label>Event registration date and time</Label>
            <div className="flex w-full flex-row space-x-2">
              <DatePicker
                className="flex w-max flex-row space-x-2 border border-zinc-300 p-4"
                aria-label="event registration date"
              >
                <Group className="flex w-full flex-row">
                  <DateInput className="flex w-max flex-row">{segment => <DateSegment segment={segment} />}</DateInput>
                  <Button className="rounded px-2 hover:bg-zinc-300">▼</Button>
                </Group>
                <Popover className="w-max border border-zinc-300 bg-zinc-100 p-4">
                  <Dialog>
                    <Calendar
                      onChange={e => {
                        setEventRegistrationDate(e);
                      }}
                    >
                      <header className="flex w-full justify-between">
                        <Button slot="previous" className="rounded px-2 hover:bg-zinc-300">
                          ◀
                        </Button>
                        <Heading />
                        <Button slot="next" className="rounded px-2 hover:bg-zinc-300">
                          ▶
                        </Button>
                      </header>
                      <CalendarGrid>
                        {date => <CalendarCell className="rounded p-2 hover:bg-zinc-300" date={date} />}
                      </CalendarGrid>
                    </Calendar>
                  </Dialog>
                </Popover>
              </DatePicker>
              <TimeField
                className="flex w-max flex-row space-x-2 border border-zinc-300 p-4"
                hourCycle={24}
                aria-label="event registration time"
                isRequired
                onChange={e => {
                  setEventRegistrationTime(e);
                }}
              >
                <DateInput className="flex w-full flex-row">{segment => <DateSegment segment={segment} />}</DateInput>
              </TimeField>
            </div>
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
