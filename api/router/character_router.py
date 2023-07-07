from fastapi import APIRouter, Depends, Response, Request, status, HTTPException
from queries.character_queries import CharacterQueries, CharacterIn
from characters.base_char import BaseCharacter
from characters.phys_tb import PhysTb
from enemies.base_enemy import BaseEnemy
from  battle_sys.turn_counter import TurnCount
from battle_sys.battle import BattleSystem
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
    # print(data)
    char_obj = PhysTb('physical_tb')
    char_obj2 =PhysTb('physical')
    en_obj1 = BaseEnemy()
    # print(char_obj.auto())
    # print(char_obj.skill())
    # print(char_obj.ult('single'))
    # print(char_obj.ult('blast'))
    cr_list = [char_obj,char_obj2]
    en_list = [en_obj1]
    action1 = {
        'action':'auto',
        'atk_type':'single',
        'target':'enemy'
    }
    action2 = {
        'action':'skill',
        'atk_type':'blast',
        'target':'enemy'
    }
    # testturn = TurnCount(cr_list)
    # print('current turn: ',testturn.current_character())
    testbattle = BattleSystem(cr_list, en_list)
    print(testbattle.take_action(action1))
    testbattle.turn_counter.next_turn()
    print(testbattle.take_action(action2))
    print(testbattle.history)
    if data is None:
        response.status_code = 404
    else:
        return data
