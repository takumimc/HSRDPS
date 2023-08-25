import BattleSystem from "../battle_sys/battle.mjs";
import { UnitContext } from "../utils/UnitsContext";
import { useContext, useRef, useState } from "react";
import { silhouette } from "../assets/index.mjs";
const Battle = () => {

    const {party, setParty} = useContext(UnitContext)
    const {enemy, setEnemy} = useContext(UnitContext)
    const [history, setHistory] = useState([])
    const targetRef = useRef({
        'action': null,
        'atk_type': null,
        'target': null,
    })

    const [focus, setFocus] =  useState(null)

    const [info, setInfo] = useState(null)

    const battle = useRef(new BattleSystem(party,enemy))
    const battle_info = battle.current

    const EnemySelect = (target) => () => {
        // if(targetRef.current['atk_type'] === 'blast'){
        //     let targets = [target]
        //     const mid = target.position
        //     const left = mid - 1
        //     const right = mid + 1

        //     for(let guy of enemy){
        //         console.log(guy)
        //     }

        //     targetRef.current['target'] = mid
        // }
        targetRef.current['target'] = target.character
        setFocus(target)
    }

    const InfoSelect = (character) => () => {
        setInfo(character)
    }
    const ActionSelect = (action) => () => {

        if(action['action'] === 'ult' && battle_info.select().cur_en < battle_info.select().max_en){
            alert(`Unable to use, ${battle_info.select().character} is currently at ${battle_info.select().cur_en} out of ${battle_info.select().max_en} energy`)
            return
        } else if ( action['action'] === 'skill' && battle_info.sp_counter.sp < 1){
            alert('Not enough SP, use auto instead')
            return
        }
        targetRef.current['action']= action['action']
        targetRef.current['atk_type']= action['atk_type']
    }

    const TakeAction = () => {
        console.log(targetRef.current)
        if(Object.values(targetRef.current).includes(null)){
            alert('Missing parameters, make sure to check an attack and target')
            return
        }
        const turn = battle_info.take_action(targetRef.current)
        console.log(turn)
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
        setFocus(null)

    }
return (
    <>
    <div className='container px-0'>
        <div className='row'>
        {party.map((character, index) =>
        {if(battle_info.select().character === character.character)
        return(
            <div className='col text-center'>
            <div  key={character.character + index}>{character.character}</div>
            <img src={character.img} />
            </div>
        )})}
        <div className='col' style={{height:'500px'}}>
        {targetRef.current['target'] === null ?
        <div className='text-center'>
            <p>Select target</p>
          <img src={silhouette} className='img-fluid' style={{maxHeight: '300px'}}/>
        </div>
        : <div className='text-center'>
            <p>{focus.character}</p>
            <img src={focus.img} className='img-fluid' style={{maxHeight: '431px'}} />
        </div>
        }
    </div>
    </div>
        <div className='row text-center mx-0'>
            {party.map((character) =>{
                if(battle_info.select().character === character.character)
                return (
            <div className='col'>
            {battle_info.select().character === character.character ?
            character.action_list.map((action) => (
            <button key={action[2]} onClick={ActionSelect({
                'action': action[0],
                'atk_type': action[1]
            })}>
            {action[2]}</button>
            )): null}</div>
                    )
            })}
            <div className='col'>Current Sp: {battle_info.sp_counter.sp}/5</div>
        <div className='col'>
        {enemy.map((character) => (
            <button onClick={EnemySelect(character)}>{character.character}</button>
        ))}
        </div>
        </div>
        <div className='row mx-auto'>
    <div className='col-sm-3 px-0' style={{
        height: '200px',
        overflow: 'auto'
    }}>
        Turn Order
        {battle_info.turn_counter.turn_list.map((char,index) => (
            <p className='mb-1 px-0'key={index}>{Object.keys(char)[0]}:{Object.values(char)[0]}</p>
        ))}
        <button onClick={TakeAction}>Take action</button>
    </div>
    <div className='col'style={{
        height: '200px',
        overflow: 'auto'
    }}>
        {history.map((instance,index) => (
            (instance['character'] === 'enemy') ?
            <p key={index}>Enemy turn taken</p>:
            <p key={index}>{instance['character'].character} did {instance['dmg']} to {instance['target']}</p>
        ))}
    </div>
        </div>
    <div className='row mx-0'>
 <div id='character-list' className='col-sm-3 list-group'>
            <div className="list-group-item text-bg-dark">All units</div>
                {battle_info.all_units.map(character => (
                    <button type='button' className="list-group-item list-group-item-action" onClick={InfoSelect(character)} key={character.character}>{character.character}</button>
                ))}
                </div>
                    { info ?
                    <>
                    <div className='col-sm-2' style={{height:'100%'}}>
                        <img className='img-fluid' src={info.img}/>
                        </div>
                    <div className='col-sm'>
                        <p>{info.element}</p>
                        <p>HP:{info.hp}</p>
                        <p>ATK:{info.atk}</p>
                        <p>SPD:{info.base_spd}</p>
                        <p>Energy:{info.cur_en}/{info.max_en}</p>
                    </div>
                    </>
                    : <div className='col text-center'>
                        Select a character
                        </div>}
    </div>


</div>


    </>
)
}

export default Battle
