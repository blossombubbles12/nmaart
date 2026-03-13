import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { AnimatedCursor } from "@/components/AnimatedCursor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransitionWrapper } from "@/components/PageTransitionWrapper";
import { ThemeProvider } from "@/components/ThemeProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "NMA ART | Premium Digital Art Gallery",
  description: "Experience the future of digital art with our immersive 3D and AR gallery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="smooth-scroll" suppressHydrationWarning>
      <body
        className={`${outfit.variable} antialiased selection:bg-primary selection:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <AnimatedCursor />
          <Navbar />
          <PageTransitionWrapper>
            <main className="min-h-screen pt-20">
              {children}
            </main>
          </PageTransitionWrapper>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
