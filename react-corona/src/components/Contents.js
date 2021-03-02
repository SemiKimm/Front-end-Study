import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Boughnut, Line, Doughnut } from 'react-chartjs-2'; //3가지 종류의 그래프를 사용하기위해 불러오는거
const Contents = () => {
  const [confirmedData, setConfirmedData] = useState({});
  const [quarantinedData, setQuarantinedData] = useState({});
  const [comparedData, setComparedData] = useState({});
  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get(
        'https://api.covid19api.com/total/dayone/country/kr'
      );
      makeData(res.data);
    };
    const makeData = (items) => {
      const arr = items.reduce((acc, cur) => {
        const currentDate = new Date(cur.Date);
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const date = currentDate.getDate();
        const confirmed = cur.Confirmed;
        const active = cur.Active;
        const death = cur.Deaths;
        const recovered = cur.Recovered;
        //배열에 값이 들어있는지 확인해서 안들어있으면
        //push로 넣어주고 있으면 date가 가장 큰 날짜인것만 있도록 한다.
        const findItem = acc.find((a) => a.year === year && a.month === month);
        if (!findItem) {
          acc.push({
            year, // year: year, //key와 value가 같으면? 축약가능
            month, // month: month,
            date, // date: date,
            confirmed,
            active,
            death,
            recovered,
          });
        }
        if (findItem && findItem.date < date) {
          //새롭게 데이터 업데이트
          findItem.active = active;
          findItem.death = death;
          findItem.date = date;
          findItem.year = year;
          findItem.month = month;
          findItem.recovered = recovered;
          findItem.confirmed = confirmed;
        }
        return acc;
      }, []);
      //console.log(arr);//12개 나와야되는데 21년까지 들어감..?
      const labels = arr.map((a) => `${a.month + 1}월`);
      setConfirmedData({
        labels, //labels:labels,
        datasets: [
          {
            label: '국내 누적 확진자',
            backgroundColor: 'salmon',
            fill: true,
            data: arr.map((a) => a.confirmed),
          },
        ],
      });
      setQuarantinedData({
        //안나오네..
        labels, //labels:labels,
        datasets: [
          {
            label: '월별 격리자 현황',
            borderColor: 'salmon',
            fill: false,
            data: arr.map((a) => a.active),
          },
        ],
      });
      const last = arr[arr.length - 1];
      setComparedData({
        labels: ['확진자', '격리해제', '사망'],
        datasets: [
          {
            label: '누적 확진, 해제, 사망 비율',
            backgroundColor: ['#ff3d67', '#059bff', '#ffc233'],
            borderColor: ['#ff3d67', '#059bff', '#ffc233'],
            fill: false,
            data: [last.confirmed, last.recovered, last.death],
          },
        ],
      });
    };
    //console.log(res);
    fetchEvents();
  }, []);
  return (
    <section>
      <h2>국내 코로나 현황</h2>
      <div className='contents'>
        {/*실질적으로 그래프 들어갈 곳 */}
        <div>
          <Bar
            data={confirmedData}
            options={
              ({
                title: {
                  display: true,
                  text: '누적 확진자 추이',
                  fontSize: 16,
                },
              },
              { legend: { display: true, position: 'bottom' } })
            }
          />
        </div>
        <div>
          <Line
            data={quarantinedData}
            options={
              ({
                title: {
                  display: true,
                  text: '월별 격리자 현황',
                  fontSize: 16,
                },
              },
              { legend: { display: true, position: 'bottom' } })
            }
          />
        </div>
        <div>
          <Doughnut
            data={comparedData}
            options={
              ({
                title: {
                  display: true,
                  text: `누적 확진, 해제, 사망(${new Date().getMonth() + 1}월)`,
                  fontSize: 16,
                },
              },
              { legend: { display: true, position: 'bottom' } })
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Contents;
