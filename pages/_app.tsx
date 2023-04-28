import { EntriesProvider } from "@/context/entries";
import { UiProvider } from "@/context/ui";
import "@/styles/globals.css";
import { darkTheme } from "@/themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UiProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UiProvider>
      </EntriesProvider>
    </SnackbarProvider>
  );
}
