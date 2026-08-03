import Home from "./Home/Home";
import Announcement from "./Announcement/Announcement";
import { useEffect, useState } from "react";
import SplashScreen from "@/components/SplashScreen/SplashScreen";
import Tourism from "./Tourism/Tourism";
import Weather from "./Weather/Weather";
import Footer from "@/components/Footer/Footer";
import Header2 from "@/components/Header/Header2";

export default function LupiWebsite() {
    const [showSplash, setShowSplash] = useState(true);
  
    useEffect(() => {
       const timer = setTimeout(() => {
         setShowSplash(false);
       }, 3000);
       return () => clearTimeout(timer);
     }, []);

     if(showSplash){
        return <SplashScreen />;
     }
  
    return(
        <div className="w-screen">
            
            <Header2/>
            <Home/>
            <Announcement/>
            <Tourism/>
            <Weather/>
            <Footer/>
        </div>

    );
}