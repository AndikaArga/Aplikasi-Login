import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import GameList from "./GameList";

export default function UserPage() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userAuth = async () => {
      try {
        const response = await axios.get(
          "https://shy-cloud-3319.fly.dev/api/v1/auth/me",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("ini hasil response", response?.data?.data);
        localStorage.setItem("nama", response?.data?.data?.name);
        setUser(response?.data?.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    userAuth();
  }, []);

  return (
    <div className="bg-cover bg-center h-screen  bg-[url('image/1169180.jpg')] overflow-y-auto">
      <Navbar />
      <GameList />
      <div className="flex justify-center mb-4 ">
        <button
          className="  bg-[#E3E3E3] px-6 py-2 rounded-md text-[#101010] font-medium"
          onClick={() => navigate("/More-Game")}
        >
          More Games
        </button>
      </div>
    </div>
  );
}
