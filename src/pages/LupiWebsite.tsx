import Home2 from "./Home/Home2";
import Header from "@/components/Header/Header";
import Announcement from "./Announcement/Announcement";
import { useEffect, useState } from "react";
import SplashScreen from "@/components/SplashScreen/SplashScreen";

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
            <Header/>
            <Home2/>
            <Announcement/>
        </div>

    );
}