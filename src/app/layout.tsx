import type { Metadata } from "next";
import "./globals.css";
import { inter, montserrat, poppins } from "@/constants/fonts";
import MotionLazy from "@/components/MotionLazy";
import { mergeOpenGraph } from "@/lib/mergeOpenGraph";


export const metadata: Metadata = {
  title: 'Hendy Nurfrianto',
  description:
    'Welcome to my portfolio! I am Hendy Nurfrianto, a passionate frontend developer with expertise in creating dynamic and responsive web applications and mobile app. Explore my skills to see how I can help bring your ideas to life.',
  icons: {
    icon: '/icon',
    apple: '/apple-icon',
  },
  openGraph: mergeOpenGraph({
    title: 'Hendy Nurfrianto',
    description:
      'Welcome to my portfolio! I am Hendy Nurfrianto, a passionate frontend developer with expertise in creating dynamic and responsive web applications and mobile app. Explore my skills to see how I can help bring your ideas to life.',
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${inter.variable} ${poppins.variable} antialiased font-montserrat`}
      >
        <MotionLazy>{ children }</MotionLazy>
      </body>
    </html>
  );
}
