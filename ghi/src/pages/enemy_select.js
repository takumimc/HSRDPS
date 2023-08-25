import enemies from "../characters/enemy_index.mjs";
import characters from "../characters/party_index.mjs";
import { useContext, useState } from "react";
import { UnitContext } from "../utils/UnitsContext";
import { useNavigate } from "react-router-dom";
import { silhouette } from "../assets/index.mjs";


const EnemySelect= () =>{
    const nav = useNavigate()

    const {enemy, setEnemy} = useContext(UnitContext)


    const [selectP, setSelectP] = useState(null)


    const addPartyClick = (select) => () => {
        if(enemy.length === 1){
            alert('Only one enemy currently supported')
            return
        }
        setEnemy([...enemy,select])
        console.log(enemy)
        setSelectP(null)
    }

    const selectPartyClick = (character) => () => {
        setSelectP(character)
    }


    const ContinueClick = () => {
        nav('/battle')
    }
    return (
        <>
        <div>
            Current Enemies:
            <div className='container mx-auto px-0 'style={{height: '250px'}}>
                <div className='row mx-0 px-0'>
                {enemy.map((character, index) => (
                    <div className='col-sm-2 mx-auto' key={index}>
                        <p className='text-center' key={index + 'p'}>{character.character}</p>
                        <img src={character.img} className='img-fluid' key={index+ 'img'}/>
                    </div>
                ))}

                {enemy.length < 1 ?<div className='col-sm-2 mx-auto'>
                    <p className='text-center'> None</p>
                    <img src={silhouette} className='img-fluid'/>
                </div>
                 : null}
                {/* {enemy.length < 2 ?<div className='col-sm-2 mx-auto'>
                    <p className='text-center'> None</p>
                    <img src={silhouette} className='img-fluid'/>
                </div>
                 : null}
                {enemy.length < 3 ?<div className='col-sm-2 mx-auto'>
                    <p className='text-center'> None</p>
                    <img src={silhouette} className='img-fluid'/>
                </div>
                 : null}
                {enemy.length < 4 ?<div className='col-sm-2 mx-auto'>
                    <p className='text-center'> None</p>
                    <img src={silhouette} className='img-fluid'/>
                </div>
                 : null}
                {enemy.length < 5 ?<div className='col-sm-2 mx-auto'>
                    <p className='text-center'> None</p>
                    <img src={silhouette} className='img-fluid'/>
                </div>
                 : null} */}

            </div>
            </div>

            <div className='mx-0 px-0' style={{height: '300px'}}>
            <div className='row' style={{height:'100%'}}>
            <div id='character-list' className='col-sm-2 list-group'>
            <div className="list-group-item text-bg-dark">Select character</div>
                {enemies.map(enemyClass => {
                    let character = new enemyClass(enemy.length)
                    return (
                    <button type='button' className="list-group-item list-group-item-action" key={character.position} onClick={selectPartyClick(character)}>
                        {character.character}</button>)
                })}
                <button className="btn btn-outline-dark" onClick={ContinueClick}>Go to Battle</button>
                </div>
                    { selectP ?
                    <>
                    <div className='col-sm-2' style={{height:'100%'}}>
                        <img className='img-fluid' src={selectP.img}/>
                        </div>
                    <div className='col-sm'>
                        <p>Weakness: {selectP.weakness.map((item) => (
                            <>
                            {item},
                            </>
                        ))}</p>
                        <p>Toughness:{selectP.toughness}</p>
                        <p>DEF:{selectP.def}</p>
                        <p>SPD:{selectP.base_spd}</p>
                    <button className="btn btn-dark" onClick={addPartyClick(selectP)}>Add</button>
                    </div>
                    </>
                    : <div className='col text-center'>
                        Select an enemy
                        </div>}
            </div>
            </div>
        </div>
        </>
    )
}

export default EnemySelect
