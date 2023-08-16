
import BattleSystem from "../battle_sys/battle.mjs";
import UnitContext from "../utils/UnitsContext";
import { useContext } from "react";

const Battle = () => {

    const {party, setParty} = useContext(UnitContext)
    const {enemy, setEnemy} = useContext(UnitContext)

    let battle_info = new BattleSystem(party,enemy)
    console.log(battle_info.turn_counter.turn_list)
return (
    <>
    <div>Battle</div>
    <button>Take action</button>
    </>
)
}

export default Battle
