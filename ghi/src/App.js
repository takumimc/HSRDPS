import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Battle from "./pages/battle_page.js";
import PartySelect from "./pages/party_select";
import { useState } from "react";
import UnitContextProvider from "./utils/UnitsContext";
function App() {

  return (
    <BrowserRouter>
    <UnitContextProvider>
        <Routes>
          <Route path='/'>
            <Route path='' element={<PartySelect/>}/>
            <Route path='battle' element={<Battle/>}/>
          </Route>
        </Routes>
      </UnitContextProvider>
    </BrowserRouter>
      //   <UnitContextProvider>
      //     <PartySelect/>
      // </UnitContextProvider>
  );
}

export default App;
