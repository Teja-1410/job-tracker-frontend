import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ACRepairPage from "./pages/ACRepairPage";
import SalonSpaPage from "./pages/SalonSpaPage";
import CateringPage from "./pages/CateringPage";
import CleaningPage from "./pages/CleaningPage";
import ElectricianPage from "./pages/ElectricianPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/ac-repair" element={<ACRepairPage />} />
        <Route path="/services/salon-spa" element={<SalonSpaPage />} />
        <Route path="/services/catering" element={<CateringPage />} />
        <Route path="/services/cleaning" element={<CleaningPage />} />
        <Route path="/services/electrician" element={<ElectricianPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;