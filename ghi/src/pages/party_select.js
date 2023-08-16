import enemies from "../characters/enemy_index.mjs";
import characters from "../characters/party_index.mjs";
import { useState, useContext } from "react";
import UnitContext from "../utils/UnitsContext";
import { useNavigate } from "react-router-dom";

const PartySelect = () =>{
    const nav = useNavigate()

    const {party, setParty} = useContext(UnitContext)
    const {enemy, setEnemy} = useContext(UnitContext)

    const showCharacters = () => {
        console.log('clicked')
    }
    const addPartyClick = (character) => () => {
        if(party.length === 4){
            console.log('maximum party size')
            return
        }
        setParty([...party,character])
        console.log('added character')
    }
    const showEnemies = () => {
        console.log('clicked')
    }
    const addEnemyClick = (character) => () => {
        if(enemy.length === 5){
            console.log('maximum enemy')
            return
        }
        setEnemy([...enemy,character])
        console.log('added enemy')
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
            <div onClick={showCharacters}>Add Member</div>
            <div id='character-list' >
                {characters.map(character => (
                    <div key={character.character} onClick={addPartyClick(character)}>{character.character}</div>
                ))}
            </div>
        </div>
        <div>
            Enemy list
            <div>Current Enemies
                {enemy.map((character, index) => (
                    <div key={index}>{character.character}</div>
                ))}
            </div>
            <div onClick={showEnemies}>Add Enemy</div>
            <div id='enemy-list' >
                {enemies.map(character => (
                    <div key={character.character} onClick={addEnemyClick(character)}>{character.character}</div>
                ))}
            </div>
        </div>

        <button onClick={ContinueClick}>continue</button>
        </>
    )
}

export default PartySelect
