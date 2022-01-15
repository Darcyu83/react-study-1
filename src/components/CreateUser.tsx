import React, { useEffect, useState } from "react";

interface IProps {
  username: string;
  email: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onCreate: () => void;
}
function CreateUser({ username, email, onChange, onCreate }: IProps) {
  useEffect(() => {
    console.log("컴포넌트 화면에 나타남");
    return console.log("컴포넌트 화면에서 사라짐");
  }, []);

  return (
    <div style={{ borderTop: "1px solid red" }}>
      <input
        onChange={onChange}
        name="username"
        placeholder="이름"
        value={username}
      />
      <input
        onChange={onChange}
        name="email"
        placeholder="이메일"
        value={email}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
}

export default React.memo(CreateUser);
