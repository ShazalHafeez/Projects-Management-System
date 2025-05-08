import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth.jsx";
import Main from "./pages/Main.jsx";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/Main" element={<Main />} />
        </Routes>
      </Router>
  );
}

export default App;
//comment