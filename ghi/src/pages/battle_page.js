// things to do
// buttons appear only when its characters turn
// implement enemy turn
import BattleSystem from "../battle_sys/battle.mjs";
import { UnitContext } from "../utils/UnitsContext";
import { useContext, useRef, useState } from "react";

const Battle = () => {

    const {party, setParty} = useContext(UnitContext)
    const {enemy, setEnemy} = useContext(UnitContext)
    const [history, setHistory] = useState([])
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

        if(action['action'] === 'ult' && battle_info.select().cur_en < battle_info.select().max_en){
            console.log('not enough energy')
            return
        }
        targetRef.current['action']= action['action']
        targetRef.current['atk_type']= action['atk_type']

    }

    const TakeAction = () => {

        if(Object.values(targetRef.current).includes(null)){
            console.log('missing parameters')
            return
        }
        const turn = battle_info.take_action(targetRef.current)

        setHistory([{
            'character': turn['character'],
            'dmg': turn['dmg'][0][targetRef.current['target']],
            'target': targetRef.current['target']
        }, ...history])

        targetRef.current = {
        'action': null,
        'atk_type': null,
        'target': null,
        }
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
    <div>Select enemy</div>
        {enemy.map((character, index) => (
            <div key={character.character + index} >{character.character}
            <button onClick={EnemySelect(character.character)}>Select as target</button></div>
        ))}
    </div>
    <button onClick={TakeAction}>Take action</button>
    <div style={{
        height: '200px',
        overflow: 'auto'
    }}>
        {history.map((instance,index) => (
            <p key={index}>{instance['character'].character} did {instance['dmg']} to {instance['target']}</p>
        ))}
    </div>
    </>
)
}

export default Battle
