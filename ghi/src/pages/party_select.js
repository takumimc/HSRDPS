import enemies from "../characters/enemy_index.mjs";
import characters from "../characters/party_index.mjs";
import { useContext, useState } from "react";
import { UnitContext } from "../utils/UnitsContext";
import { useNavigate } from "react-router-dom";

const PartySelect = () =>{
    const nav = useNavigate()

    const {party, setParty} = useContext(UnitContext)
    const {enemy, setEnemy} = useContext(UnitContext)

    const [selectP, setSelectP] = useState(null)
    const [selectE, setSelectE] = useState(null)

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

    const selectEnemyClick = (character) => () => {
        setSelectE(character)
    }

    const addEnemyClick = (character) => () => {
        if(enemy.length === 5){
            console.log('maximum enemy')
            return
        }
        setEnemy([...enemy,character])
        setSelectE(null)

    }

    const ContinueClick = () => {
        nav('battle')
    }
    return (
        <>
        <div>
            Party
            <div>Current Party Members
                {party.map((character, index) => (
                    <div key={index}>{character.character}</div>
                ))}
            </div>
            <div>Add Member</div>
            <div id='character-list' >
                {characters.map(character => (
                    <div key={character.character} onClick={selectPartyClick(character)}>{character.character}</div>
                ))}
            </div>
            <button onClick={addPartyClick(selectP)}>Add</button>
        </div>
        <div>
            Enemy list
            <div>Current Enemies
                {enemy.map((character, index) => (
                    <div key={index}>{character.character}</div>
                ))}
            </div>
            <div>Add Enemy</div>
            <div id='enemy-list' >
                {enemies.map(character => (
                    <div key={character.character} onClick={selectEnemyClick(character)}>{character.character}</div>
                ))}
            </div>
        <button onClick={addEnemyClick(selectE)}>Add</button>
        </div>

        <button onClick={ContinueClick}>continue</button>
        </>
    )
}

export default PartySelect
