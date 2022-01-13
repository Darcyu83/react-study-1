import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import PracticeComp from "./components/PracticeComp";

function App() {
  //router v6
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<PracticeComp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
