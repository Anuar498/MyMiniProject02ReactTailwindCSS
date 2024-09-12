import React, { useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

const API_KEY = "40917add592302c7ced451d447142b09";
const API_URL = "https://api.themoviedb.org/3/search/multi";
const TRAILER_URL = "https://www.youtube.com/watch?v=";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          api_key: API_KEY,
          query: query,
          language: "en-US",
          page: 1,
          include_adult: false,
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching the movie data", error);
    }
    setLoading(false);
  };

  const handlePlayTrailer = (movie) => {
    const trailerId = "your_trailer_id";
    setSelectedMovie({ ...movie, trailerId });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-6">TV Shows Search</h1>
        <div className="mb-6">
          <input
            type="text"
            id="default-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
            className="p-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="ml-2 p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
        {loading && <p className="text-lg">Loading...</p>}
        <div className="flex flex-wrap justify-center gap-6">
          {movies.length > 0
            ? movies.map((movie) => (
                <div
                  key={movie.id}
                  className="max-w-xs bg-gray-800 rounded-lg shadow-lg cursor-pointer"
                  onClick={() => handlePlayTrailer(movie)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">
                      {movie.title}
                    </h3>
                    <p className="text-gray-300">{movie.overview}</p>
                  </div>
                </div>
              ))
            : !loading && <p className="text-lg">No TV Shows found</p>}
        </div>
      </header>

      {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-gray-900 p-4 rounded-lg">
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-2 right-2 text-white text-xl font-bold"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedMovie.title}</h2>
            {selectedMovie.trailerId && (
              <ReactPlayer
                url={`${TRAILER_URL}${selectedMovie.trailerId}`}
                playing
                controls
                className="w-full h-80"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
