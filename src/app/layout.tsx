import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { EndSession } from "@/components/library";
import { Toaster } from "@/components/ui";
import { AuthWrapper, QueryWrapper } from "@/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StackAI Document Indexer",
  description: "Choose which of your documents should be allowed in the Knowledge Base of your Stack AI Workflow.",
};

export default function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryWrapper>
          <AuthWrapper>
            {children}
          </AuthWrapper>
        </QueryWrapper>
        <Toaster expand={false} />

        <EndSession />
      </body>
    </html>
  );
}
