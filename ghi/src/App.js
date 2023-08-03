import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import PhysTb from "./characters/phys_tb.mjs";
import TurnCount from "./battle_sys/turn_counter.mjs";


function App() {



  useEffect(() => {
                    const character_data = {
                        'character': 'Physical Traiblazer',
                        'element': 'physical',
                        'base_hp': 1000,
                        'base_atk': 500,
                        'base_def': 500,
                        'base_spd': 120,
                        'hp_per': 0,
                        'atk_per': 0,
                        'defe_per': 0,
                        'crit_rate': 0,
                        'crit_dmg': 0,
                        'break_effect': 0,
                        'outgoing_heal': 0,
                        'max_energy': 100,
                        'energy_regen': 0,
                        'effect_hitrate': 0,
                        'effect_hitres': 0,
                        'element_dmg_boost': 0,
                        'element_dmg_res': 0,
                        'auto_lvl': 1,
                        'skill_lvl': 1,
                        'ult_lvl': 1,

                    }

let Phys = new PhysTb(character_data)
                    const character_data2 = {
                        'character': 'Traiblazer',
                        'element': 'physical',
                        'base_hp': 1000,
                        'base_atk': 500,
                        'base_def': 500,
                        'base_spd': 60,
                        'hp_per': 0,
                        'atk_per': 0,
                        'defe_per': 0,
                        'crit_rate': 0,
                        'crit_dmg': 0,
                        'break_effect': 0,
                        'outgoing_heal': 0,
                        'max_energy': 100,
                        'energy_regen': 0,
                        'effect_hitrate': 0,
                        'effect_hitres': 0,
                        'element_dmg_boost': 0,
                        'element_dmg_res': 0,
                        'auto_lvl': 1,
                        'skill_lvl': 1,
                        'ult_lvl': 1,

                    }

let Phys2 = new PhysTb(character_data2)
let turns = new TurnCount([Phys, Phys2])
console.log(Phys.ult('single'))
console.log(turns.character_speed_list)
console.log('AV',turns.base_AV_dict)
}, []);

  return (
    <div>
    </div>
  );
}

export default App;
