
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "./component/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="h-screen"
      >
        <nav className="bg-black text-white ">
        <Navbar/>
        </nav>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
