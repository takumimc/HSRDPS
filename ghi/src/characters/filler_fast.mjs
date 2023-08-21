import BaseCharacter from "./base_char.mjs"

class DanHeng extends BaseCharacter {
    constructor(data){
        super(data)
        this.action_list = [
            ['auto','single','Auto'],
            ['skill','blast','Skill'],
            ['ult','single','Single Target Ult'],
        ]
    }
    auto(){

        this.increase_en(20)
        const mod = .8
        const action = {
            'dmg': [mod],
            'atk_type': 'single'
        }
        return action
    }
    skill(){
        this.increase_en(30)
        const action = {
            'dmg':[1.42],
            'atk_type':'blast'
        }
        return action
    }
    ult(atk_type){
        this.cur_en = 0
            const action = {
                'dmg': [2.54],
                'atk_type' : atk_type
            }
            return action
        }
    }


                    const character_data = {
                        'character': 'Filler Fast',
                        'element': 'wind',
                        'base_hp': 882,
                        'base_atk': 546,
                        'base_def': 396,
                        'base_spd': 140,
                        'hp_per': 0,
                        'atk_per': 0,
                        'defe_per': 0,
                        'crit_rate': 0,
                        'crit_dmg': 0,
                        'break_effect': 0,
                        'outgoing_heal': 0,
                        'max_energy': 100,
                        'energy_regen': 0,
                        'effect_hitrate': 0,
                        'effect_hitres': 0,
                        'element_dmg_boost': 0,
                        'element_dmg_res': 0,
                        'auto_lvl': 1,
                        'skill_lvl': 1,
                        'ult_lvl': 1,
                    }

const Temp_fast = new DanHeng(character_data)
export default Temp_fast
