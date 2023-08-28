import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Battle from "./pages/battle_page.js";
import PartySelect from "./pages/party_select";
import EnemySelect from "./pages/enemy_select";
import UnitContextProvider from "./utils/UnitsContext";
function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  return (
    <BrowserRouter basename={basename}>
    <UnitContextProvider>
        <Routes>
          <Route path='/'>
            <Route path='' element={<PartySelect/>}/>
            <Route path='enemy' element={<EnemySelect/>}/>
            <Route path='battle' element={<Battle/>}/>
          </Route>
        </Routes>
      </UnitContextProvider>
    </BrowserRouter>
  );
}

export default App;
