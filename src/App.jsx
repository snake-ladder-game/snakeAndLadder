import React, { useEffect, useState } from "react";
import "./App.css";
import backSnake from "./assets/IMG-20240329-WA0006-removebg-preview (1).png";
// import snake from "./assets//kisspng-snake-cartoon-cartoon-snake-image-5a7c7ae3bc4544.7130162815181073637712.png";
// import snake1 from "./assets/kisspng-snakes-and-ladders-reptile-clip-art-vector-graphic-gullsblack-headed-gullgroupwatersit-nemokamo-5d0f4c91d6de87.0513496415612837298801.png";
// import ladder1 from "./assets/IMG-20240329-WA0004-removebg-preview.png";
// import snake4 from "./assets/dc76Xoedi-removebg-preview.png";
import useSound from "use-sound";
import diceSound from "./assets/diceSound.mp3";
import crowdSound from "./assets/crowdSound.mp3";

function App() {
  const [rand, setRand] = useState(0);
  const [flip, setFlip] = useState("card");

  const [play] = useSound(diceSound);
  const [playCrowd] = useSound(crowdSound);

  const [highlightedBoxPlayer1, setHighlightedBoxPlayer1] = useState(null);
  const [player1Position, setPlayer1Position] = useState(0);
  const [highlightedBoxPlayer2, setHighlightedBoxPlayer2] = useState(null);
  const [player2Position, setPlayer2Position] = useState(0);

  const [condition, setCondition] = useState(false);

  let [disableplayer1, setdisbleplayer1] = useState(false);
  let [disableplayer2, setdisbleplayer2] = useState(false);

  let snakes = {
    98: 28,
    95: 24,
    92: 51,
    73: 1,
    83: 17,
    64:36,
    69:33,
    59:17,
    55:7,
    52:11,
    48:9,
    46:5,
    44:22,

  };

  let ladders = {
    8: 26,
    50: 91,
    54: 93,
    62: 96,
    21: 82,
    80:99,
    43:77
  };

  const generateGrid = () => {
    const grid = [];
    let counter = 100;
    let row = [];
    let isReverse = true
    for (let i = 0; i < 10; i++) {
      row = [];
      for (let j = 0; j < 10; j++) {
        row.push(counter--);
      }
      grid.push(isReverse ? row : row.reverse());
      isReverse = !isReverse;
    }
    return grid;
  };

  const handleClickPlayer1 = () => {
    setdisbleplayer2(true);
    setdisbleplayer1(false);
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    let newPosition = player1Position + randomNumber;
    setPlayer1Position(
      newPosition > 100 ? newPosition - randomNumber : newPosition
    );
    setHighlightedBoxPlayer1(
      newPosition > 100 ? newPosition - randomNumber : newPosition
    );
    setdisbleplayer2(false);
    setdisbleplayer1(true);
    for (let item in snakes) {
      if (item == newPosition) {
        newPosition = snakes[item];
        setPlayer1Position(newPosition);

        setHighlightedBoxPlayer1(newPosition);
      }
    }
    setRand(randomNumber)
    for (let item in ladders) {
      if (item == newPosition) {
        newPosition = ladders[item];
        setPlayer1Position(newPosition);

        setHighlightedBoxPlayer1(newPosition);
      }
    }
    if (flip == "card") {
      setFlip(" flipCard");
    } else {
      setFlip("card");
    }
  };

  const handleClickPlayer2 = () => {
    setdisbleplayer1(true);
    setdisbleplayer2(false);
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    let newPosition = player2Position + randomNumber;
    setPlayer2Position(
      newPosition > 100 ? newPosition - randomNumber : newPosition
    );
    setHighlightedBoxPlayer2(
      newPosition > 100 ? newPosition - randomNumber : newPosition
    );
    setdisbleplayer1(false);
    setdisbleplayer2(true);

    setRand(randomNumber)
    for (let item in snakes) {
      if (item == newPosition) {
        newPosition = snakes[item];
        setPlayer2Position(newPosition);

        setHighlightedBoxPlayer2(newPosition);
      }
    }

    
    for (let item in ladders) {
      if (item == newPosition) {
        newPosition = ladders[item];
        setPlayer2Position(newPosition);

        setHighlightedBoxPlayer2(newPosition);
      }
    }
    if (flip == "card") {
      setFlip(" flipCard");
    } else {
      setFlip("card");
    }
  };

  function refreshPage() { 
    window.location.reload(false);
  }
  return (
    <div
      className="main"
    >
      <div className="container">
        <div className={`grid `}>
          {generateGrid().map((row, rowIndex) =>
            row.map((number, colIndex) => (
              <div
                key={rowIndex * 10 + colIndex + 1}
                className={
                  highlightedBoxPlayer1 === number &&
                  highlightedBoxPlayer2 === number
                    ? `bothActive ${number}`
                    : highlightedBoxPlayer1 === number
                    ? `playerOneActive ${number}`
                    : highlightedBoxPlayer2 === number
                    ? `playerTwoActive ${number}`
                    : `noneActive box${number}`
                }
              >
              </div>
            ))
          )}
        </div>
       
      </div>
      <div className="backSnake">
        <img src={backSnake} id="" />
        <div className={flip}><h2>{rand}</h2></div>

      </div>
      <div className="second">
        <div className="cheers">
          <h2>{}</h2>

          {highlightedBoxPlayer1 === 100 ? <h1>Player 1 Wins</h1> : ""}
          {highlightedBoxPlayer2 === 100 ? <h1>Player 2 Wins</h1> : ""}
        </div>
        _
        {useEffect(() => {
          highlightedBoxPlayer1 === 100 || highlightedBoxPlayer2 == 100
            ? setCondition(true)
            : setCondition(false);
        }, [highlightedBoxPlayer1, highlightedBoxPlayer2])}
        <div className="buttons">
          <button
            onClick={() => {
              handleClickPlayer1();
              play();
            }}
            disabled={disableplayer1} className="button-86" role="button"
          >
            Player 1
          </button>
          <button
            onClick={() => {
              handleClickPlayer2();
              play();
            }}
            disabled={disableplayer2} className="button-86" role="button"
          >
            Player 2
          </button>
        </div>
        {condition ? playCrowd() : ""}
        {condition ? (
          <button onClick={refreshPage} disabled:false id="new">
            Click to Restart the Game!
          </button>
        ) : (
          ""
        )}
        <video autoPlay muted style={{ display: condition ? "block" : "none" }}>
          <source
            src="https://media.istockphoto.com/id/1410144940/video/confetti-alpha-channel-transparent-background-60-fps-green-halloween-christmas-party-new-year.mp4?s=mp4-640x640-is&k=20&c=W5VUfZC-3QwEOHiJheWSV55E03I00FLPIUMYkuJDcRU="
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
}

export default App;
