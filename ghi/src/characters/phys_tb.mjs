import BaseCharacter from "./base_char.mjs"

class PhysTb extends BaseCharacter {
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

export default PhysTb
