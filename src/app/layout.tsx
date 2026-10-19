import type { Metadata, Viewport } from "next";
import "./globals.css";
import { geistMono, geistSans } from "@/constants/fonts";
import MotionLazy from "@/components/MotionLazy";
import { mergeOpenGraph } from "@/lib/mergeOpenGraph";
import { PostHogProvider } from "@/providers/PostHogProvider";
import { Suspense } from "react";

const description =
  'Hendy Nurfrianto, Senior Software Engineer in Jakarta. React, Next.js, TypeScript and React Native, with fullstack Node.js, PostgreSQL and Firebase. Walk through the career journey, skills and shipped projects.'

export const metadata: Metadata = {
  title: 'Hendy Nurfrianto · Senior Software Engineer',
  description,
  icons: {
    icon: '/icon',
    apple: '/apple-icon',
  },
  openGraph: mergeOpenGraph({
    title: 'Hendy Nurfrianto · Senior Software Engineer',
    description,
  }),
};

export const viewport: Viewport = {
  themeColor: '#e0e7f5',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Suspense>
          <PostHogProvider>
            <MotionLazy>{ children }</MotionLazy>
          </PostHogProvider>
        </Suspense>
      </body>
    </html>
  );
}
