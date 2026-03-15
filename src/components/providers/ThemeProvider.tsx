"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Properly type attribute based on next-themes

/* we can use it as follow:
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  <App />
</ThemeProvider>

or 

<ThemeProvider attribute={["class", "data-theme"]}>
  <App />
</ThemeProvider>
*/

type Attribute = "class" | "data-theme";

type ThemeProviderProps = {
  children: React.ReactNode;
  attribute?: Attribute | Attribute[];
  defaultTheme?: string;
  enableSystem?: boolean;
};

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}