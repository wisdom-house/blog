'use server';

import { revalidatePath } from 'next/cache';

import { routes } from '@/lib/routes';
import { BASE_URL } from '@/utils/constants';

export async function postCommentAction(data: {
  _id: string;
  name: string;
  email: string;
  comment: string;
  slug: string;
}) {
  try {
    const response = await fetch(`${BASE_URL}/api/post-comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit comment');
    }

    revalidatePath(routes.post(data.slug));

    return { success: true, message: 'Comment submitted successfully' };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to submit comment',
    };
  }
}
