import type { Metadata } from "next";
import {
  ClerkProvider,
} from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Pass Manager | Mo~Jasim",
  description: "Add your passwords and car details on a secure place without any security compromise, and access them from anywhere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return <div>Missing Clerk Publishable Key</div>;
  }
  
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <Toaster position="top-center" reverseOrder={false} />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}