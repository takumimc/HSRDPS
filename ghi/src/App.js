import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Battle from "./pages/battle_page.js";
import PartySelect from "./pages/party_select";
import UnitContext from "./utils/UnitsContext";
import { useState } from "react";

function App() {

const [party, setParty] = useState([])
const [enemy, setEnemy] = useState([])


  return (
    <BrowserRouter>
      <UnitContext.Provider
          value={{
            party,setParty,enemy,setEnemy
          }
        }
          >
        <Routes>
          <Route path='/'>
            <Route path='' element={<PartySelect/>}/>
            <Route path='battle' element={<Battle/>}/>
          </Route>
        </Routes>
      </UnitContext.Provider>
    </BrowserRouter>
  );
}

export default App;
