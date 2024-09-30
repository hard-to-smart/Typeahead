import React, { useEffect, useRef, useState } from "react";
import { UPIids } from "./UpiLists";
export const Typehead = () => {
  const [inputValue, setInputValue] = useState("");
  const [optionsValue, setOptionsValue] = useState([]);
  const [displayParseValue, setDisplayParseValue] = useState("");
  const [focus, setFocus] = useState("");
    const inputRef = useRef(null);
  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleOptionSelect = (e) => {
    setDisplayParseValue(e.target.innerText);
    setInputValue(inputValue.concat(e.target.innerText));
    inputRef.current.focus()
  };

const handleOptionsValue = () => {
    setOptionsValue(
    UPIids.filter((value) => {
      if (inputValue.match(/^(.+@)/)) {
        return value;
      }
    })
    );
  };

  useEffect(()=>{
    handleOptionsValue();
  },[inputValue])

  return (
    <>
      <div className="input-parent">
        <input
          name="upi"
          ref={inputRef}
          value={inputValue}
          autoFocus
          placeholder="Enter Upi Id"
          onChange={handleInputValue}
        />
        <span className="">{displayParseValue}</span>
      </div>
      <ul>
        {optionsValue.map((value, index) => (
          <li key={index} onClick={handleOptionSelect}>{value}</li>
        ))}
      </ul>
    </>
  );
};
