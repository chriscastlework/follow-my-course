import type { Metadata } from "next";
import "next-cloudinary/dist/cld-video-player.css";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Footer from "@/components/Footer";
import TanStackProvider from "@/providers/TanStackProvider";
import { Toaster } from "@/components/ui/toaster";
import { Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import TopMenu from "@/components/layout/TopMenu";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Follow My Course",
  description:
    "Follow My Course is a platform where you can learn from the best instructors in the world. We offer a wide range of courses from programming to design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {/* <div className="dark:bg-dark-300 bg-light-300"> */}
          <div className="flex-1 pt-12">
            <TanStackProvider>
              <TopMenu />
              {children}
            </TanStackProvider>
          </div>
          <Footer />
          {/* </div> */}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
