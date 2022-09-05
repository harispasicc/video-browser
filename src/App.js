import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Video from "./components/Video";

function App({ playerF, playerS }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Video />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
