import "./globals.css";
import FloatingHearts from "./components/floatingHearts";

export const metadata = {
  title: "Happiest Birthday",
  description:
    "A special birthday surprise",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <FloatingHearts />
        {children}
      </body>
    </html>
  );
}

