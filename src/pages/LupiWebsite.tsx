import Home from "./Home/Home";
import Header from "@/components/Header/Header";
import Announcement from "./Announcement/Announcement";
import { useEffect, useState } from "react";
import SplashScreen from "@/components/SplashScreen/SplashScreen";
import Tourism from "./Tourism/Tourism";
import Weather from "./Weather/Weather";
import Officials from "./Officials/Officials";
import About from "./About/About";
import Contact from "./Contact/Contact";
import Footer from "@/components/Footer/Footer";

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
            <Home/>
            <Announcement/>
            <Tourism/>
            <Weather/>
            <About/>
            <Officials/>
            <Contact/>
            <Footer/>
        </div>

    );
}