import {Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
export default function BackHomeButton(){
    return(
         <Link to="/" className="absolute top-17 left-8 flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
    );
}