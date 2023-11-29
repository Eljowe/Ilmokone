'use client';
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, FieldError, Form, Input, Label, TextField } from 'react-aria-components';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type Inputs = {
  password: string;
  email: string;
};

export default function Page() {
  const [authorized, setAuthorized] = useState<Boolean>(false);
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<String | null>(null);
  useEffect(() => {
    try {
      // Assuming 'data' is the JSON object you want to send
      fetch('http://localhost:7800/api/auth').then(response => {
        if (response.status == 200) {
          setAuthorized(true);
          router.push('http://localhost:7800/admin');
        }
      });
    } catch (error) {
      console.error('Error:', error);
      // Handle errors
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(response.status);
      if (response.status == 200) {
        toast.success('Login successful');
        router.push('/admin');
      } else {
        toast.error('Login failed');
        setErrorMsg('login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Login failed');
      setErrorMsg('login failed');
    }
  };

  if (authorized) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <h1>Logged in, redirecting...</h1>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <Form onSubmit={handleSubmit(onSubmit)} className="mx-auto flex w-[300px] flex-col space-y-4 pt-10">
        <TextField name="email" type="email" isRequired className="flex flex-col">
          <Label>Name</Label>
          <Input
            {...register('email')}
            className="focus:shadow-outline w-full appearance-none rounded border border-zinc-300  px-4 py-2 leading-tight text-gray-700 transition duration-150 ease-in-out focus:border-blue-400 focus:outline-none"
          />
          <FieldError />
        </TextField>
        <TextField name="password" type="password" isRequired className="flex flex-col">
          <Label>Email</Label>
          <Input
            {...register('password')}
            className="focus:shadow-outline w-full appearance-none rounded border border-zinc-300  px-4 py-2 leading-tight text-gray-700 transition duration-150 ease-in-out focus:border-blue-400 focus:outline-none"
          />
          <FieldError />
        </TextField>
        <Button type="submit" className="cursor w-20 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-400">
          Login
        </Button>
      </Form>
      {errorMsg && <p>{errorMsg}</p>}
    </div>
  );
}
