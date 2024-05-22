import { useState } from "react";


const Problem2 = () => {
    const [outputString, setOutputString] = useState('');

    const handleClick = (letter) => {
      let newOutputString = outputString;
      if (newOutputString.length > 0 && newOutputString[newOutputString.length - 1] === letter) {
        const lastCharCount = (newOutputString.match(new RegExp(letter, 'g')) || []).length;
        if (lastCharCount >= 3) {
          newOutputString = newOutputString.replace(new RegExp(`${letter}`, 'g'), lastCharCount > 3 ? '_' : '');
        }
      } else {
        newOutputString += letter;
      }
      setOutputString(newOutputString);
    };
    return (
        <div>
      <p>Output: {outputString}</p>
      <button onClick={() => handleClick('A')}>A</button>
      <button onClick={() => handleClick('B')}>B</button>
      <button onClick={() => handleClick('C')}>C</button>
    </div>
    );
};

export default Problem2;