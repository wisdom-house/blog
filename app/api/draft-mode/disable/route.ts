import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { routes } from '@/lib/routes';

export const GET = async (req: NextRequest) => {
  (await draftMode()).disable();

  return NextResponse.redirect(new URL(routes.home(), req.url));
};
