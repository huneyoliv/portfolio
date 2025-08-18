"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";
import { useApp } from "../../contexts/AppContext";

const Toaster = ({ ...props }: ToasterProps) => {
  const { effectiveTheme } = useApp();

  return (
    <Sonner
      theme={effectiveTheme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
