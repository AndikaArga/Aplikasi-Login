import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { PlayArrow, Lock, Logout } from "@mui/icons-material";
import Navbar from "./Navbar";

export default function GameDetails() {
  let location = useLocation();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(
          "https://free-to-play-games-database.p.rapidapi.com/api/game",
          {
            params: { id: location.state.id },
            headers: {
              "X-RapidAPI-Key":
                "7ed3d33c1cmshbe8f8583a0efa6cp1629a1jsncf6bf4dabdb6",
              "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            },
          }
        );

        setGame(response?.data);
        console.log("ini hasil load", response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load game details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [location.state.id]);

  return (
    <div className="bg-cover bg-center h-screen bg-[url('image/1169180.jpg')] justify-center overflow-y-auto">
      <Navbar />
      {loading && (
        <div className="bg-center h-screen flex items-center justify-center text-center text-[#E3E3E3] backdrop-blur-[20px] bg-[#E3E3E3]/20 rounded-md text-3xl py-2 mx-[200px] my-9">
          Loading...
        </div>
      )}
      {!loading && error && (
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-red-600">{error}</p>
        </div>
      )}
      <div className=" mx-[185px]">
        {!loading && !error && (
          <div className="container mx-auto px-4 py-8">
            <div className="backdrop-blur-[20px] bg-[#E3E3E3]/20 shadow-md rounded px-8 py-6 flex gap-4 max-lg:flex-col items-center">
              <div className="">
                <h2 className="text-2xl font-semibold text-[#E3E3E3] mb-4">
                  Game Details
                </h2>
                <img
                  src={game?.thumbnail}
                  alt={game?.title}
                  className="rounded-lg mb-4 w-[600px] max-lg:w-full"
                />
                <div>
                  {localStorage.getItem("token") === null ? (
                    <button
                      className="w-full bg-[#4799EB] py-2 flex justify-center items-center rounded-md text-white font-bold text-sm"
                      onClick={() => alert("Silakan Login Terlebih Dahulu")}
                    >
                      <Lock />
                    </button>
                  ) : (
                    <a
                      href={game?.game_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" bg-[#4799EB] py-2 flex justify-center items-center rounded-md text-white font-bold"
                    >
                      <PlayArrow />
                    </a>
                  )}
                </div>
                <button
                  className="w-full text-cente py-2 bg-[#E3E3E3] mt-2 rounded-md"
                  onClick={() => navigate("/")}
                >
                  <Logout />
                </button>
              </div>
              <div>
                <p className="text-lg font-bold mb-2 text-[#E3E3E3]">
                  {game?.title}
                </p>
                <p className="text-[#E3E3E3] mb-4">
                  Description: {game?.short_description}
                </p>
                <p className="text-[#E3E3E3] mb-4">
                  Developer: {game?.developer}
                </p>
                <p className="text-[#E3E3E3] mb-4">
                  Publisher: {game?.publisher}
                </p>
                <p className="text-[#E3E3E3] mb-4">Genre: {game?.genre}</p>
                <p className="text-[#E3E3E3] mb-4">
                  Platform: {game?.platform}
                </p>
                <p className="text-[#E3E3E3] mb-4">
                  Release Date: {game?.release_date}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
