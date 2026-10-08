import { ReactNode } from "react";

import CacheProvider from "./CacheProvider";
import ThemeProvider from "./ThemeProvider";
import ReactQueryClientProvider from "./ReactQueryClientProvider";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <CacheProvider>
      <ThemeProvider mode="dark">
        <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
