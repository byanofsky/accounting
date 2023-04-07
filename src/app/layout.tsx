import NavBar from "@/components/NavBar";
import "./globals.css";

export const metadata = {
  title: "Accounting",
  description: "Simple expense tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <div className="mx-auto max-w-prose bg-red-300 p-4 rounded-md border-red-600 border-2 my-2">
          Warning: This is just a test app. It is not secure. Assume all data
          entered is publicly accessible, including email address and password.
        </div>
        {children}
      </body>
    </html>
  );
}
