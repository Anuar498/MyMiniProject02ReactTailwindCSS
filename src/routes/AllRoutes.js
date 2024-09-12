import { Routes, Route } from "react-router-dom";
import {
  TelevisionToday,
  TelevisionAir,
  TelevisionPopular,
  TelevisionTop,
  TelevisionDetail,
  Search,
  PageNotFound,
  Home,
} from "../pages";

export const AllRoutes = () => {
  return (
    <div className="dark:bg-darkbg">
      <Routes>
        <Route path="" element={<Home title="Home" />} />
        <Route
          path="tv/airing_today"
          element={
            <TelevisionToday apiPath="tv/airing_today" title="Airing Today" />
          }
        />
        <Route
          path="tv/on_the_air"
          element={<TelevisionAir apiPath="tv/on_the_air" title="On the Air" />}
        />
        <Route
          path="tv/popular"
          element={<TelevisionPopular apiPath="tv/popular" title="Popular" />}
        />
        <Route
          path="tv/top_rated"
          element={<TelevisionTop apiPath="tv/top_rated" title="Top Rated" />}
        />
        <Route
          path="tv/series_id"
          element={<TelevisionDetail apiPath="tv/series_id" title="Detail" />}
        />
        <Route
          path="search/multi"
          element={<Search apiPath="search/multi" title="Search" />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};
