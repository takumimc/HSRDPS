import BaseCharacter from "./base_char.mjs"

class PhysTb extends BaseCharacter {
    constructor(data){
        super(data)
        this.action_list = [
            ['auto','single','Auto'],
            ['skill','blast','Skill'],
            ['ult','single','Single Target Ult'],
            ['ult','blast','AOE Ult'],
        ]
    }
    auto(){
        const lvl = this.auto_lvl
        this.increase_en(20)
        const mod = (0.5 + (0.1 * (lvl - 1)))
        const action = {
            'dmg': [mod],
            'atk_type': 'single'
        }
        return action
    }
    skill(){
        this.increase_en(30)
        const action = {
            'dmg':[1.25],
            'atk_type':'blast'
        }
        return action
    }
    ult(atk_type){
        this.cur_en = 0
        if (atk_type === 'single'){
            const action = {
                'dmg': [4.5],
                'atk_type' : atk_type
            }
            return action
        }
        else if (atk_type === 'blast'){
            const action = {
                'dmg':[2.7,1.62],
                'atk_type' : atk_type

            }
            return action
        }
    }
}

                    const character_data = {
                        'character': 'Physical Trailblazer',
                        'element': 'physical',
                        'base_hp': 1000,
                        'base_atk': 500,
                        'base_def': 500,
                        'base_spd': 120,
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

const PhysicalTrailblazer = new PhysTb(character_data)
export default PhysicalTrailblazer
