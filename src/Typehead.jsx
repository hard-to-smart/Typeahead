import React, { memo, useCallback, useEffect, useState } from "react";
import { UPIids } from "./UpiLists";
export const Typehead = () => {
  const [inputValue, setInputValue] = useState("");
  const [optionsValue, setOptionsValue] = useState([]);
  const [displayParseValue, setDisplayParseValue] = useState("");
  const [focused, setFocused] = useState("");

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const ShowOptionsList = memo(() => {
    return (
      <ul>
        {optionsValue.map((value, index) => (
          <li key={index} >{value}</li>
        ))}
      </ul>
    );
  });

const handleOptionsValue = useCallback(() => {
    setOptionsValue(
    UPIids.filter((value) => {
      if (inputValue.match(/^(.+@)/)) {
        return value;
      }
    })
    );
  }, [inputValue]);

  useEffect(()=>{
    handleOptionsValue();
  },[inputValue])

  return (
    <>
      <div className="input-parent">
        <input
          name="upi"
          value={inputValue}
          autoFocus
          placeholder="Enter Upi Id"
          onChange={handleInputValue}
        />
        <span className="display-option">{displayParseValue}</span>
      </div>
      <ShowOptionsList/>
    </>
  );
};
