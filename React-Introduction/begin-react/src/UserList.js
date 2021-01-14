import React from 'react';

/*재사용되는 코드를 일일히 넣는 좋지 않은 코드
function UserList() {
  const users = [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
    },
  ];
  return (
    <div>
      <div>
        <b>{users[0].username}</b> <span>({users[0].email})</span>
      </div>
      <div>
        <b>{users[1].username}</b> <span>({users[1].email})</span>
      </div>
      <div>
        <b>{users[2].username}</b> <span>({users[1].email})</span>
      </div>
    </div>
  );
}*/
/*컴포넌트를 재사용 가능하도록 수정
function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}
function UserList() {
  const users = [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
    },
  ];
  return (
    <div>
      <User user={users[0]} />
      <User user={users[1]} />
      <User user={users[2]} />
    </div>
  );
}
*/
/*배열이 고정적인 경우에는 두번째와 같이 구현해도 괜찮지만
배열의 인덱스를 하나하나 조회하면서 렌더링하는 방법은
동적인 배열을 렌더링하지 못한다.
동적인 배열을 렌더링해야 할 때에는 자바스크립트 배열의 내장함수 map()을 사용한다.
 */
function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}
function UserList() {
  const users = [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
    },
  ];
  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} />
        //리액트에서 배열을 렌더링 할 때에는 key라는 props를 설정해줘야 한다.key값은 각 원소들마다 가지고 있는 고유값으로 설정해야 한다.
      ))}
    </div>
  );
}
export default UserList;
