// src/App.js
import React from "react";
import TelevisionDetail from "./pages/TelevisionDetailDetail";

export const Movie = () => {
  // Replace with a valid movie ID from your API
  const movieId = "550"; // Example movie ID, replace with actual ID

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <TelevisionDetail movieId={movieId} />
    </div>
  );
};
