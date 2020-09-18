import React from "react";
import "./styles.css";
import RickAndMorty from "../src/components/episodes";
import Search from "../src//components/search";

import StickyFooter from "react-sticky-footer";

export default function App() {
  return (
    <div className="App">
      <h1 className="title">Get Schwifty</h1>
      <h1 className="subtitle">Time to get Riggity Riggity Wrecked Son!</h1>
      <Search />
      <RickAndMorty />
      <StickyFooter
        bottomThreshold={50}
        normalStyles={{
          backgroundColor: "#1f1f1f",
          padding: "1rem",
          fontWeight: "bold"
        }}
      >
        Made with ❤ by Hrishi Jangir
      </StickyFooter>
    </div>
  );
}
