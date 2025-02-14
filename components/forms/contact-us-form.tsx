'use client';

import axios from 'axios';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { isEmail } from 'validator';
import { Button } from '../buttons/button';
import Input from './input';
import Textarea from './textarea';
import { useTransition } from 'react';
import { IContactForm } from '@/types/contact.type';

const defaultValues: IContactForm = {
  name: '',
  email: '',
  message: '',
};

const ContactUsForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<IContactForm>({ defaultValues });

  const { handleSubmit, reset } = form;

  const onSubmit: SubmitHandler<IContactForm> = (data) => {
    startTransition(async () => {
      try {
        const response = await axios.post('/api/contact-us', data);

        if (response.status !== 200) {
          throw new Error(response.data.message || 'Failed to submit comment');
        }

        toast.success('Message sent successfully');

        reset();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data?.message ||
              'Error occurred while processing your request'
          );
        } else {
          toast.error(
            error instanceof Error ? error.message : 'Failed to submit message'
          );
        }
      }
    });
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:grid md:grid-cols-2 md:gap-6 w-full ">
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
        </div>

        <Textarea
          name="message"
          label="Message"
          validation={{
            required: 'Please enter your comment',
          }}
        />

        <Button className="mt-5 ml-auto" loading={isPending}>
          Send Message
        </Button>
      </form>
    </FormProvider>
  );
};

export default ContactUsForm;
