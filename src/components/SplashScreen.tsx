import LupiLOgo from "../assets/lupi_logo.png";
export default function SplashScreen(){
    return(
        <div className="inset-0 fixed z-30 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <img src={LupiLOgo} alt="Lupi Logo" className="h-20 w-auto object-contain animate-pulse" />
        </div>
    );
}