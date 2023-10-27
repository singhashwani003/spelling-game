import React, { useState, useEffect } from 'react';

const Game = () => {
  const [words, setWords] = useState(['']);
  const wordLengthThreshold = 7;
  const requiredWordCount = 3;
  const [attempt,setattempt]=useState(0);
  const [previousData, setPreviousData] = useState(null);
 // const[wordlength,setwordlength]=useState();
  var len=0;  

  const fetchRandomWords = () => {
    const apiUrl = 'https://random-word-api.herokuapp.com/word?number=3';

    const fetchWordsWithCriteria = async () => {
      let fetchedWords = [];
      while (fetchedWords.length < requiredWordCount) {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          const validWords = data.filter((word) => word.length >= wordLengthThreshold);
          fetchedWords = fetchedWords.concat(validWords);
        }
      }
      return fetchedWords.slice(0, requiredWordCount);
    };

    fetchWordsWithCriteria()
      .then((result) => {
        setWords(result);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchRandomWords();
    }, []);
  
  const renderDivs = () => {
    if (words.length > 0) {
      const firstWord = words[0];
      len=words[0].length;
      const divArray = [];
      
      for (let i = 0; i < firstWord.length; i++) {
        divArray.push(
          <input
            key={i}
            id={i}
            type="text"
            readOnly
            className="word-input ms-2"
          />
        );
      }
      return divArray;
    } 
    
    return null;
  };
  const handleRefreshClick = () => {
    // Reload the page
    window.location.reload();
  };
  const handleButtonClick = (event) => {
    const buttonValue = event.target.value;
    console.log(typeof remainingchar);
    var text=words[0].toUpperCase();
    for (let i = 0; i < words[0].length; i++) {
    //console.log(text)
      //console.log(text[i],buttonValue)
      if (text[i] === buttonValue) {
        //console.log(buttonValue+"")
        document.getElementById(i).value=buttonValue;
        var remainingchar=parseInt(document.getElementById('remainingchar').innerText)
        remainingchar--
        document.getElementById('remainingchar').innerText=remainingchar.toString();
      }
    }
    event.target.style.backgroundColor="#7a7b7c"
    event.target.disabled=true;
    setattempt(attempt+1)
    if(parseInt(document.getElementById('remainingchar').innerText)==0)
    {
        var sucessbutton=document.getElementById("sucess");
        sucessbutton.style.display="";
    }

  };
  return (
    <div>
       <div className='container my-5'>
       <h2 className='text-dark fw-bold text-center mb-5'>Spelling Game </h2>
        <div className='row'>
          <div className="col-lg-9 col-sm-12 mt-4">
            <h6 className="text-dark fw-14 fw-bold ps-2">Guess the following words</h6>
            <div className='d-flex justify-content-start align-items-center mt-2'>
              {renderDivs()}
            </div>
            <h6 className="text-dark fw-14 fw-bold mt-5 ms-2">Choose the letter that could be used in the above words</h6>
            <div class="keyboard ms-3 d-flex flex-column mt-2">
              <div class="row d-flex mb-1 flex-wrap">
                <button type="button" class="key" value="A" onClick={handleButtonClick}>A</button>
                <button type="button" class="key" value="B" onClick={handleButtonClick}>B</button>
                <button type="button" class="key" value="C" onClick={handleButtonClick}>C</button>
                <button type="button" class="key" value="D" onClick={handleButtonClick}>D</button>
                <button type="button" class="key" value="E" onClick={handleButtonClick}>E</button>
                <button type="button" class="key" value="F" onClick={handleButtonClick}>F</button>
                <button type="button" class="key" value="G" onClick={handleButtonClick}>G</button>
                <button type="button" class="key" value="H" onClick={handleButtonClick}>H</button>
                <button type="button" class="key" value="I" onClick={handleButtonClick}>I</button>
                <button type="button" class="key" value="J" onClick={handleButtonClick}>J</button>
                <button type="button" class="key" value="K" onClick={handleButtonClick}>K</button>
                <button type="button" class="key" value="L" onClick={handleButtonClick}>L</button>
                <button type="button" class="key" value="M" onClick={handleButtonClick}>M</button>
                <button type="button" class="key" value="N" onClick={handleButtonClick}>N</button>
                <button type="button" class="key" value="O" onClick={handleButtonClick}>O</button>
                <button type="button" class="key" value="P" onClick={handleButtonClick}>P</button>
                <button type="button" class="key" value="Q" onClick={handleButtonClick}>Q</button>
                <button type="button" class="key" value="R" onClick={handleButtonClick}>R</button>
                <button type="button" class="key" value="S" onClick={handleButtonClick}>S</button>
                <button type="button" class="key" value="T" onClick={handleButtonClick}>T</button>
                <button type="button" class="key" value="U" onClick={handleButtonClick}>U</button>
                <button type="button" class="key" value="V" onClick={handleButtonClick}>V</button>
                <button type="button" class="key" value="W" onClick={handleButtonClick}>W</button>
                <button type="button" class="key" value="X" onClick={handleButtonClick}>X</button>
                <button type="button" class="key" value="Y" onClick={handleButtonClick}>Y</button>
                <button type="button" class="key" value="Z" onClick={handleButtonClick}>Z</button>  
              </div>
              <button id="sucess" className="btn btn-success text-light py-3 fw-bold mt-5" style={{display:"none",cursor:"auto"}}>Congrats! You guessed ALGEBRA in {attempt} attempts</button>
              <button className='btn btn-primary w-25 btn-md mt-4 fw-bold rounded-pill' onClick={handleRefreshClick}>Refresh</button>
          </div>
          </div>
          <div className='col-lg-3 col-sm-12 mt-4 ps-2 score'>
          <h6 className="text-dark fw-14 fw-bold ps-1">Score</h6>
          <div className="d-flex">
            <div className=''>
                <div className='bg-primary text-light fw-14 fw-bold py-3 px-4 attempts d-flex align-items-center justify-content-center'>Attempts</div>
                <div className='bg-secondary text-dark fw-14 fw-bold py-3 px-4 d-flex align-items-center justify-content-center attemp-num'>{attempt}</div>
            </div>
            <div className='ms-1'>
                <div className='bg-primary text-light fw-14 fw-bold py-3 px-4 attempts d-flex align-items-center justify-content-center'>Remaining Characters</div>
                <div id="remainingchar" className='bg-secondary text-dark fw-14 fw-bold py-3 px-4 d-flex align-items-center justify-content-center remain-num'>{len}</div>
            </div>
          </div>
        </div>
        </div>
       </div> 
    </div>
    
  );
};

export default Game;