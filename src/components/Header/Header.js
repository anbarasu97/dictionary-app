import { ThemeProvider } from "@emotion/react";
import { createTheme, MenuItem, TextField } from "@mui/material";
import React from "react";
import "./Header.css";
import categories from "../../data/category";

const Header = ({
  category,
  setCategory,
  word,
  setWord,
  setMeanings,
  lightMode,
}) => {
  const handleChange = (e) => {
    setCategory(e.target.value);
    setWord("");
    setMeanings([]);
  };
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: lightMode ? "#000" : "#fff",
      },
      mode: lightMode ? "light" : "dark",
    },
  });
  return (
    <div className="header">
      <span className="title">React Dictionary</span>
      <div className="inputs">
        <ThemeProvider theme={darkTheme}>
          <TextField
            className="search"
            label="Search a word"
            id="standard-basic"
            variant="standard"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <TextField
            select
            label="Language"
            value={category}
            onChange={(e) => handleChange(e)}
            className="select"
          >
            {categories.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;
