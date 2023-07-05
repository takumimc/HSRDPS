from queries.pool import pool
from pydantic import BaseModel

class CharacterIn(BaseModel):
    character: str
    element: str
    base_hp: int
    base_atk: int
    base_defe: int
    base_spd: int

class CharacterOut(BaseModel):
    pass

class CharacterQueries:
    def create(self, character: CharacterIn):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO character_stats
                            (
                            character,
                            element,
                            base_hp,
                            base_atk,
                            base_def,
                            base_spd)
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING
                        id;
                        """,
                        [character.character,
                         character.element,
                         character.base_hp,
                         character.base_atk,
                         character.base_defe,
                         character.base_spd
                         ]
                    )
                    print('char created')
                    new_char = result.fetchone()
                    print('id:', new_char)
        except Exception as e:
            return {'error': e}

    def import_character(self, character_name: str):
        try:
            with pool.connection() as conn:
                with conn.cursor() as curr:
                    print('searching')
                    curr.execute(
                        """
                        SELECT *
                        FROM character_stats
                        WHERE character = %s
                        """,
                        [character_name]
                    )
                    print('done')
                    data = curr.fetchone()
                    # print('char data',data)
                    character_data = {
                        'character': data[1],
                        'element': data[2],
                        'base_hp': data[3],
                        'base_atk': data[4],
                        'base_def': data[5],
                        'base_spd': data[6],
                        'hp_per': data[7],
                        'atk_per': data[8],
                        'defe_per': data[9],
                        'crit_rate': data[10],
                        'crit_dmg': data[11],
                        'break_effect': data[12],
                        'outgoing_heal': data[13],
                        'max_energy': data[14],
                        'energy_regen': data[15],
                        'effect_hitrate': data[16],
                        'effect_hitres': data[17],
                        'element_dmg_boost': data[18],
                        'element_dmg_res': data[19],
                        'auto_lvl': data[20],
                        'skill_lvl': data[21],
                        'ult_lvl': data[22],

                    }
                    return character_data
        except Exception as e:
            return {'error': e}
