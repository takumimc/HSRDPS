import enemies from "../characters/enemy_index.mjs";
import characters from "../characters/party_index.mjs";
import { useContext, useState } from "react";
import { UnitContext } from "../utils/UnitsContext";
import { useNavigate } from "react-router-dom";
import { silhouette } from "../assets/index.mjs";


const PartySelect = () =>{
    const nav = useNavigate()

    const {party, setParty} = useContext(UnitContext)


    const [selectP, setSelectP] = useState(null)


    const addPartyClick = (select) => () => {
        if(party.length === 4){
            alert('Maximum party size reached')
            return
        } else if (party.indexOf(select) > -1){
            alert('Character is already in the party')
            return
        }
        setParty([...party,select])
        console.log('added character')
        setSelectP(null)
    }

    const selectPartyClick = (character) => () => {
        setSelectP(character)
    }


    const ContinueClick = () => {
        nav('/enemy')
    }
    return (
        <>
        <div>
            Current Party:
            <div className='container mx-auto px-0 'style={{height: '250px'}}>
                <div className='row mx-0 px-0'>
                {party.map((character, index) => (
                    <div className='col-sm-2 mx-auto' key={index}>
                        <p className='text-center'>{character.character}</p>
                        <img src={character.img} className='img-fluid'/>
                    </div>
                ))}

                {party.length < 1 ?<div className='col-sm-2 mx-auto'>
                    <p className='text-center'> None</p>
                    <img src={silhouette} className='img-fluid'/>
                </div>
                 : null}
                {party.length < 2 ?<div className='col-sm-2 mx-auto'>
                    <p className='text-center'> None</p>
                    <img src={silhouette} className='img-fluid'/>
                </div>
                 : null}
                {party.length < 3 ?<div className='col-sm-2 mx-auto'>
                    <p className='text-center'> None</p>
                    <img src={silhouette} className='img-fluid'/>
                </div>
                 : null}
                {party.length < 4 ?<div className='col-sm-2 mx-auto'>
                    <p className='text-center'> None</p>
                    <img src={silhouette} className='img-fluid'/>
                </div>
                 : null}

            </div>
            </div>

            <div className='mx-0 px-0' style={{height: '300px'}}>
            <div className='row' style={{height:'100%'}}>
            <div id='character-list' className='col-sm-2 list-group'>
            <div className="list-group-item text-bg-dark">Select character</div>
                {characters.map(character => (
                    <button type='button' className="list-group-item list-group-item-action" key={character.character} onClick={selectPartyClick(character)}>{character.character}</button>
                ))}
                <button className="btn btn-outline-dark" onClick={ContinueClick}>Go to Enemy Select</button>
                </div>
                    { selectP ?
                    <>
                    <div className='col-sm-2' style={{height:'100%'}}>
                        <img className='img-fluid' src={selectP.img}/>
                        </div>
                    <div className='col-sm'>
                        <p>{selectP.element}</p>
                        <p>HP:{selectP.hp}</p>
                        <p>ATK:{selectP.atk}</p>
                        <p>SPD:{selectP.base_spd}</p>
                    <button className="btn btn-dark" onClick={addPartyClick(selectP)}>Add</button>
                    </div>
                    </>
                    : <div className='col text-center'>
                        Select a character
                        </div>}
            </div>
            </div>
        </div>
        </>
    )
}

export default PartySelect
