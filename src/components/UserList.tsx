import React, { useMemo, useReducer } from "react";
import { IUsers } from "./Home1";

interface IUserList {
  users: IUsers[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  count?: number;
}

function UserList({ users, onDelete, onToggle }: IUserList) {
  const countActiveUser = (usersData: IUsers[]): number => {
    console.log("활성화 유저수 계산중");
    return usersData.filter((user) => user.active).length;
  };

  const count = useMemo(() => countActiveUser(users), [users]);

  return (
    <div>
      <h1>활성화된 유저수: {count} </h1>
      {users.map((user: any, idx: number) => (
        <div key={idx} style={{ position: "relative" }}>
          <div style={{ zIndex: 5 }} onClick={() => onToggle(user.id)}>
            <div>ID:{user.id}</div>
            <div>
              Name:
              <span
                style={{
                  color: user.active ? "green" : "black",
                  fontWeight: "bold",
                }}
              >
                {user.username}
              </span>
            </div>
            <div>Activated: {`${user.active}`}</div>
            <div style={{ borderBottom: "1px solid black" }}>
              Email: {user.email}
            </div>
          </div>
          <button
            onClick={() => onDelete(user.id)}
            style={{
              position: "absolute",
              bottom: 5,
              right: 10,
              cursor: "pointer",
              zIndex: 999,
              color: "white",
              marginLeft: "10px",
              backgroundColor: "crimson",
            }}
          >
            del
          </button>
        </div>
      ))}
    </div>
  );
}

export default React.memo(UserList);
