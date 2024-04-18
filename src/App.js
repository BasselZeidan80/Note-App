import "./App.css";
import SignUp from "./Componenets/SignPage/SignUp";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Componenets/Layout/Layout";
import Login from "./Componenets/SignPage/Login";
import Home from "./Componenets/Home/Home";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <SignUp /> },
        { path: "login", element: <Login /> },
        { path: "home", element: <Home /> },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={routes}></RouterProvider>
      {/* <SideBarr /> */}
    </div>
  );
}

export default App;
