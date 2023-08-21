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


    const battle = useRef(new BattleSystem(party,enemy))
    const battle_info = battle.current

    const EnemySelect = (target) => () => {
        targetRef.current['target'] = target
    }

    const ActionSelect = (action) => () => {

        if(action['action'] === 'ult' && battle_info.select().cur_en < battle_info.select().max_en){
            alert(`Unable to use, ${battle_info.select().character} is currently at ${battle_info.select().cur_en} out of ${battle_info.select().max_en} energy`)
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

        const charHistory = {
            'character': turn['character'],
            'dmg': turn['dmg'][0][targetRef.current['target']],
            'target': targetRef.current['target']
        }

        const enemyHistory = {}
        let enemy_check=battle_info.select()
        if(enemy_check.unit_type === 'enemy'){
            enemyHistory['character'] = 'enemy'
            battle_info.turn_counter.next_turn()
            setHistory([enemyHistory,charHistory,...history])
        } else{
            setHistory([charHistory, ...history])
        }
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
            {battle_info.select().character === character.character ?
            character.action_list.map((action) => (
            <button key={action[2]} onClick={ActionSelect({
                'action': action[0],
                'atk_type': action[1]
            })}>
            {action[2]}</button>
            )): null}</div>
        ))}
    <div>Select enemy</div>
        {enemy.map((character, index) => (
            <div key={character.character + index} >{index + 1}.{character.character}
            <button onClick={EnemySelect(character.character)}>Select as target</button></div>
        ))}
    </div>
    <button onClick={TakeAction}>Take action</button>
    <div style={{
        height: '200px',
        overflow: 'auto'
    }}>
        {history.map((instance,index) => (
            (instance['character'] === 'enemy') ?
            <p key={index}>enemy turn taken</p>:
            <p key={index}>{instance['character'].character} did {instance['dmg']} to {instance['target']}</p>
        ))}
    </div>
    <div>
        Turn Order
        {battle_info.turn_counter.turn_list.map((char,index) => (
            <p key={index}>{Object.keys(char)[0]}:{Object.values(char)[0]}</p>
        ))}
    </div>
    </>
)
}

export default Battle
