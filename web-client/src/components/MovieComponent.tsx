import React from 'react';
import movie from "../assets/movie_list.png";
import { Movie } from '../environments/model';
import MyImage from './ImageComponent';
interface MovieProps{
  movie:Movie
}
const MovieComponents: React.FC<MovieProps> = ({movie}) => {
  return (
   <div className="card_movie_comp">
       {/* <img src={`data:image/jpeg;base64,${movie.poster}`} alt={movie.title} height="200" width="100" /> */}
       <MyImage image={`data:image/jpeg;base64,${movie.poster}`} alt={movie.title}></MyImage>
       <div className="moviename">
        {movie.title}
       </div>
       <div className="year">
        {movie.publishingYear}
       </div>
   </div>
    
  );
};

export default MovieComponents;
