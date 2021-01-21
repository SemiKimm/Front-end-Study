import React, { useState, useEffect } from 'react';
import { FlexBox } from './style';
import burger from '../../img/burger.jpg';
import ramen from '../../img/ramen.jpg';
import friedrice from '../../img/fried-rice.jpg';
import pasta from '../../img/pasta.jpg';
const items = [
  {
    name: '햄버거',
    src: burger,
  },
  {
    name: '라면',
    src: ramen,
  },
  {
    name: '볶음밥',
    src: friedrice,
  },
  {
    name: '파스타',
    src: pasta,
  },
];

const Game = () => {
  const [foods, setFoods] = useState([]);
  const [displays, setDisplays] = useState([]);
  const [winners, setWinners] = useState([]);
  useEffect(() => {
    items.sort(() => Math.random() - 0.5);
    setFoods(items);
    setDisplays([items[0], items[1]]);
  }, []);

  const clickHandler = (food) => (d) => {
    if (foods.length <= 2) {
      if (winners.length === 0) {
        setDisplays([food]);
      } else {
        let updatedFood = [...winners, food];
        setFoods(updatedFood);
        setDisplays([updatedFood[0], updatedFood[1]]);
        setWinners([]);
      }
    } else if (foods.length > 2) {
      setWinners([...winners, food]);
      setDisplays([foods[2], foods[3]]);
      setFoods(foods.slice(2));
    }
  };

  return (
    <FlexBox>
      <h1 className='title'>Favoriate Worldcup</h1>
      {displays.map((d) => {
        return (
          <div className='flex-1' key={d.name} onClick={clickHandler(d)}>
            <img className='food-img' src={d.src} />
            <div className='food-name'>{d.name}</div>
          </div>
        );
      })}
    </FlexBox>
  );
};

export default Game;
