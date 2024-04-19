import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import LoginPage from "./LoginPage.jsx";
import UserPage from "./UserPage.jsx";
import Register from "./Register.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./Navbar.jsx";
import GameDetails from "./GameDetails.jsx";
import MoreGame from "./MoreGame.jsx";


const router = createBrowserRouter([
  { path: "/", element: <UserPage /> },
  { path: "/user-page", element: <LoginPage/> },
  { path: "/Register", element: <Register /> },
  { path: "/Navbar", element: <Navbar /> },
  { path: "/Game-details", element: <GameDetails /> },
  { path: "/More-Game", element: <MoreGame /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="619057019504-s621klknopgksu5g9p8sk4q4vna5qohp.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
