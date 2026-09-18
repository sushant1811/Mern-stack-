import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import MapStore from "./Components/MapStore.jsx"; // Import MapStore component
import StorePageOld from "./Components/StoresPageOld.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/map" element={<MapStore />} />  {/* Add route for map */}
      <Route path="/stores" element={<StorePageOld />} />
    </Routes>
  );
}

export default App;
