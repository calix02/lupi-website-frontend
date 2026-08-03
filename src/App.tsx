import { createBrowserRouter, RouterProvider } from "react-router"; 
import LupiWebsite from "./pages/LupiWebsite";
import AllAnnouncements from "./pages/Announcement/AllAnnouncement";
import ComingSoon from "./components/ComingSoon";
import Transparency from "@/pages/Transparency/Transparency";
import RootLayout from "./layout/RootLayout";
import Officials from "./pages/Officials/Officials";
import Contact from "./pages/Contact/Contact";
 
function App() { 
  const router = createBrowserRouter([ 
    {
      Component: RootLayout,
      children: [
        
           { 
      path: "/", 
      Component: LupiWebsite, 
    }, 
    { 
      path: "/all-announcements", 
      Component: AllAnnouncements, 
    }, 
     { 
      path: "/officials", 
      Component: Officials, 
    }, 
    { 
      path: "/contact", 
      Component: Contact, 
    },
     { 
      path: "/transparency", 
      Component: Transparency, 
    }, 
        { 
      path: "/coming-soon", 
      Component: ComingSoon, 
    }, 
      ],
    },
    
   
  ]); 
 
  return ( 
    <div> 
      <RouterProvider router={router} /> 
    </div> 
  ); 
} 
 
export default App; 