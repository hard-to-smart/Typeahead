import React, { useEffect, useRef, useState } from "react";
import { UPIids } from "./UpiLists";
export const Typehead = () => {
  // take input
  const [inputValue, setInputValue] = useState("");
  // setting options
  const [optionsValue, setOptionsValue] = useState([]);
  // displaying the options in the span
  const [displayParseValue, setDisplayParseValue] = useState('');
  const [currentSuggestion, setCurrentSuggestion] = useState(UPIids[1]);
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
            return returnVal;
            setFocus(true);

          }
          return id;
        }
      })
    );
  };

  const handleOptionSelect = (e) => {
    if(e.keyCode === 40) { //down arrow
     
      
      let pointerIndex = optionsValue.indexOf(currentSuggestion);
      setCurrentSuggestion(optionsValue[pointerIndex+1])
      
      // setCurrentSuggestion(optionsValue[pointerIndex+1])
     
    }
    if(e.keyCode === 38){

    }

    if(e.keyCode === 13 && focus){

    }
    
    setCurrentSuggestion(optionsValue.at(0));
    setDisplayParseValue(currentSuggestion);
  };


  useEffect(() => {
    handleOptionsValue();
    
  }, [inputValue]);

  return (
    <>
      <div className="input-parent">
      
        <div className="input-main">
        { setFocus && 
        <input style={{zIndex:1, position:"absolute", width:"400px", height:"50px", fontSize:"large", border:'4px solid transparent'}} value={inputValue.split("@")[0]+"@" + displayParseValue} disabled/>
        }
        <input
          name="upi"
          value={inputValue}
          autoFocus
          className="input-main-sub"
          // placeholder="Enter Upi Id"
          onChange={handleInputValue}
          onKeyDown={handleOptionSelect}
          style={{zIndex:2}}
        />
        </div>
      <ul>
        {optionsValue.map((value) => (
          <li
            key={value}
            className={`${value === currentSuggestion && "list-hover"}`}  >
            {value}
          </li>
        ))}
      </ul>
      </div>

    </>
  );
};
