import React from 'react';

/*function Hello(props) {
  return <div style={{ color: props.color }}>안녕하세요{props.name}</div>;
}*/
function Hello({ color, name, isSpecial }) {
  //구조분해문법 사용
  return (
    <div style={{ color }}>
      {/*{isSpecial ? <b>*</b> : null} 
      //JSX에서 null, false, undefiend를 렌더링하면 아무것도 나타나지 않는다.*/}
      {/*단축평가논리계산법*/}
      {isSpecial && <b>*</b>}
      안녕하세요{name}
    </div>
  );
}

Hello.defaultProps = {
  name: '이름없음',
};
export default Hello;
