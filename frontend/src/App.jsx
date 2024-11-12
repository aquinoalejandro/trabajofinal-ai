import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Principal from './pages/Principal'
import Ia from "./pages/IA";

const App = () => {
    return (
    <Router>
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/IA" element={<Ia />} />
        </Routes>
    </Router>
    );
}

export default App;
