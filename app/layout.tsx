
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "./component/Navbar";
import ApolloWrapper from "./component/ApolloWrapper";

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
        <ApolloWrapper>
        <nav className="bg-black text-white ">
        <Navbar/>
        </nav>
        {children}
        <Toaster position="top-right" />
        </ApolloWrapper>
      </body>
    </html>
  );
}
