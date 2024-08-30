import React, { useState, useEffect } from "react";
import { alphabetArray } from "../../constants/Constant";
const Game = () => {   
  const [words, setWords] = useState([]);
  const wordLengthThreshold = 7;
  const requiredWordCount = 3;
  const [attempt, setattempt] = useState(1);
  const [previousData, setPreviousData] = useState(null);
  const [spell, setSpell] = useState([]);
  const [rank, setRank] = useState([]);
  const [count, setCount] = useState(26);
  const [remaining, setRemaning] = useState(0);
  const [query, setQuery] = useState("");
  const [buttonVisible, setButtonVisible] = useState(false);
  var len=0; 
  const fetchRandomWords = () => {
    const apiUrl = "https://random-word-api.herokuapp.com/word?number=3";
    console.log(apiUrl);
    const fetchWordsWithCriteria = async () => {
      let fetchedWords = [];
      while (fetchedWords.length < requiredWordCount) {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          const validWords = data.filter( 
            (word) => word.length >= wordLengthThreshold
          );
          fetchedWords = fetchedWords.concat(validWords); 
        }
      }
      return fetchedWords.slice(0, requiredWordCount);
    };
    fetchWordsWithCriteria()
      .then((result) => {
        let arr = Array.from(result[0]);
        setWords(arr);
        setRemaning(arr?.length);
        if (arr?.length > 0) {
          setRank((prev) => [
            { id: "", c: "", r: arr?.length, a: attempt - 1 },
          ]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchRandomWords();
  }, []);

  const renderDivs = () => {
    if (words.length > 0) {
      const firstWord = words[1];
      len = words[0].length;
      const divArray = [];

      for (let i = 0; i < firstWord.length; i++) {
        divArray.push(
          <input
            key={i}
            id={i}
            type="text2"
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
  let flag = 0;
  const handleButtonClick = (v) => {
    console.log(v);
    console.log(words);
    words?.map((d, i) => {
      if (d?.toUpperCase() === v) {
        let t = 0;
        for (let j = 0; j < words?.length; j++) {
          if (v === words[j]?.toUpperCase()) {
            console.log(t);
            t++;
          }
        }
        flag = 1;
        let p = remaining - t;
        setRemaning(p);
        setRank((prev) => [...prev, { id: i, c: v, r: p, a: attempt }]);
      } else {
        
      }
    });
    console.log(rank);
    if (flag === 0) {
      setRank((prev) => [...prev, { id: "", c: v, r: remaining, a: attempt }]);
    }

    setCount((prevCount) => prevCount - 1);
    setSpell((prev) => [...prev, v]);
    setattempt((prevAttempt) =>
      prevAttempt === 0 ? prevAttempt + 2 : prevAttempt + 1
    );
  };

  return (
    <div>
      <div className="container my-5">
        <h2 className="text-dark fw-bold text-center mb-5">Spelling Game</h2>
        <div className="row">
          <div className="col-lg-9 col-sm-12 mt-4">
            <h6 className="text-dark fw-14 fw-bold ps-2">
              Guess the following words
            </h6>
            <div className="d-flex justify-content-start align-items-center mt-2">
              {/* {renderDivs()} */}

              {query !== ""
                ? words?.map((d) => (
                    <input
                      value={query === d?.toUpperCase() ? d?.toUpperCase() : ""}
                      type="text"
                      readOnly
                      className="word-input ms-2"
                    />
                  ))
                : words
                    ?.filter((f) => f?.includes(query?.toLocaleLowerCase()))
                    ?.map((d, i) => (
                      <input
                        value={
                          rank?.find((a) => a?.c === d?.toUpperCase())
                            ? d?.toUpperCase()
                            : ""
                        }
                        key={i}
                        id={i}
                        type="text"
                        readOnly
                        className="word-input ms-2"
                      />
                    ))}
            </div>
            <h6 className="text-dark fw-14 fw-bold mt-5 ms-2">
              Choose the letter that could be used in the above words
            </h6>
            <div className="keyboard ms-3 d-flex flex-column mt-2">
              <div className="row d-flex mb-1 flex-wrap">
                {alphabetArray?.map((d, i) =>
                  query !== "" ? (

                    
                    <button
                      type="button"
                      className="key"
                      value={d}
                      onClick={() => handleButtonClick(d)}
                      disabled={count === 0 || remaining === 0}
                      style={{
                        background: d === query ? "#7a7b7c" : "",
                      }}
                    >
                      {d}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="key"
                      value={d}
                      onClick={() => handleButtonClick(d)}
                      disabled={count === 0 || remaining === 0}
                      style={{
                        background: spell?.find((f) => f === d) ? "#7a7b7c" : "",
                      }}
                    >
                      {d}
                    </button>
                  )
                )}
              </div>
              {remaining === 0 && rank?.length > 0 ? (
                <button
                  id="sucess"
                  className="btn btn-success text-light py-3 fw-bold mt-5"
                  style={{
                    cursor: "auto",
                  }}
                >
                  Congrats! You guessed {words} in {attempt - 1} attempts
                </button>
              ) : (
                ""
              )}

              <button
                className="btn btn-primary w-25 btn-md mt-4 fw-bold rounded-pill"
                onClick={handleRefreshClick}
              >
                Refresh
              </button>
            </div>
          </div>
          <div className="col-lg-3 col-sm-12 mt-4 ps-2 score">
            <h6 className="text-dark fw-14 fw-bold ps-1">Score</h6>
            <div className="d-flex">
              <div className="">
                <div className="bg-primary text-light fw-14 fw-bold py-3 px-4 attempts d-flex align-items-center justify-content-center">
                  Attempts
                </div>
                <div className="flex-column bg-secondary text-dark fw-14 fw-bold py-3 px-4 d-flex align-items-center justify-content-center attemp-num">
                  {rank?.map((d) => (
                    <div
                      style={{
                        cursor: remaining === 0 ? "pointer" : "cursor",
                      }}
                      onClick={() => {
                        if (remaining === 0) {
                          setQuery(d?.c);
                        }
                        return;
                      }}
                      className="bg-secondary text-dark fw-14 fw-bold py-2 d-flex align-items-center justify-content-center"
                    >
                      {d?.a}
                    </div>
                  ))}
                </div>
              </div>
              <div className="ms-1">
                <div className="bg-primary text-light fw-14 fw-bold py-3 px-4 attempts d-flex align-items-center justify-content-center">
                  Remaining Characters
                </div>
                <div
                  id="remainingchar"
                  className="bg-secondary text-dark fw-14 fw-bold py-3 px-4 d-flex align-items-center
                   justify-content-center remain-num flex-column"
                >
                  {rank?.map((d) => (
                    <div
                      style={{
                        cursor: remaining === 0 ? "pointer" : "cursor",
                      }}
                      onClick={() => {
                        if (remaining === 0) {
                          setQuery(d?.c);
                        }
                        return;
                      }}
                      className="bg-secondary text-dark fw-14 fw-bold py-2 d-flex align-items-center justify-content-center"
                    >
                      {d?.r}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-lg-3 col-sm-12 mt-4 ps-2 score">
            <h6 className="text-dark fw-14 fw-bold ps-1">Score</h6>
            <div className="d-flex">
              <div className="bg-primary text-light fw-14 fw-bold py-3 px-4 attempts d-flex align-items-center justify-content-center">
                Attempts
              </div>
              <div className="bg-primary text-light fw-14 fw-bold py-3 px-2 attempts d-flex align-items-center justify-content-center">
                Remaining Characters
              </div>
            </div>
            <div
              className="d-flex"
              style={{ borderBottom: "1px solid silver" }}
            >
              <div className="" style={{ width: "100%" }}>
                {rank?.map((d) => (
                  <div
                    style={{
                      borderBottom: "1px solid silver",
                      cursor: remaining === 0 ? "pointer" : "cursor",
                    }}
                    onClick={() => {
                      if (remaining === 0) {
                        setQuery(d?.c);
                      }
                      return;
                    }}
                    className="bg-secondary text-dark fw-14 fw-bold py-3 px-4 d-flex align-items-center justify-content-center"
                  >
                    {d?.a}
                  </div>
                ))}
              </div>
              <div className="" style={{ width: "100%" }}>
                {rank?.map((d) => (
                  <div
                    style={{
                      borderBottom: "1px solid silver",
                      cursor: remaining === 0 ? "pointer" : "cursor",
                    }}
                    onClick={() => {
                      if (remaining === 0) {
                        setQuery(d?.c);
                      }
                      return;
                    }}
                    className="bg-secondary text-dark fw-14 fw-bold py-3 px-4 d-flex align-items-center justify-content-center"
                  >
                    {d?.r}
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Game;

// let a = count--;
// setCount(a);

// const buttonValue = event.target.value;
// console.log(typeof remainingchar);
// var text = words[0].toUpperCase();
// for (let i = 0; i < words[0].length; i++) {
//   //console.log(text)
//   //console.log(text[i],buttonValue)
//   if (text[i] === buttonValue) {
//     //console.log(buttonValue+"")
//     document.getElementById(i).value = buttonValue;
//     var remainingchar = parseInt(
//       document.getElementById("remainingchar").innerText
//     );
//     remainingchar--;
//     document.getElementById("remainingchar").innerText =
//       remainingchar.toString();
//   }
// }
// event.target.style.backgroundColor = "#7a7b7c";
// event.target.disabled = true;
// setattempt(attempt + 1);
// if (parseInt(document.getElementById("remainingchar").innerText) == 0) {
//   var sucessbutton = document.getElementById("sucess");
//   sucessbutton.style.display = "";
// }
