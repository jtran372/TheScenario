import {MantineProvider} from "@mantine/core";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import '@mantine/core/styles.css';

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Simple To Do List",
  description: "Simple to do list for Fluint",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
