import React, { useState } from 'react';
import axios from 'axios';
import MovieList from './MovieList';

function CreateMovie() {
  const [inputs, setInput] = useState('');
  const [movies, setMoives] = useState([
    {
      id: 0,
      movieName: 'defaultName',
      src: null,
    },
  ]);
  async function getMovies(movieTheme) {
    //비동기임 순서 확인!!
    //const link = 'https://api.tvmaze.com/search/shows?q=' + movieTheme;
    let response = await axios.get(
      `https://api.tvmaze.com/search/shows?q=${movieTheme}`
    ); //프로미스는 const에 못담김
    console.log(response.data);
    const list = response.data.map((obj) => ({
      //return없이 객체 반환 할라면()
      id: obj.show.id,
      name: obj.show.name,
      src: obj.show.image?.medium, //medium 없는거 있어서 그럼 '?.'//obj.show.image && obj.show.image.medium
    }));
    setMoives((movies) => [...movies, ...list]);
  }
  const onCreate = () => {
    getMovies(inputs);
    //console.log(movies);
  };
  const onChange = (e) => {
    const input = e.target.value;
    setInput(input);
    //console.log(inputs);
  };
  return (
    <>
      <input
        value={inputs} //value 지정해주는게 좋다.
        onChange={onChange}
        placeholder='영화분야를 입력하세요'
      ></input>
      <button onClick={onCreate}>영화 리스트 보기</button>
      <MovieList movies={movies} />
    </>
  );
}
export default CreateMovie;
