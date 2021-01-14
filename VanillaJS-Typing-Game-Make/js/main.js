//사용변수
const GAME_TIME = 9;
let score = 0; //점수는 0으로 초기화
let time = GAME_TIME;
let isPlaying = false; //게임 state를 나타내기위해
let timeInterval;
let checkInterval;
let words = [];

const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

init();

function init() {
  buttonChange('게임로딩중...');
  getWords();
  //wordInput.addEventListener('이벤트','기능')
  wordInput.addEventListener('input', checkMatch);
}

//게임 실행되는 부분
function run() {
  if (isPlaying) {
    return;
  }
  isPlaying = true;
  time = GAME_TIME; //게임시작할때 시간 항상 GAME_TIME으로 초기화
  wordInput.focus();
  scoreDisplay.innerText = 0;
  timeInterval = setInterval(countDown, 1000); //1초마다 countDown이 실행되도록
  checkInterval = setInterval(checkStatus, 50); //0.05초마다 게임상태를 체크하도록함
  buttonChange('게임중');
}

//게임의 상태를 실시간으로 확인하는
function checkStatus() {
  if (!isPlaying && time === 0) {
    buttonChange('게임시작');
    clearInterval(checkInterval);
  }
}
/*
//단어 불러오기
function getWords() {
  //단어를 랜덤하게 제공하는 api사용
  axios
    .get('https://random-word-api.herokuapp.com/word?number=100')
    .then(function (response) {
      response.data.forEach((word) => {
        if (word.length < 10) {
          words.push(word);
        }
      });
      buttonChange('게임시작');
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  // words = ['Hello', 'Banana', 'Apple', 'Cherry'];
  //buttonChange('게임시작');
}*/

async function getWords() {
  let response = await axios.get(
    'https://random-word-api.herokuapp.com/word?number=100'
  );
  response.data.forEach((word) => {
    if (word.length < 10) {
      words.push(word);
    }
  });
  buttonChange('게임시작');
} //try catch로 await async에선 오류 제어해줘야된다. >> 함수 실행하는 곳에서 try catch 해야됨

//단어 일치 체크
function checkMatch() {
  /*console.log(
    wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()
  );
  //제시어와 입력단어가 같은지 비교//.tolowerCase()어떤 문자를 적던 양쪽을 소문자 처리해서 비교함*/
  if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
    wordInput.value = '';
    if (!isPlaying) {
      return;
    }
    score++;
    scoreDisplay.innerText = score;
    time = GAME_TIME;
    const randomIndex = Math.floor(Math.random() * words.length);
    console.log(randomIndex);
    wordDisplay.innerText = words[randomIndex];
  }
}

function countDown() {
  //삼항연산자
  time > 0 ? time-- : (isPlaying = false);
  if (!isPlaying) {
    clearInterval(timeInterval); //종료시키는거
  }
  timeDisplay.innerText = time;
}

function buttonChange(text) {
  button.innerText = text;
  text === '게임시작'
    ? button.classList.remove('loading')
    : button.classList.add('loading');
}
