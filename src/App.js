import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { ROUTES } from "./constants/routers";
import HomePage from "./Page/HomePage";
import DetailPage from "./Page/DetailPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME_NEW} element={<HomePage />} />
          <Route path={ROUTES.DETAIL_TASK} element={<DetailPage />} />
          <Route path="/" element={<Navigate to={ROUTES.HOME_NEW} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
