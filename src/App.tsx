import { createBrowserRouter, RouterProvider } from "react-router"; 
import LupiWebsite from "./pages/LupiWebsite";
import AllAnnouncements from "./pages/Announcement/AllAnnouncement";
import ComingSoon from "./components/ComingSoon";
import RootLayout from "./layout/RootLayout";
 
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