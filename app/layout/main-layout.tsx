import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { Montserrat } from "next/font/google";

import Navbar from "@/layout/navbar";
import { routes } from "@/data/navigationRoutes";
import { classNames } from "@/utility/classNames";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const montserrat = Montserrat({
  subsets: ["latin"],
});

const Footer = dynamic(() => import("@/layout/footer"), { ssr: true });

export interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout(props: MainLayoutProps) {
  return (
    <>
      <div className={classNames("min-h-screen", montserrat.className)}>
        <Navbar routes={routes} />
        <main>
          {props.children}
          <SpeedInsights />
          <Analytics />
        </main>
      </div>
      <Footer />
    </>
  );
}
