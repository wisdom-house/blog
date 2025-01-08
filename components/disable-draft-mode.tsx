// src/components/DisableDraftMode.tsx

'use client';

import { useDraftModeEnvironment } from 'next-sanity/hooks';

const DisableDraftMode = () => {
  const environment = useDraftModeEnvironment();

  // Only show the disable draft mode button when outside of Presentation Tool
  if (environment !== 'live' && environment !== 'unknown') {
    return null;
  }

  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-0 left-4 bg-primary text-app-text px-4 py-2 z-50"
    >
      Disable Edit Mode
    </a>
  );
};

export default DisableDraftMode;
