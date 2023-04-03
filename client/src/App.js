import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import LoginPage from "pages/LoginPage";
import ErrorPage from "pages/ErrorPage";
import MainPage from "pages/MainPage";
import AuthPage from "pages/AuthPage";

function App() {
  axios.defaults.withCredentials = true;
  // sessionStorage.clear()
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* <Route path="login" element={<LoginPage />} /> */}
          <Route path="main/*" element={<MainPage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;