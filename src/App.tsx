import { createBrowserRouter, RouterProvider } from "react-router"; 
import LupiWebsite from "./pages/LupiWebsite";
import AllAnnouncements from "./pages/Announcement/AllAnnouncement";
import ComingSoon from "./components/ComingSoon";
import RootLayout from "./layout/RootLayout";
import Officials from "./pages/Officials/Officials";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import SangguniangBayan from "./pages/SangguniangBayan/SangguniangBayan";
import Government from "./pages/Government/Governement";
import PublicLayout from "./layout/PublicLayout";
import AuthLayout from "./layout/AuthLayout";
import LogIn from "@/pages/Auth/Login";
import Employees from "./pages/Employees/Employees";
import Projects from "@/pages/Projects/Projects";
import Transparency from "./pages/Transparency/Transparency";
import JobSection from "./pages/Job/JobSection";
 
function App() { 
  const router = createBrowserRouter([ 
    {
      Component: RootLayout,
      children: [
         {
     Component: PublicLayout,
     children: [
      {index: true, Component: LupiWebsite},
      {path: "/government", Component: Government},
      {path: "/sangguniangbayan", Component: SangguniangBayan},
      {path: "/officials", Component: Officials},
      {path: "/employees", Component: Employees},
      {path: "/projects", Component: Projects},
      {path: "/transparency", Component: Transparency},
      {path: "/jobs", Component: JobSection},

      {path: "/coming-soon", Component: ComingSoon},
      {path: "/about", Component: About},
      {path: "/all-annoucement", Component: AllAnnouncements},
      {path: "/contact", Component: Contact},

    
     ]
    },
    {
      Component: AuthLayout,
      children: [
        {path: "/login", Component: LogIn }
      ]
    }

      ]
    }
   
    
   
  ]); 
 
  return ( 
    <div> 
      <RouterProvider router={router} /> 
    </div> 
  ); 
} 
 
export default App; 