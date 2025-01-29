'use client';

import { useRef, useTransition } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { isEmail } from 'validator';

import { Button } from '../buttons/button';
import SvgIcon from '../icon';
import Modal, { ModalRefActions } from '../modal';
import Input from './input';
import Textarea from './textarea';

import { postCommentAction } from '@/server-actions/post-comment';

export interface CommentForm {
  name: string;
  email: string;
  comment: string;
  status: 'approved' | 'pending' | 'deleted';
}

const defaultValues: CommentForm = {
  name: '',
  email: '',
  comment: '',
  status: 'approved',
};

const PostCommentForm = ({
  postId,
  slug,
}: {
  postId: string;
  slug: string;
}) => {
  const [isPending, startTransition] = useTransition();

  const commentModalRef = useRef<ModalRefActions>(null);

  const form = useForm<CommentForm>({ defaultValues });

  const { handleSubmit } = form;

  const onSubmit: SubmitHandler<CommentForm> = (data) => {
    startTransition(async () => {
      const response = await postCommentAction({
        _id: postId,
        slug,
        ...data,
      });

      if (response.success) {
        toast.success(response.message);
        commentModalRef.current?.close();
      } else {
        toast.error(response.message);
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
