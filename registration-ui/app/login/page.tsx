'use client';
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, FieldError, Form, Input, Label, TextField } from 'react-aria-components';

type Inputs = {
  password: string;
  email: string;
};

export default function Page() {
  const [authorized, setAuthorized] = useState<Boolean>(false);

  useEffect(() => {
    try {
      // Assuming 'data' is the JSON object you want to send
      fetch('/api/auth').then(response => {
        console.log(response);
        if (response.status == 200) {
          setAuthorized(true);
        }
      });
    } catch (error) {
      console.error('Error:', error);
      // Handle errors
    }
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    console.log(data);
    try {
      const response = await fetch('http://localhost:7800/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (authorized) {
    return (
      <div className="min-h-screen w-screen p-4">
        <div>
          <h1>Hello</h1>
          <p>You are logged in</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1>Not authorized</h1>
      <Form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center space-y-4 pt-10">
        <TextField name="email" type="email" isRequired className="flex flex-col">
          <Label>Name</Label>
          <Input {...register('email')} className="bg-gray-300" />
          <FieldError />
        </TextField>
        <TextField name="password" type="password" isRequired className="flex flex-col">
          <Label>Email</Label>
          <Input {...register('password')} className="bg-gray-300" />
          <FieldError />
        </TextField>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}
