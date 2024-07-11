import "./App.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Favorites from "./components/Favorites";
import Home from "./components/Home";
import Header from "./components/Header";
import BarcodeScanner from "./components/BarcodeScanner";
import Goals from "./components/Goals";
import NutritionTracker from "./components/NutritionTracker";
import Recipe from "./components/Recipe";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/favorites" element={<Favorites />}/>
          <Route path="/recipes" element={<Recipe />}/>
          <Route path="/tracker" element={<NutritionTracker />}/>
          <Route path="/barcode-scanner" element={<BarcodeScanner />}/>
          <Route path="/goals" element={<Goals />}/>
          <Route path="*" element={<Navigate to="/" />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
