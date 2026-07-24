import Home2 from "./Home/Home2";
import Header2 from "@/components/Header/Header2";
import Announcement from "./Announcement/Announcement";

export default function LupiWebsite() {
    return(
        <div className="w-screen">
            <Header2/>
            <Home2/>
            <Announcement/>
        </div>

    );
}