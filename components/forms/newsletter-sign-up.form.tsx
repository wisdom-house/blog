'use client';

import { isEmail } from 'validator';
import { Button } from '../buttons/button';
import Input from './input';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useTransition } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

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

  const onSubmit: SubmitHandler<INewsLetterSignUp> = (data) => {
    startTransition(async () => {
      try {
        const response = await axios.post('/api/newsletter', data);

        if (response.status !== 200) {
          throw new Error(response.data.message || 'Failed to submit comment');
        }

        toast.success('Comment submitted successfully');

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
