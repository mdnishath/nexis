import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];
export default routes;
