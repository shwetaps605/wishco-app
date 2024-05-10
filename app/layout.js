import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider} from "@clerk/nextjs";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GPTGenius",
  description: "A cool gpt page",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" data-theme="winter">
        <body className={inter.className}>
          <Providers>
            <main>
              {children}
            </main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
 