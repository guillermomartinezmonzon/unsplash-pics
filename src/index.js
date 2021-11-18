import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./redux";
import { FavoritePage } from "./components/FavoritePage";
import { SearchPage } from "./components/SearchPage";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="favorites" element={<FavoritePage />} />
      </Routes>
    </Router>
  </Provider>,
  document.getElementById("root")
);
