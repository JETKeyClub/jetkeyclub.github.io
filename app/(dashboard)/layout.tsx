import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import NavBar from "@/components/Dashboard/Navbar/Navbar";
const PoppinsFont = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400"]})

export const metadata: Metadata = {
  title: "THS Key Club",
  description: "Key Club provides opportunities to get involved in your school and community. You'll meet new people with common interests and make new, life-long friends!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${PoppinsFont.className} antialiased flex`}
      >
        <NavBar/>
        <div className="-z-10 w-full">
          <div className="w-full">
              {children}
          </div>
        </div>
      </body>
    </html>
  );
}
