

import "./globals.css";
import ClientWrapper from "../components/ClientWrapper";
import Header from "../components/Header";
import Footer from "@/components/Footer";


export const metadata = {
  title: 'Goal Planner',
  description: 'Set your goals, plan your days, and reflect on the season!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  return (
    <html lang="en"  suppressHydrationWarning>
      <body >
        <Header/>
        <ClientWrapper>{children}</ClientWrapper>
        <Footer/>
      </body>
    </html>
  );
}