import { useEffect, useState } from 'react';
import './App.css'
import axios from "axios";
import { rand } from "./wordList"

function App() {
  const [defintion, setDefinition] = useState("")
  const [word, setWord] = useState("battle");
  const [press, setPress] = useState(0);
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

  

  return (
    <>
      <h1>Guess the word</h1>
      <p>the word is {word}</p>
      <p>{defintion}</p>
      <button onClick={clicked}>refresh</button>
    </>
  );
}

export default App
