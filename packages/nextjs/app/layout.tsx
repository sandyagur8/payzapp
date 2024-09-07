import "@rainbow-me/rainbowkit/styles.css";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
// import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";
import type { Metadata,Viewport } from "next";

export const metadata :Metadata= {
  manifest:"/manifest.json",
  title: "PayZapp",
  description: "Payments Redefined",
};

export const viewport:Viewport={
  themeColor:"#abc4ff"
}

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <head>
      <meta name="theme-color" content="#3b82f6" />

      <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <ThemeProvider enableSystem>
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
