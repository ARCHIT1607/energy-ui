import { Routes, Route, useNavigate } from "react-router-dom";
import CustomerLogin from "./pages/CustomerLogin";
import "./App.css"
import Landing from "./pages/Landing";
import CustomerMeter from "./pages/CustomerMeter";
import CusBill from "./pages/CusBill";
import CustomNavbar from "./components/CustomNavbar";
import AdminViewMeterReading from "./pages/AdminViewMeterReading";
import AdminDashboard from "./pages/AdminDashboard";
import { useEffect } from "react";
import PriceSet from "./components/PriceSet/PriceSet";
import AccessAll from "./components/AccessAll/AccessAll";

function App() {

  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("user")==null){
      navigate("/")
    }
  }, [])
  
  return (
    <>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<CustomerLogin />} />
          <Route exact path="/landing" element={<Landing />} />
          <Route exact path="/cusMeter" element={<CustomerMeter />} />
          <Route exact path="/cusBill" element={<CusBill />} />
          <Route exact path="/adminDashboard" element={<AdminDashboard />} >
          <Route exact path="adminView" element={<AdminViewMeterReading />} />
          <Route exact path="priceSet" element={<PriceSet />} />
          <Route exact path="accessAll" element={<AccessAll />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
