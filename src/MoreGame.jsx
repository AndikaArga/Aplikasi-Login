import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Window, WebAsset } from "@mui/icons-material";

const MoreGame = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [angka, setAngka] = useState(16);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          "https://free-to-play-games-database.p.rapidapi.com/api/games",
          {
            params: {
              "sort-by": selectedSort,
            },
            headers: {
              "X-RapidAPI-Key":
                "7ed3d33c1cmshbe8f8583a0efa6cp1629a1jsncf6bf4dabdb6",
              "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            },
          }
        );
        setGames(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load games. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [selectedSort]);

  const handleSearchChange = (e) => {
    const term = e.target.value.trimStart();
    setSearchTerm(term);
  };

  const tambahAngka = () => {
    setAngka((prevAngka) => prevAngka + 16);
  };
  const KurangAngka = () => {
    if (angka <= 16) {
      alert("sudah tidak bisa dikurangi");
      return;
    }
    setAngka((prevAngka) => prevAngka - 16);
  };

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-cover bg-center h-screen  bg-[url('image/1169180.jpg')] overflow-y-auto">
      <Navbar />
      <div className="my-4 flex justify-between mx-[200px]">
        <input
          type="text"
          placeholder="Search by game name..."
          className="p-2 border border-gray-300 rounded-md w-full mr-2"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={selectedSort}
          onChange={handleSortChange}
        >
          <option value="">All</option>
          <option value="release-date">Release Date</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="popularity">popularity</option>
        </select>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-screen backdrop-blur-[20px] rounded-lg bg-[#E3E3E3]/5 mx-[200px] ">
          <div className=" text-[#101010]">Loading...</div>
        </div>
      )}
      {!loading && filteredGames.length === 0 && (
        <p className="text-center font-bold">No games found...</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-[200px]">
        {filteredGames.slice(0, angka).map((game) => (
          <div
            key={game.id}
            onClick={() => {
              navigate("/Game-Details", { state: { id: game.id } });
            }}
            className="backdrop-blur-[20px] bg-[#E3E3E3]/20 rounded-lg overflow-hidden shadow-lg flex flex-col transform hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <div className="flex-1">
              <img
                src={game.thumbnail}
                alt={game.title}
                className="object-cover w-full"
              />
            </div>
            <div className="p-4 flex justify-between">
              <div>
                <p className="font-semibold text-sm text-[#E3E3E3]">
                  {game.title}
                </p>
                <p className="mt-2 inline-block text-sm bg-[#E3E3E3] text-[#101010] px-2 py-1 rounded-md font-semibold">
                  {game.genre}
                </p>
              </div>
              <div className=" text-blue-500">
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
        ))}
      </div>
      <div className="flex text text-center justify-center gap-[200px] my-4">
        <button
          className=" backdrop-blur-[20px] bg-[#E3E3E3] px-6 py-2 rounded-md font-medium"
          onClick={tambahAngka}
        >
          Load More
        </button>
        <button
          className=" backdrop-blur-[20px] bg-[#E3E3E3] px-6 py-2 rounded-md font-medium"
          onClick={KurangAngka}
        >
          Load Less
        </button>
      </div>
    </div>
  );
};

export default MoreGame;
