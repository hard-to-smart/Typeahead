import React, { useEffect, useState } from "react";
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

  //this sets the options, it has 2 return conditions, 1 if the @ keyword is found and 2nd if the value matches after the @
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
        } else {
          setOptionsValue([]);
          setDisplayParseValue("");
        }
      })
    );
  };

  //this works for both, setting the highlight for the list and also to display a typeahead value on the input
  const handleOptionSelect = (e) => {
    let pointerIndex = optionsValue.indexOf(currentSuggestion);
    console.log(pointerIndex);
    if (e.keyCode === 40) {
      //down arrow
      if (pointerIndex < optionsValue.length - 1) {
        let newSuggestion = optionsValue[pointerIndex + 1];
        setCurrentSuggestion(newSuggestion);
        setDisplayParseValue(newSuggestion);
      } else {
        setCurrentSuggestion(optionsValue[0]);
        setDisplayParseValue("");
      }
    }
    if (e.keyCode === 38) {
      //up arrow
      if (pointerIndex > 0) {
        let newSuggestion = optionsValue[pointerIndex - 1];
        setCurrentSuggestion(newSuggestion);
        setDisplayParseValue(newSuggestion);
      } else {
        setCurrentSuggestion(optionsValue[optionsValue.length - 1]);
        setDisplayParseValue("");
      }
    }
    if (e.keyCode === 39 && focus) {
      //right arrow
      setInputValue((prev) => [prev] + currentSuggestion);
      setFocus(false);
    }
  };

  // the options are to be recalculated after every change in input
  useEffect(() => {
    handleOptionsValue();
  }, [inputValue]);

  // to scroll the ul div section to the list currently in focus

  //implement the scrollTo or scrollToView function
  //for that we would need to set reference to list

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
            placeholder="Enter Upi Id"
            onChange={handleInputValue}
            onKeyDown={handleOptionSelect}
            style={{ zIndex: 2 }}
          />
        </div>
        <ul>
          {optionsValue.map((value, index) => (
            <li
              key={index}
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
