from fastapi import APIRouter, Depends, Response, Request, status, HTTPException
from queries.character_queries import CharacterQueries, CharacterIn
from characters.base_char import BaseCharacter
from characters.phys_tb import PhysTb
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
    print(char_obj.get_character(),
    char_obj.get_stats(),
    char_obj.get_percents(),
    char_obj.skill_levels())
    print(char_obj.auto())
    if data is None:
        response.status_code = 404
    else:
        return data
