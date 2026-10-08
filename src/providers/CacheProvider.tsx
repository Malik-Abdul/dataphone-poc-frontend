"use client";

import * as React from "react";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "@/lib/mui/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={clientSideEmotionCache}>{children}</CacheProvider>
  );
}
