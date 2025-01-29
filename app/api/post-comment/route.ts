import { client } from '@/sanity/lib/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { _id, name, email, comment, status } = await request.json();

  if (!client) {
    console.log('Sanity client not configured');
    return NextResponse.json(
      { message: 'Sanity client not configured' },
      { status: 500 }
    );
  }

  if (!_id || !name || !email || !comment) {
    console.log('Missing required fields');
    return NextResponse.json(
      { message: 'Missing required fields' },
      { status: 400 }
    );
  }

  try {
    const result = await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id,
      },
      name,
      email,
      comment,
      status,
    });

    console.log('Comment created successfully:', result);

    return NextResponse.json(
      { message: 'Comment submitted successfully' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error in comment submission:', err);

    return NextResponse.json(
      { message: "Couldn't submit comment", error: err },
      { status: 500 }
    );
  }
}
