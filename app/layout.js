import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider} from "@clerk/nextjs";
import Providers from "./providers";
import Header from "../components/Header"
import Footer from "../components/Footer"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wishco",
  description: "A cool gpt page",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" data-theme="dracula">
        <body className={inter.className}>
          <Providers>
            <main className='bg-base-200 flex flex-col min-h-[100vh]'>
              <Header/>
              <div className='px-20 py-8 flex-grow'>
                {children}
              </div>
              <Footer/>
            </main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
 

