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
        <div className='p-3 mb-0 bg-dark text-emphasis-dark vh-100 vw-100'>
            Current Party:
            <div className='container mx-auto px-0'style={{height: '285px'}}>
                <div className='mx-0 px-0 border border-dark rounded bg-dark-subtle h-100 d-inline-block w-100'>
                    <div className='row h-100'>
                {party.map((character, index) => (
                    <div className='col-sm-2 d-inline w-25 h-100 px-0' key={index}>
                        <div className='mx-auto'>
                        <p className='text-center fw-bold fs-5'>{character.character}</p>
                        <img src={character.img} className='mx-auto d-block' style={{width:'60%'}}/>
                        </div>
                    </div>
                ))}

                {party.length < 1 ?<div className='col-sm-2 d-inline w-25 h-100 px-0'>
                    <p className='text-center fw-bold fs-5'> None</p>
                    <img src={silhouette} className='mx-auto d-block' style={{width: '60%'}}/>
                </div>
                 : null}
                {party.length < 2 ?<div className='col-sm-2 d-inline w-25 h-100 px-0'>
                    <p className='text-center fw-bold fs-5'> None</p>
                    <img src={silhouette} className='mx-auto d-block' style={{width: '60%'}}/>
                </div>
                 : null}
                {party.length < 3 ?<div className='col-sm-2 d-inline w-25 h-100 px-0'>
                    <p className='text-center fw-bold fs-5'> None</p>
                    <img src={silhouette} className='mx-auto d-block' style={{width: '60%'}}/>
                </div>
                 : null}
                {party.length < 4 ?<div className='col-sm-2 d-inline w-25 h-100 px-0'>
                    <p className='text-center fw-bold fs-5'> None</p>
                    <img src={silhouette} className='mx-auto d-block' style={{width: '60%'}}/>
                </div>
                 : null}
</div>
            </div>
            </div>

            <div className='container mx-auto px-0 mt-5' style={{height: '300px'}}>
            <div className='row mx-auto border border-dark rounded bg-dark-subtle' style={{height:'100%'}}>
            <div id='character-list' className='col-sm-2 list-group mx-0 px-0' style={{
        height: '298px',
        overflow: 'auto'
    }}>
                <div className='h-100 d-inline-block bg-white'>
            <div className="list-group-item text-bg-dark">Select character</div>
                {characters.map(character => (
                    <button type='button' className="list-group-item list-group-item-action" key={character.character} onClick={selectPartyClick(character)}>{character.character}</button>
                ))}
                </div>
                <button className="list-group-item list-group-item-action list-group-item-success" onClick={ContinueClick}>Go to Enemy Select</button>
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
        <div className="list-group-item list-group-item-action" >Element: {selectP.element}</div>
        <div className="list-group-item list-group-item-action" >HP: {selectP.hp}</div>
        <div className="list-group-item list-group-item-action" >ATK: {selectP.atk}</div>
        <div className="list-group-item list-group-item-action" >SPD: {selectP.base_spd}</div>
                </div>
        <button className="btn btn-dark" onClick={addPartyClick(selectP)}>Add to party</button>

                </div>
                </div>
                    </>
                    : <div className='col text-center mt-auto mb-auto'>
                        <h1>Select a character</h1>
                        </div>}
            </div>
            </div>
        </div>
        </>
    )
}

export default PartySelect
