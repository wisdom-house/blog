import { client } from '@/sanity/lib/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { _id, name, email, comment, status } = await request.json();

    if (!client) {
      return NextResponse.json(
        { message: 'Sanity client not configured' },
        { status: 500 }
      );
    }

    if (!_id || !name || !email || !comment) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the comment in Sanity
    await client.create({
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

    return NextResponse.json(
      { message: 'Comment submitted successfully' },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Couldn't submit comment", error: err },
      { status: 500 }
    );
  }
}
