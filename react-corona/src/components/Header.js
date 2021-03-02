import React from 'react';
//기본적인 틀이기때문에 따로 컴포넌트로 빼줌
const Header = () => {
  return (
    <header className='header'>
      <h1>COVID-19</h1>
      <select>
        <option>국내</option>
        <option>세계</option>
      </select>
    </header>
  );
};

export default Header;
