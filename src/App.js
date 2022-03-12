import { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import "./App.css";
import { Container, withStyles } from "@mui/material";
import Header from "./components/Header/Header";
import Definitions from "./components/Definitions/Definitions";

const label = { inputProps: { "aria-label": "Switch demo" } };

function App() {
  const [category, setCategory] = useState("en");
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [lightMode, setLightMode] = useState(false);

  const dictionaryApi = async () => {
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      );
      console.log(data);
      setMeanings(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dictionaryApi();
  }, [word, category]);

  return (
    <div
      className="App"
      style={{
        height: "100vh",
        backgroundColor: lightMode ? "#fff" : "#282c34",
        color: lightMode ? "black" : "white",
        transition: "all 0.5s linear",
      }}
    >
      <Container
        maxWidth="md"
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <div
          style={{ position: "absolute", top: 0, right: 15, paddingTop: 10 }}
        >
          <span>{lightMode ? "Dark" : "Light"} Mode</span>
          <Switch
            {...label}
            onChange={() => setLightMode(!lightMode)}
            // defaultChecked
            color="default"
          />
        </div>
        <Header
          category={category}
          setCategory={setCategory}
          word={word}
          setWord={setWord}
          setMeanings={setMeanings}
          lightMode={lightMode}
        />
        {meanings && (
          <Definitions
            word={word}
            meanings={meanings}
            category={category}
            lightMode={lightMode}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
