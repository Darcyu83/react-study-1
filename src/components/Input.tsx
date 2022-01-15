import React, { useRef, useState } from "react";

const inputValsProps = {
  firstNm: "",
  lastNm: "",
};
function Input() {
  const [inputVals, setInputVals] = useState(inputValsProps);
  const { firstNm, lastNm } = inputVals;

  /*
   input tag ref 에는 RefObject 타입을 전달하여야 함.


   */

  const inputRef = useRef<HTMLInputElement>(null);
  //useRef<제네릭타입>(초기값) 제네릭타입이 정의되고, 초기값 정의 또는 null값을 받을경우
  //return RefObject<제네릭타입>;
  // inputRef.current : current값은 readOnly
  //inputref.current.value : value값은 mutable

  const localVarRef = useRef<number>(0);
  //useRef<제네릭타입>(초기값) 제네릭 & 초기값이 정의된 경우
  //return MutableRefObject<제네릭타입>;
  // localVarRef.current + 1 과 같이 직접 수정가능

  const nothingDefined = useRef();
  //return MutableRefObject<제네릭타입 | undefined>;

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setInputVals({
      ...inputVals,
      [name]: value,
    });
  };

  const onReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    setInputVals({
      ...inputVals,
      [e.currentTarget.ariaLabel]: "",
      lastNm: "",
    });
    //포커싱
    inputRef.current?.focus();
  };

  const onClick = () => {
    return (localVarRef.current += 1);
  };

  return (
    <div>
      <input
        name="firstNm"
        value={firstNm}
        onChange={onChange}
        ref={inputRef}
      />
      <input name="lastNm" value={lastNm} onChange={onChange} />
      <button aria-label="firstNm" onClick={onReset}>
        Reset
      </button>
      <hr />
      <p>First Name : {firstNm}</p>
      <p>Last Name : {lastNm}</p>
      <hr />
      <button onClick={onClick}>useRef Test : localVarRef + 1</button>
      <p>localVarRef : {localVarRef.current}</p>
    </div>
  );
}

export default React.memo(Input);
