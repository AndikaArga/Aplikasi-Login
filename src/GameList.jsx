import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Window, WebAsset } from "@mui/icons-material";

const GameList = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [gamesPopular, setGamesPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          "https://free-to-play-games-database.p.rapidapi.com/api/games",
          {
            params: {
              "sort-by": "release-date",
            },
            headers: {
              "X-RapidAPI-Key":
                "7ed3d33c1cmshbe8f8583a0efa6cp1629a1jsncf6bf4dabdb6",
              "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            },
          }
        );
        setGames(response.data);
        console.log("responese", response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load games. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          "https://free-to-play-games-database.p.rapidapi.com/api/games",
          {
            params: {
              "sort-by": "popularity",
            },
            headers: {
              "X-RapidAPI-Key":
                "7ed3d33c1cmshbe8f8583a0efa6cp1629a1jsncf6bf4dabdb6",
              "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            },
          }
        );
        setGamesPopular(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load games. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  return (
    <div className="">
      <div className="my-4 mx-[200px]">
        {loading && (
          <div className="flex justify-center items-center h-screen">
            <div className="text-[#E3E3E3] backdrop-blur-[20px] bg-[#E3E3E3]/20 rounded-md text-3xl py-2 px-6">
              Loading...
            </div>
          </div>
        )}
        <div className="flex gap-4">
          <div className=" flex flex-col gap-2 flex-grow">
            <div className="text-2xl font-bold text-center rounded-md text-[#E3E3E3] backdrop-blur-[20px] bg-[#E3E3E3]/20 ">
              New Release
            </div>
            {games.slice(0, 8).map((game) => (
              <div
                key={game.id}
                onClick={() => {
                  navigate("/Game-Details", { state: { id: game.id } });
                }}
                className="backdrop-blur-[20px] bg-[#E3E3E3]/20 rounded-md overflow-hidden shadow-lg flex items-center transform hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <div className="my-4 ml-6">
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="object-cover w-full h-[100px]"
                  />
                </div>
                <div className="p-4 flex justify-between">
                  <div>
                    <p className="font-semibold text-md text-[#E3E3E3]">
                      {game.title}
                    </p>
                    <p className=" mt-2 inline-block text-sm bg-[#E3E3E3] text-[#101010] px-2 py-1 rounded-md font-semibold">
                      {game.genre}
                    </p>
                  </div>
                </div>
                <div className="flex-grow text-end mr-6 text-[#E3E3E3]">
                  {game.platform.includes("PC") && (
                    <div>
                      <Window />
                    </div>
                  )}
                  {game.platform === "Web Browser" && (
                    <div>
                      <WebAsset />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-2xl font-bold text-center rounded-md text-[#E3E3E3] backdrop-blur-[20px] bg-[#E3E3E3]/20 ">
              Most PLayed Today
            </div>
            <div className="flex flex-col flex-grow justify-between">
              {gamesPopular.slice(0, 5).map((game) => (
                <div
                  key={game.id}
                  onClick={() => {
                    navigate("/Game-Details", { state: { id: game.id } });
                  }}
                  className=" rounded-md overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  <div className="relative">
                    <img
                      src={game.thumbnail}
                      alt={game.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-0 right-0 m-2">
                      <div className=" text-[#E3E3E3]">
                        {game.platform.includes("PC") && (
                          <div>
                            <Window />
                          </div>
                        )}
                        {game.platform === "Web Browser" && (
                          <div>
                            <WebAsset />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameList;
