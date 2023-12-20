import { createBrowserRouter } from "react-router-dom";
import Login from "../views/Login";
import Home from "../views/Home";
import Profile from "../views/Profile";
import Register from "../views/Register";
import { Protected } from "../Auth/Protected";
import Team from "../views/Team";
import Errorpage from "../views/Error";
import KycPage from "../views/Kyc";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <Login/>,

  },
  {
    path: "/wp-admin",
    element: <p>admin Dashboard comming soon .....</p>,

  },
  {
    path:"/profile",
    element:<Protected><Profile/></Protected>,
    children:[
      {
        path:'teams',
        element:<Protected><Team/></Protected>
      },
      {
        path:'kyc',
        element:<Protected><KycPage/></Protected>
      },
    ]
  },
 
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"*",
    element:<Errorpage/>
  }

]);

export default router