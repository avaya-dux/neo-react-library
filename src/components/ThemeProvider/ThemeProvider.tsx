import clsx from "clsx";
import { createContext, HTMLAttributes, useContext, useState } from "react";

// inject the neo css via `postcss` rollup plugin
import "@avaya/neo/neo/dist/css/neo/neo.min.css";

export type NeoThemeMode = "light" | "dark" | "dynamic";

export type NeoThemeContext = {
  mode: NeoThemeMode;
  setMode: (mode: NeoThemeMode) => void;
};

const Context = createContext<null | NeoThemeContext>(null);

export interface NeoThemeProviderProps extends HTMLAttributes<HTMLDivElement> {
  initialMode?: NeoThemeMode;
}

export function NeoThemeProvider({
  className,
  initialMode,
  ...rest
}: NeoThemeProviderProps) {
  const [mode, setMode] = useState<NeoThemeMode>(initialMode || "light");

  return (
    <Context.Provider value={{ mode, setMode }}>
      <div
        className={clsx(
          className,
          "neo-global-colors",
          mode === "dark" && "neo-dark",
          mode === "dynamic" && "neo-dynamic"
        )}
        {...rest}
      />
    </Context.Provider>
  );
}

export const useNeoTheme = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("`useNeoTheme` must be used within `NeoThemeProvider`.");
  }

  return context;
};
