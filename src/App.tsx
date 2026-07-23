import { createBrowserRouter, RouterProvider } from "react-router"; 
import LupiWebsite from "./pages/LupiWebsite";
 
function App() { 
  const router = createBrowserRouter([ 
    { 
      path: "/", 
      Component: LupiWebsite, 
    }, 
  ]); 
 
  return ( 
    <div> 
      <RouterProvider router={router} /> 
    </div> 
  ); 
} 
 
export default App; 