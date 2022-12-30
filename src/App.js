import { Routes, Route } from "react-router-dom";
import CustomerLogin from "./pages/CustomerLogin";
import "./App.css"
import Landing from "./pages/Landing";
import CustomerMeter from "./pages/CustomerMeter";
import CusBill from "./pages/CusBill";
import CustomNavbar from "./components/CustomNavbar";
import AdminViewMeterReading from "./pages/AdminViewMeterReading";

function App() {
  return (
    <>
      <div className="App">
        <CustomNavbar></CustomNavbar>
        <Routes>
          <Route exact path="/" element={<CustomerLogin />} />
          <Route exact path="/landing" element={<Landing />} />
          <Route exact path="/cusMeter" element={<CustomerMeter />} />
          <Route exact path="/cusBill" element={<CusBill />} />
          <Route exact path="/adminView" element={<AdminViewMeterReading />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
