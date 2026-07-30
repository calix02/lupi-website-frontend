import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

 type SocialCardProps = {
        variants : any;
        title : string;
        kind: string;
        link: string;
        nameLink: string;
        tags : string;
        
    }
export default function SocialCard({variants, title, kind, link, nameLink,tags} : SocialCardProps){
   
    return(
        <motion.div
              variants={variants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 backdrop-blur-xl shadow-xl shadow-slate-200/50 flex items-start gap-4"
            >
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-blue-600 group-hover:w-1.5 transition-all" />
              <div className="h-12 w-12 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                <ExternalLink className="h-6 w-6" />
              </div>
              <div className="space-y-1 flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{kind}</span>
                <h4 className="text-lg font-bold text-slate-900">{title}</h4>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  <span>{nameLink}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <p className="text-xs text-slate-500">{tags}</p>
              </div>
            </motion.div>

    );
}