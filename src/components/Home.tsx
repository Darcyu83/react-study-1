import Input from "./Input";
import CreateUser from "./CreateUser";
import React, { useCallback, useRef, useState } from "react";
import UserList from "./UserList";

export interface IUsers {
  id: number;
  username: string;
  email: string;
  active: boolean;
}
const users = [
  {
    id: 1,
    username: "velopert",
    email: "public.velopert@gmail.com",
    active: true,
  },
  {
    id: 2,
    username: "tester",
    email: "tester@example.com",
    active: false,
  },
  {
    id: 3,
    username: "liz",
    email: "liz@example.com",
    active: false,
  },
];

function Home() {
  const [inputValues, setInputValues] = useState({ username: "", email: "" });
  const { username, email } = inputValues;
  const [usersValue, setUsers] = useState(users);
  const nextIdRef = useRef<number>(users.length);
  const onChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;
      setInputValues((currInputs) => ({
        ...currInputs,
        [name]: value,
      }));
    },
    [inputValues]
  );

  const onCreate = useCallback(() => {
    const newUser = {
      id: (nextIdRef.current += 1),
      username: username,
      email: email,
      active: false,
    };
    setUsers((preUsers) => [...preUsers, newUser]);

    setInputValues({ username: "", email: "" });
  }, [usersValue, username, email]);

  const onDelete = useCallback(
    (id: number) => {
      console.log("onDelete");
      setUsers((currUsers) => currUsers.filter((user) => user.id !== id));
    },
    [usersValue]
  );

  const onToggle = useCallback(
    (id: number) => {
      console.log("onToggle");
      setUsers((currUsers) =>
        currUsers.map((user) =>
          user.id === id ? { ...user, active: !user.active } : user
        )
      );
    },
    [usersValue]
  );
  return (
    <>
      <Input />
      <hr />
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={usersValue} onDelete={onDelete} onToggle={onToggle} />
    </>
  );
}

export default React.memo(Home);
