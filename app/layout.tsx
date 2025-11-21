import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {dark} from "@clerk/themes";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Toaster } from "sonner";


const inter = Inter({subsets:["latin"]})

export const metadata: Metadata = {
  title: "CarrerMind.AI",
  description: "Your AI Carrer Guide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{baseTheme:dark }}>
    <html lang="en">
      <body
        className={`${inter.className}`} 
      >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

            {/* Header */}
            <Header/>
            <main className="min-h-screen">
                    {children}              
            </main>            

            <Toaster richColors />
            {/* Footer */}

            <footer className="bg-muted/50 py-12 ">
              <div className="container mx-auto px-4 text-center text-gray-200" >
                <p>Developed By Adil Khan</p>
              </div>
            </footer>

          </ThemeProvider> 

      </body>
    </html>
    </ClerkProvider>

  );
}
