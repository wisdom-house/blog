'use client';

import { useRef, useTransition } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { isEmail } from 'validator';
import axios from 'axios';

import { Button } from '../buttons/button';
import SvgIcon from '../icon';
import Modal, { ModalRefActions } from '../modal';
import Input from './input';
import Textarea from './textarea';

import { client } from '@/sanity/lib/client';
export interface CommentForm {
  name: string;
  email: string;
  comment: string;
  status: 'approved' | 'hidden';
  post_title: string;
}

const defaultValues: CommentForm = {
  name: '',
  email: '',
  comment: '',
  status: 'approved',
  post_title: '',
};

const PostCommentForm = ({ postId }: { postId: string }) => {
  const [isPending, startTransition] = useTransition();

  const commentModalRef = useRef<ModalRefActions>(null);

  const form = useForm<CommentForm>({ defaultValues });

  const { handleSubmit, reset } = form;

  const onSubmit: SubmitHandler<CommentForm> = (data) => {
    startTransition(async () => {
      try {
        await client.create({
          _type: 'comment',
          post: {
            _type: 'reference',
            _ref: postId,
          },
          name: data.name,
          email: data.email,
          comment: data.comment,
          status: data.status,
        });

        toast.success('Comment submitted successfully');

        commentModalRef.current?.close();
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
    <>
      <Modal
        ref={commentModalRef}
        trigger={<Button>Leave a comment</Button>}
        disableEscapeDown
        disableOutsideClick
        hideCloseButton
      >
        {(close) => (
          <div className="bg-app-foreground p-5 w-full max-w-[700px] mx-auto">
            <div className="inline-flex w-full justify-between">
              <p className="text-a-16 md:text-a-20 font-medium mb-10">
                Add comment
              </p>

              <button className="w-max h-max">
                <SvgIcon name="close" onClick={close} className="w-5 h-5" />
              </button>
            </div>

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
                          isEmail(value) ||
                          'Please enter a valid email address',
                      },
                    }}
                    autoComplete="email"
                  />
                </div>

                <Textarea
                  name="comment"
                  label="Comment"
                  validation={{
                    required: 'Please enter your comment',
                  }}
                />

                <Button className="mt-5 ml-auto" loading={isPending}>
                  Post comment
                </Button>
              </form>
            </FormProvider>
          </div>
        )}
      </Modal>
    </>
  );
};

export default PostCommentForm;
