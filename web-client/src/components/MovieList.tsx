import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { useGet } from "../apiService";
import { Movie } from "../environments/model";
import Empty from "./Empty";
import MovieComponents from "./MovieComponent";
import { useNavigate } from "react-router-dom";
const MovieList: React.FC = () => {
  const navigate = useNavigate();

  const { data: movieList, refreshData: refreshMovieList } = useGet<Movie[]>({
    url: "movie",
    defaultValue: [],
  });
  const handleClick=()=>{
    navigate("/create");
  }
  return (
    <section className="movie_list">
      <div className="wrapper_list">
        <h4>
          My movies <IoMdAddCircleOutline onClick={handleClick}/>
        </h4>
        <p>
          Logout <MdLogout />
        </p>
      </div>
      <div className="wrapper_movie_component">
      {
        movieList.length>0 ? 
          movieList.map((movie,index) => (
            <MovieComponents movie={movie} key={index}/>
          )) 
          :
            <Empty />

        }
      </div>
    </section>
  );
};

export default MovieList;
