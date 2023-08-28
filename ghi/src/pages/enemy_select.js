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
        <div className='p-3 mb-0 bg-dark text-emphasis-dark vh-100 vw-100'>
            Current Enemies:
            <div className='container mx-auto px-0'style={{height: '285px'}}>
                <div className='mx-0 px-0 border border-dark rounded bg-dark-subtle h-100 d-inline-block w-100'>
                <div className='row mx-0 px-0'>
                    <div className='mt-auto mb-auto'>
                {enemy.map((character, index) => (
                    <div className='col-sm-2 mx-auto' key={index}>
                        <p className='text-center fw-bold fs-5' key={index + 'p'}>{character.character}</p>
                        <img src={character.img} className='img-fluid' key={index+ 'img'}/>
                    </div>
                ))}

                {enemy.length < 1 ?<div className='col-sm-2 mx-auto'>
                    <p className='text-center fw-bold fs-5'> None</p>
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
            </div>
            </div>
            <div className='container mx-auto px-0 mt-5' style={{height: '300px'}}>
            <div className='row mx-auto border border-dark rounded bg-dark-subtle' style={{height:'100%'}}>
            <div id='character-list' className='col-sm-2 list-group' style={{
        height: '298px',
        overflow: 'auto'
    }}>
        <div className='h-100 d-inline-block bg-white '>
            <div className="list-group-item text-bg-dark">Select character</div>
                {enemies.map(enemyClass => {
                    let character = new enemyClass(enemy.length)
                    return (
                    <button type='button' className="list-group-item list-group-item-action" key={character.position} onClick={selectPartyClick(character)}>
                        {character.character}</button>)
                })}
                </div>
                <button className="list-group-item list-group-item-action" onClick={ContinueClick}>Go to Battle</button>
                </div>
                    { selectP ?
                    <>
                                                            <div className='col-sm-2 align-items-center d-flex border-end px-0' style={{height:'100%'}}>
                        <img className='img-fluid' src={selectP.img}/>
                        </div>
                    <div id='char-info' className='col list-group px-0'>
        <div className='h-100 d-inline-block bg-white'>
            <div className="list-group-item text-bg-dark">{selectP.character}'s Stats</div>
            <div style={{
        height: '212px',
        overflow: 'auto'
    }}>
        <div className="list-group-item list-group-item-action" >Weakness:{selectP.weakness.map((item) => (
                            <>
                            {item},
                            </>
                        ))}</div>
        <div className="list-group-item list-group-item-action" >Toughness:{selectP.toughness}</div>
        <div className="list-group-item list-group-item-action" >DEF:{selectP.def}</div>
        <div className="list-group-item list-group-item-action" >SPD:{selectP.base_spd}</div>
                </div>
        <button className="btn btn-dark" onClick={addPartyClick(selectP)}>Add to enemies</button>

                </div>
                </div>

                    </>
                    : <div className='col text-center mt-auto mb-auto'>
                        <h1>Select an enemy</h1>
                        </div>}
            </div>
            </div>
        </div>
        </>
    )
}

export default EnemySelect
