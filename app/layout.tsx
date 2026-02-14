import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import { Toaster } from "@/components/ui/toaster";


export const metadata: Metadata = {
  title: "Alan Weiler | Software Engineer",
  description: "A portolio website for Alan Weiler",
};
const courierPrime = Courier_Prime({
  weight: "400",
  subsets: ["latin"],
});  


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${courierPrime} antialiased text-white bg-bodyColor`}
      >
        <Header />
        <StairTransition />
        <PageTransition>
            {children}
          </PageTransition>
        <Toaster />
      </body>
    </html>
  );
}
