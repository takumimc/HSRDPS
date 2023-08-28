import BattleSystem from "../battle_sys/battle.mjs";
import { UnitContext } from "../utils/UnitsContext";
import { useContext, useRef, useState } from "react";
import { silhouette } from "../assets/index.mjs";
const Battle = () => {

    const {party} = useContext(UnitContext)
    const {enemy} = useContext(UnitContext)
    const [history, setHistory] = useState([])
    const targetRef = useRef({
        'action': null,
        'atk_type': null,
        'target': null,
    })

    const [focus, setFocus] =  useState(null)


    const battle = useRef(new BattleSystem(party,enemy))
    const battle_info = battle.current

    const [info, setInfo] = useState(battle_info.all_units[0])


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

        if(Object.values(targetRef.current).includes(null)){
            alert('Missing parameters, make sure to check an attack and target')
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
        setFocus(null)

    }
return (
    <div className='p-3 mb-0 bg-dark text-emphasis-dark h-100 vw-100'>
    <div className='container mx-auto px-0'>
    <div className='mx-0 px-0 border border-dark rounded bg-dark-subtle d-inline-block w-100'>
        <div className='row mt-3 mb-3' style={{height:'500px'}}>
        {party.filter(character => battle_info.select().character === character.character).map((character, index) => {
            return(
            <div className='col text-center'>
            <div  key={character.character + index} ><p className='text-center fw-bold fs-5'>{character.character}</p></div>
            <img src={character.img} className='mx-auto d-block' alt={character.character} style={{width:'60%'}} />
            </div>
            )})}

        <div className='col'>
        {targetRef.current['target'] === null ?
        <div className='text-center'>
            <p className='text-center fw-bold fs-5'>Select target</p>
          <img src={silhouette} className='mx-auto d-block' alt='placeholder' style={{width: '60%'}}/>
        </div>
        : <div className='text-center'>
            <p className='text-center fw-bold fs-5'>{focus.character}</p>
            <img src={focus.img} className='mx-auto d-block' alt={focus.character} style={{width:'65%'}} />
        </div>
        }
    </div>
    </div>

        <div className='row text-center mx-0 mb-3'>
            {party.filter(character => battle_info.select().character === character.character).map((character) =>{
                return (
            <div className='col'>
            {battle_info.select().character === character.character ?
            character.action_list.map((action) => (
            <button key={action[2]}  className='btn btn-dark' onClick={ActionSelect({
                'action': action[0],
                'atk_type': action[1]
            })}>
            {action[2]}</button>
            )): <div></div>}</div>
                    )
})}

        <div className='col'>
        {enemy.map((character) => (
            <button className='btn btn-dark' onClick={EnemySelect(character)}>{character.character}</button>
        ))}
        </div>
        </div>
        </div>

        <div className='mx-0 px-0 border border-dark rounded bg-dark-subtle h-100 d-inline-block w-100 mt-4'>
        <div className='row mx-auto'>
            <div id='turn-order' className='col-sm-3 list-group px-0'>
        <div className='h-100 d-inline-block bg-white'>
            <div className="list-group-item text-bg-dark">Turn Order</div>
            <div style={{
        height: '150px',
        overflow: 'auto'
    }}>
                {battle_info.turn_counter.turn_list.map((character,index) => (
                    <div className="list-group-item list-group-item-action" key={index}>{Object.keys(character)[0]}: {Object.values(character)[0]}</div>
                ))}
                </div>
                <button className="list-group-item list-group-item-action list-group-item-success" onClick={TakeAction}>Take action</button>
                </div>
                </div>

            <div id='turn-order' className='col-sm-3 list-group px-0'>
        <div className='h-100 d-inline-block bg-white'>
            <div className="list-group-item text-bg-dark">Battle Information</div>
            <div>
                    <div className="list-group-item list-group-item-action">
                Current Sp: {battle_info.sp_counter.sp}/5
                    </div>
                    <div className="list-group-item list-group-item-action">
                Cycle: {battle_info.turn_counter.cycle}
                    </div>
                    <div className="list-group-item list-group-item-action">
AV until next Cycle: {battle_info.turn_counter.current_cycle_AV}
                    </div>
                </div>
                </div>
                </div>


            <div id='turn-order' className='col list-group px-0'>
        <div className='h-100 d-inline-block bg-white'>
            <div className="list-group-item text-bg-dark">Battle History</div>
            <div style={{
        height: '192px',
        overflow: 'auto'
    }}>
                {history.map((instance,index) => (
                    (instance['character'] === 'enemy')?
                                       <div className="list-group-item list-group-item-action" key={index}>
                        Enemy turn taken</div> :
                    <div className="list-group-item list-group-item-action" key={index}>
                        {instance['character'].character} did {instance['dmg']} to {instance['target']}</div>

                ))}

                </div>

                </div>
                </div>

</div>
            </div>
    <div className='mx-0 px-0 border border-dark rounded bg-dark-subtle h-100 d-inline-block w-100 mt-4 rounded'>
    <div className='row mx-0 mb-0' style={{height: '260px'}}>
 <div id='character-list' className='col-sm-3 list-group'>
        <div className='h-100 d-inline-block bg-white'>
            <div className="list-group-item text-bg-dark">All units</div>
                {battle_info.all_units.map(character => (
                    <button type='button' className="list-group-item list-group-item-action" onClick={InfoSelect(character)} key={character.character}>{character.character}</button>
                ))}
                </div>
                </div>
                    { info.unit_type === 'player' ?
                    <>
                    <div className='col-sm-2 align-items-center d-flex border-end' style={{height:'100%'}}>
                        <img className='img-fluid' alt='img' src={info.img}/>
                        </div>
                    <div id='char-info' className='col list-group px-0'>
        <div className='h-100 d-inline-block bg-white'>
            <div className="list-group-item text-bg-dark">{info.character}'s Stats</div>
            <div style={{
        height: '212px',
        overflow: 'auto'
    }}>
        <div className="list-group-item list-group-item-action">Total Dmg Done: {info.total_dmg}</div>
        <div className="list-group-item list-group-item-action" >Element: {info.element}</div>
        <div className="list-group-item list-group-item-action" >HP: {info.hp}</div>
        <div className="list-group-item list-group-item-action" >ATK: {info.atk}</div>
        <div className="list-group-item list-group-item-action" >SPD: {info.base_spd}</div>
        <div className="list-group-item list-group-item-action" >Energy: {info.cur_en}</div>

                </div>

                </div>
                </div>

                    </>
                    : null}
                    { info.unit_type === 'enemy' ?
                    <>
                    <div className='col-sm-2 align-items-center d-flex border-end' style={{height:'100%'}}>
                        <img className='img-fluid' alt='img' src={info.img}/>
                        </div>
                    <div id='enemy-info' className='col list-group px-0'>
        <div className='h-100 d-inline-block bg-white'>
            <div className="list-group-item text-bg-dark">{info.character}'s Stats</div>
            <div style={{
        height: '212px',
        overflow: 'auto'
    }}>
        <div className="list-group-item list-group-item-action">Weakness: {info.weakness.map((item) => (
                            <>
                            {item},
                            </>))}</div>
        <div className="list-group-item list-group-item-action" >Toughness:{info.toughness}</div>
        <div className="list-group-item list-group-item-action" >DEF:{info.def}</div>
        <div className="list-group-item list-group-item-action" >SPD:{info.base_spd}</div>



                </div>

                </div>
                </div>
                    </>
                    : null}
            </div>
            </div>
        </div>
    </div>
)
}

export default Battle
