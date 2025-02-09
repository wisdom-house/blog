import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  try {
    const { path } = await req.json();

    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    revalidatePath(path);
    return NextResponse.json({ message: 'Path revalidated' });
  } catch (error) {
    console.error('Error in comment submission:', error);

    return NextResponse.json(
      { error: 'Failed to revalidate' },
      { status: 500 }
    );
  }
}
