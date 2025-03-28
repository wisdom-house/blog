'use client';

import axios from 'axios';
import { useTransition } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '../buttons/button';
import Input from './input';

import { client } from '@/sanity/lib/client';
import { isEmail } from 'validator';

interface INewsLetterSignUp {
  name: string;
  email: string;
}

const defaultValues: INewsLetterSignUp = {
  name: '',
  email: '',
};
const NewsletterSignUp = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<INewsLetterSignUp>({ defaultValues });

  const { handleSubmit, reset } = form;

  const onSubmit: SubmitHandler<INewsLetterSignUp> = ({ name, email }) => {
    startTransition(async () => {
      try {
        await client.create({
          _type: 'newsletter',
          name,
          email,
        });

        toast.success('Newsletter sign up successful');

        reset();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data?.message ||
              'Error occurred while processing your request'
          );
        } else {
          toast.error(
            error instanceof Error ? error.message : 'Failed to submit comment'
          );
        }
      }
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="name"
          label="Name"
          type="text"
          validation={{
            required: 'Please enter your name',
          }}
          autoComplete="name"
        />

        <Input
          name="email"
          label="Email Address"
          type="email"
          validation={{
            required: 'Please enter your email',
            validate: {
              isValidEmail: (value) =>
                isEmail(value) || 'Please enter a valid email address',
            },
          }}
          autoComplete="email"
        />

        <Button className="mt-5 ml-auto" loading={isPending}>
          Subscribe
        </Button>
      </form>
    </FormProvider>
  );
};

export default NewsletterSignUp;
