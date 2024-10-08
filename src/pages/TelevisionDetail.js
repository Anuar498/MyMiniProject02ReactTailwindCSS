import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Backup from "../assets/images/no-image.jpg";

export const TelevisionDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [videos, setVideos] = useState([]);
  const image = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : Backup;

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/157336?api_key=40917add592302c7ced451d447142b09&append_to_response=videos`
        );
        const json = await response.json();
        setMovie(json);
        if (json.videos && json.videos.results) {
          setVideos(json.videos.results);
        }
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    }
    fetchMovieDetails();
  }, [id]);

  return (
    <main>
      <section className="flex justify-around flex-wrap py-5">
        <div className="max-w-sm">
          <img className="rounded-lg shadow-lg" src={image} alt={movie.title} />
        </div>
        <div className="max-w-2xl text-gray-700 text-lg dark:text-white">
          <h1 className="text-4xl font-bold my-3 text-center lg:text-left">
            {movie.title}
          </h1>
          <p className="my-4">{movie.overview}</p>
          {movie.genres && (
            <p className="my-7 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  className="mr-2 border border-gray-200 rounded dark:border-gray-600 p-2"
                  key={genre.id}
                >
                  {genre.name}
                </span>
              ))}
            </p>
          )}
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-yellow-300 mr-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
              {movie.vote_average}
            </p>
            <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
            <span className="text-gray-900 dark:text-white">
              {movie.vote_count} reviews
            </span>
          </div>

          <p className="my-4">
            <span className="mr-2 font-bold">Runtime:</span>
            <span>{movie.runtime} min.</span>
          </p>
          <p className="my-4">
            <span className="mr-2 font-bold">Budget:</span>
            <span>$ {movie.budget}</span>
          </p>
          <p className="my-4">
            <span className="mr-2 font-bold">Revenue:</span>
            <span>$ {movie.revenue}</span>
          </p>
          <p className="my-4">
            <span className="mr-2 font-bold">Release Date:</span>
            <span>{movie.release_date}</span>
          </p>
          <p className="my-4">
            <span className="mr-2 font-bold">IMDB Code:</span>
            <span>{movie.imdb_id}</span>
          </p>

          {videos.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Videos</h2>
              <div className="flex flex-wrap gap-4">
                {videos.map((video) => (
                  <div key={video.id} className="w-full md:w-1/2 lg:w-1/3">
                    <a
                      href={`https://www.youtube.com/watch?v=${video.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                        alt={video.name}
                        className="rounded-lg shadow-lg"
                      />
                      <p className="mt-2 text-center text-sm">{video.name}</p>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
