import TurnCount from "./turn_counter.mjs";
import SpCounter from "./sp_counter.mjs";


class BattleSystem{
    constructor(character_list,enemy_list){
        this.character_list = character_list
        this.enemy_list = enemy_list
        this.all_units = this.character_list.concat(this.enemy_list)
        this.sp_counter = new SpCounter()
        this.turn_counter = new TurnCount(this.all_units)
        this.history = []
    }
    select(){
       let current_character_turn = this.turn_counter.current_character()

       let select_character = null
       for(let unit of this.all_units){
        if(unit.character === current_character_turn){
            select_character = unit
            return select_character
            }
        }

}
    take_action(action){

    let select_character = this.select()
    let target = null
    for(let unit of this.all_units){
        if(unit.character === action['target']){
            target = unit
        }
    }

    if(select_character.unit_type === 'enemy'){

        let outgoing_dmg = {
        'character': select_character,
        'dmg': []
        }
        let dmg_info = {}
        dmg_info[target.character] = 0
        outgoing_dmg['dmg'].push(dmg_info)

        this.turn_counter.next_turn()
        return outgoing_dmg
    } else {
        const command = action['action']
        const atk_type = action['atk_type']

        let skill_multi = {}
        if(command === 'auto'){
            let char_action = select_character.auto(atk_type)
            skill_multi = char_action['dmg']
            this.sp_counter.increase()
        }
        else if(command ==='skill') {
            if (this.sp_counter.sp === 0){
                return {'message':'Not enough SP'}
            }
            let char_action = select_character.skill(atk_type)
            skill_multi = char_action['dmg']
            this.sp_counter.decrease()
        }
        else if(command === 'ult'){
            if(select_character.cur_en !== select_character.max_en){
                return {'message':'Not enough energy'}
            }
            const char_action = select_character.ult(atk_type)
            skill_multi = char_action['dmg']
        }

    let outgoing_dmg = {
        'character': select_character,
        'dmg': []
    }
    for(let dmg of skill_multi){

        let extra_multi = 0
        let extra_dmg = 0
        const base_dmg = parseFloat((dmg + extra_multi) * select_character.atk + extra_dmg)


        let crit_rate = select_character.crit_rate
        if(crit_rate > 1){
            crit_rate = 1
        }
        const crit_dmg = parseFloat(1+((select_character.crit_dmg)*crit_rate))



        let all_dmg_boost = 0
        let dot_boost = 0
        const dmg_boost_multi = parseFloat(1+select_character.ele_dmg + all_dmg_boost + dot_boost)

        const lvl_atk = 80
        const lvl_en = 80
        const def_reduc_per = 0
        const def_multi = parseFloat((lvl_atk+20)/((lvl_en * (1-def_reduc_per)) + lvl_atk + 20))



        const element = select_character.element
        const res_pen = 0
        const enemy_res = target.ele_res[element]

        const res_multi = parseFloat(1 - (enemy_res - res_pen))

        let ele_vuln = 0
        let all_vuln = 0
        const vuln_multi = parseFloat(1 + ele_vuln + all_vuln)

        let tough_multi = .9
        let dmg_calc = base_dmg * crit_dmg * dmg_boost_multi * def_multi * res_multi * vuln_multi * tough_multi

        console.log(dmg_calc)
        let dmg_info = {}
        dmg_info[target.character] = parseInt(dmg_calc)
        outgoing_dmg['dmg'].push(dmg_info)


    }

    this.turn_counter.next_turn()
    console.log('outgoing',outgoing_dmg)
    return outgoing_dmg
    }
}
}

export default BattleSystem
