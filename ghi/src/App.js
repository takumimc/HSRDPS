import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Battle from "./pages/battle_page.js";
import PartySelect from "./pages/party_select";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
        <Route path='' element={<PartySelect/>}/>
          <Route path='battle' element={<Battle/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
