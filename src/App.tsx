import { createBrowserRouter, RouterProvider } from "react-router";
import LupiWebsite from "./pages/LupiWebsite";
import AllAnnouncements from "./pages/public/Announcement/AllAnnouncement";
import ComingSoon from "./components/ComingSoon";
import RootLayout from "./layout/RootLayout";
import Officials from "./pages/Officials/Officials";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import SangguniangBayan from "./pages/public/SangguniangBayan/SangguniangBayan";
import Government from "./pages/Government/Governement";
import PublicLayout from "./layout/PublicLayout";
import AuthLayout from "./layout/AuthLayout";
import LogIn from "@/pages/Auth/Login";
import Employees from "./pages/Employees/Employees";
import Projects from "@/pages/public/Projects/Projects";
import Transparency from "./pages/Transparency/Transparency";
import JobSection from "./pages/public/Job/JobSection";
import Services from "./pages/public/Services/Services";
import Announcement from "./pages/public/Announcement/Announcement";

function App() {
  const router = createBrowserRouter([
    {
      Component: RootLayout,
      children: [
        // public pages routing
        {
          Component: PublicLayout,
          children: [
            { index: true, Component: LupiWebsite },
            { path: "/home", Component: LupiWebsite },
            { path: "/announcements", Component: Announcement },
            { path: "/government", Component: Government },
            { path: "/sangguniangbayan", Component: SangguniangBayan },
            { path: "/officials", Component: Officials },
            { path: "/employees", Component: Employees },
            { path: "/projects", Component: Projects },
            { path: "/transparency", Component: Transparency },
            { path: "/jobs", Component: JobSection },
            { path: "/services", Component: Services },
            { path: "/coming-soon", Component: ComingSoon },
            { path: "/about", Component: About },
            { path: "/all", Component: AllAnnouncements },
            { path: "/contact", Component: Contact },
          ],
        },
        // auth pages routing
        {
          Component: AuthLayout,
          children: [{ path: "/login", Component: LogIn }],
        },
        {
          path: "*",
          Component: Contact,
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
