from fastapi import APIRouter, Depends, Response, Request, status, HTTPException
from queries.character_queries import CharacterQueries, CharacterIn
from characters.base_char import BaseCharacter
from characters.phys_tb import PhysTb
from  battle_sys.turn_counter import TurnCount
router = APIRouter()


@router.post("/api/character")
async def create_character(character: CharacterIn,
                           query: CharacterQueries = Depends()):
    try:
        print('create started')
        character = query.create(character)
        print('character created')
        return 'Character created'
    except:
        return 'Error creating char'

@router.get("/api/character/{char}")
def get_character_data(char: str,
                       response: Response,
                       queries: CharacterQueries = Depends()):
    data = queries.import_character(char)
    char_obj = PhysTb(char)
    print(char_obj.auto())
    print(char_obj.skill())
    print(char_obj.ult('single'))
    print(char_obj.ult('blast'))
    cr_list = [
        {'char1': 270},
        {'char2': 100},
        {'char3': 120},
        {'char4': 140}
       ]

    test = TurnCount(cr_list)
    print('Current turn order: ',test.turn_list)
    print('Current character: ',test.current_character())
    print('turn taken: ',test.next_turn())
    print('turn taken: ',test.next_turn())
    print('turn taken: ',test.next_turn())
    print('turn taken: ',test.next_turn())
    print('turn taken: ',test.next_turn())
    print('turn taken: ',test.next_turn())
    if data is None:
        response.status_code = 404
    else:
        return data
