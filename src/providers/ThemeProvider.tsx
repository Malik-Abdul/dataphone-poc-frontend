"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { CssBaseline } from "@mui/material";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used inside ThemeProvider");
  }

  return context;
}

interface Props {
  children: ReactNode;
}

export default function ThemeProvider({ children }: Props) {
  // const [mode, setMode] = useState<ThemeMode>(() => {
  //   if (typeof window === "undefined") {
  //     return "light";
  //   }

  //   return (localStorage.getItem("theme-mode") as ThemeMode | null) ?? "light";
  // });

  const [mode, setMode] = useState<ThemeMode>("light");

  const toggleTheme = () => {
    // setMode((prev) => {
    //   const next = prev === "light" ? "dark" : "light";
    //   localStorage.setItem("theme-mode", next);
    //   return next;
    // });
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => {
    return responsiveFontSizes(
      createTheme({
        palette: {
          mode,

          primary: {
            main: "#1976d2",
          },

          secondary: {
            main: "#9c27b0",
          },

          background: {
            default: mode === "light" ? "#ffffff" : "#000306",
            paper: mode === "light" ? "#ffffff" : "#1e1e1e",
          },

          text: {
            primary: mode === "light" ? "#000000" : "#ffffff",
            secondary: mode === "light" ? "#666666" : "#b0b0b0",
          },
        },

        shape: {
          borderRadius: 10,
        },

        typography: {
          fontFamily: [
            "Inter",
            "Roboto",
            "Helvetica",
            "Arial",
            "sans-serif",
          ].join(","),
        },

        components: {
          MuiCssBaseline: {
            styleOverrides: {
              html: {
                height: "100%",
                overscrollBehavior: "none",
              },

              body: {
                height: "100%",
                margin: 0,
                padding: 0,
              },
            },
          },

          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },
        },
      })
    );
  }, [mode]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleTheme,
      }}
    >
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
