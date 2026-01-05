import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lua Decompiler | Online Tool",
  description: "Decompile Lua bytecode easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={`${inter.className} bg-gray-950`}>{children}</body>
    </html>
  );
}
