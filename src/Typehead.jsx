import React, { useEffect, useRef, useState } from "react";
import { UPIids } from "./UpiLists";
export const Typehead = () => {
  // take input
  const [inputValue, setInputValue] = useState("");
  // setting options
  const [optionsValue, setOptionsValue] = useState([]);
  // displaying the options in the span
  const [displayParseValue, setDisplayParseValue] = useState("");
  const [currentSuggestion, setCurrentSuggestion] = useState(UPIids[0]);
  const [onFocus, setFocus] = useState(false);
  //this sets input value
  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleOptionsValue = () => {
    setOptionsValue(
      UPIids.filter((id) => {
        if (inputValue.match(/^(.+@)/)) {
          let check = id;
          if (check) {
            const returnVal = id.startsWith(inputValue.split("@")[1], id);
            console.log(returnVal);
            setFocus(true);

            return returnVal;
          }
          return id;
        }
      })
    );
  };

  const handleOptionSelect = (e) => {
    let pointerIndex = optionsValue.indexOf(currentSuggestion);
    console.log(pointerIndex)
    if (e.keyCode === 40) {
      //down arrow
      if (pointerIndex < optionsValue.length - 1) {
        setCurrentSuggestion(optionsValue[pointerIndex + 1]);
        setDisplayParseValue(currentSuggestion);

      } else {
        setCurrentSuggestion(optionsValue[0]);
      } 

    }
    if (e.keyCode === 38) {
      if(pointerIndex>0){
        setCurrentSuggestion(optionsValue[pointerIndex -1]);
        setDisplayParseValue(currentSuggestion);

      }
      else{
        setCurrentSuggestion(optionsValue[optionsValue.pointerIndex-1])
      }
    }
    if (e.keyCode === 13 && focus) {
      setInputValue(inputValue.split("@", [0]) + "@" + currentSuggestion);
      setFocus(false);
    }

  };

  useEffect(() => {
    handleOptionsValue();

  }, [inputValue, displayParseValue]);

  return (
    <>
      <div className="input-parent">
        <div className="input-main">
          {onFocus && (
            <input
              style={{
                zIndex: 1,
                position: "absolute",
                width: "400px",
                height: "50px",
                fontSize: "large",
                border: "4px solid transparent",
              }}
              value={inputValue.split("@")[0] + "@" + displayParseValue}
              disabled
            />
          )}
          <input
            name="upi"
            value={inputValue}
            autoFocus
            className="input-main-sub"
            // placeholder="Enter Upi Id"
            onChange={handleInputValue}
            onKeyDown={handleOptionSelect}
            style={{ zIndex: 2 }}
          />
        </div>
        <ul>
          {optionsValue.map((value) => (
            <li
              key={value}
              className={`${value === currentSuggestion && "list-hover"}`}
            >
              {value}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
