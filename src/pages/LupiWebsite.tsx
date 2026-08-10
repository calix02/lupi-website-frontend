import Home from "@/pages/Home/Home2";
import Announcement from "./Announcement/Announcement";
import { useEffect, useState } from "react";
import SplashScreen from "@/components/SplashScreen/SplashScreen";
import Tourism from "./Tourism/Tourism";
import Weather from "./Weather/Weather";
import Header from "@/components/Header/Header";

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
      <Announcement />
      <Tourism />
      <Weather />
    </div>
  );
}
