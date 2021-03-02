import React from 'react';

function Movie({ movie }) {
  //console.log(movie);
  return (
    <div>
      <li>{movie.name}</li>
      <img src={movie.src} alt='moiveImg' />
    </div>
  );
}
function MovieList({ movies }) {
  return (
    <div>
      {movies.map((movie) => (
        <Movie movie={movie} key={movie.id} />
        //key 값을 안넣어줬을 때 기본값이 index로 들어가긴한다. 그런데 좋지 않기 때문에 경고가 뜬다.
        //key 값을 따로 지정해주는게 중요함
      ))}
    </div>
  );
}
export default MovieList;
