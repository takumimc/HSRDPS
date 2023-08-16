
import BattleSystem from "../battle_sys/battle.mjs";
import { UnitContext } from "../utils/UnitsContext";
import { useContext, useRef } from "react";

const Battle = () => {

    const {party, setParty} = useContext(UnitContext)
    const {enemy, setEnemy} = useContext(UnitContext)
    const targetRef = useRef({
        'action': null,
        'atk_type': null,
        'target': null,
    })

    let battle_info = new BattleSystem(party,enemy)


    const EnemySelect = (target) => () => {
        targetRef.current['target'] = target
    }

    const ActionSelect = (action) => () => {

        targetRef.current['action']= action['action']
        targetRef.current['atk_type']= action['atk_type']

    }

    const TakeAction = () => {
        const dmg = battle_info.take_action(targetRef.current)

        console.log(battle_info.turn_counter.current_character() +' did ' + dmg[targetRef.current['target']]
         + ' to ' + targetRef.current['target'])
        targetRef.current = {
        'action': null,
        'atk_type': null,
        'target': null,
        }
        console.log(party)
    }
return (
    <>
    <div>Battle</div>
    <div>
        {party.map((character, index) => (
            <div key={character.character + index}>{character.character}
            {character.action_list.map((action) => (
            <button key={action[2]} onClick={ActionSelect({
                'action': action[0],
                'atk_type': action[1]
            })}>
            {action[2]}</button>
            ))}</div>
        ))}
        {enemy.map((character, index) => (
            <div key={character.character + index} onClick={EnemySelect(character.character)}>{character.character}</div>
        ))}
    </div>
    <button onClick={TakeAction}>Take action</button>
    </>
)
}

export default Battle
