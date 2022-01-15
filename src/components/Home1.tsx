import React, { useCallback, useMemo, useReducer, useRef } from "react";
import CreateUser from "./CreateUser";
import UserList from "./UserList";

export const initialState: IInitialState = {
  inputs: {
    username: "",
    email: "",
  },
  users: [
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
  ],
};

interface IInputs {
  username: string;
  email: string;
}

export interface IUsers {
  id: number;
  username: string;
  email: string;
  active: boolean;
}

interface IInitialState {
  inputs: IInputs;
  users: IUsers[];
}

type IAction =
  | { type: "CHANGE_INPUT"; name: string; value: string }
  | {
      type: "CREATE_USER";
      user: { id: number; username: string; email: string; active: boolean };
    }
  | { type: "TOGGLE_USER"; id: number }
  | { type: "DELETE_USER"; id: number };

function reducer(state = initialState, action: IAction) {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name === undefined ? "" : action.name]: action.value,
        },
      };
    case "CREATE_USER":
      return {
        ...state,
        users: state.users.concat(action.user),
      };
    case "TOGGLE_USER":
      console.log(" action.id", action.id);
      console.log(
        " action.id",
        state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user
        )
      );
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      return state;
  }
}

function Home1() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users, inputs } = state;
  const { username, email } = inputs;
  const nextIdRef = useRef<number>(users.length);

  const onChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    dispatch({
      type: "CHANGE_INPUT",
      name,
      value,
    });
  }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: (nextIdRef.current += 1),
        username,
        email,
        active: false,
      },
    });
  }, [username, email]);

  const onToggle = useCallback((id: number) => {
    dispatch({ type: "TOGGLE_USER", id });
  }, []);

  const onDelete = useCallback((id: number) => {
    dispatch({ type: "DELETE_USER", id });
  }, []);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onDelete={onDelete} onToggle={onToggle} />
    </>
  );
}

export default Home1;
