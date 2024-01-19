import { useEffect, useState } from 'react';
import './App.css'
import axios from "axios";
import { rand } from "./wordList"

function App() {
  const [defintion, setDefinition] = useState("");
  const [word, setWord] = useState("");
  const [press, setPress] = useState(0);
  const [guess, setGuess] = useState();
  const [finished, setFinished] = useState("");
  const clicked = () => {
    setPress(press+1)
  }

  useEffect(() => {
    async function getDefinition() {
      const response = await axios.get("https://api.dictionaryapi.dev/api/v2/entries/en/" + word);
      setDefinition(response.data[0].meanings[0].definitions[0].definition)
    }
    getDefinition();
  }, [word])

  useEffect(() => {
    setWord(rand());
  }, [press])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInput = (event: any) => {
    event.preventDefault();
    setGuess(event.target.value)
  }

  useEffect(() => {
    if (guess === word) {
      setFinished("Nice job guessing " + word + " Im Proud of You")
    }
    else setFinished("");
  }, [guess, word])


  return (
    <>
      <h1>Guess the word</h1>
      <p>the word is {word}</p>
      <p>{defintion}</p>
      <button onClick={clicked}>refresh</button>
      <input type='text' name='guess'  placeholder="Your Guess"onChange={handleInput}></input>
      <p>{finished}</p>
    </>
  );
}

export default App;
