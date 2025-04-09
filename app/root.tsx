import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
  type Navigation,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { useLayoutEffect, useState } from "react";
import { ThemeProvider, createTheme, useColorScheme } from "@mui/material/styles";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  // Material icons
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/icon?family=Material+Icons"
  }
];

const theme = createTheme({
  colorSchemes: {
    // light is set too true by default
    dark: true
  },
  palette: {
    
  }
})

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider
          theme={theme}
        >
          {children}
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export type AppContext = {
  language: "EN" | "ID"
  setLanguage: (language: "EN" | "ID") => void
  navigation: Navigation
}

export default function App() {
  const [language, setLanguage] = useState<'EN' | 'ID'>('EN')
  const navigation = useNavigation()
  const { setMode } = useColorScheme()

  useLayoutEffect(() => {
    // mode from useColorScheme is always undefined first
    // So we'd get data from localStorage then set it
    const muiMode = localStorage.getItem('mui-mode')

    if (muiMode)
      setMode(muiMode as 'dark' | 'light')
    else
      setMode(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")

  }, [setMode])

  return <Outlet context={{ language, setLanguage, navigation }}/>;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
