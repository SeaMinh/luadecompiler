import "./globals.css";

export const metadata = {
  title: "Lua Decompiler Pro",
  description: "Advanced Lua/Luau Bytecode Analysis Tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
