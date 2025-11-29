import { Poppins } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Devlynxio",
  description: "Premium IT Solutions",
   icons: {
    icon: "/logo.png",    
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
          ${poppins.variable}
          antialiased
          bg-black 
          text-white 
          overflow-x-hidden
        `}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
