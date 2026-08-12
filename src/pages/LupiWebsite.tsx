import Home from "@/pages/public/Home/Home2";
import Announcement from "./public/Announcement/Announcement";
import { useEffect, useState } from "react";
import SplashScreen from "@/components/SplashScreen/SplashScreen";
import Tourism from "./Tourism/Tourism";
import Weather from "./Weather/Weather";
import Header from "@/components/Header/Header";
import PublicFigure from "./public/PublicFigure/PublicFigure";

export default function LupiWebsite() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="w-screen">
      <Header />
      <Home />
      <PublicFigure />
    </div>
  );
}
