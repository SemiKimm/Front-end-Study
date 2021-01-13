import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';
import Counter from './Counter';
import InputSample from './InputSample';
import './App.css';

function App() {
  const name = 'react';
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: 24,
    padding: '1rem',
  };
  return (
    <Wrapper>
      <InputSample />
      <Counter />
      <Hello
        name='react'
        color='red'
        isSpecial={true} /*isSpecial과 isSpecial={true}는 같은 의미*/
      />
      {/*name이 없는 Hello 컴포넌트
      ->defalutProps에 의해 값이 배정된다.*/}
      <Hello color='pink' />
      <div style={style}>{name}</div>
      <div>안녕히계세요.</div>
      <div>{name}</div>
      <div className='gray-box'></div>
    </Wrapper>
  );
}

export default App;
