import Home from "@/pages/public/Home/Home";
import { useEffect, useState } from "react";
import SplashScreen from "@/components/SplashScreen/SplashScreen";
import Tourism from "./Tourism/Tourism";
import Weather from "./Weather/Weather";
import Header from "@/components/Header/Header";
import PublicFigure from "./public/PublicFigure/PublicFigure";
import BarangayDirectory from "./public/Barangay/BarangayDirectory";

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
      <Home />
      <PublicFigure />
      <BarangayDirectory />
      <Tourism />
      <Weather />
    </div>
  );
}
