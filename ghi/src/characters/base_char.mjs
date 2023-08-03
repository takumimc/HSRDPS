class BaseCharacter {
    constructor(data){
        this.character = data['character']
        this.unit_type = 'player'
        this.element = data['element']
        this.base_hp = data['base_hp']
        this.base_atk = data['base_atk']
        this.base_def = data['base_def']
        this.base_spd = data['base_spd']
        this.hp_per = data['hp_per']
        this.atk_per = data['atk_per']
        this.defe_per = data['defe_per']
        this.crit_rate = data['crit_rate']
        this.crit_dmg = data['crit_dmg']
        this.break_effect = data['break_effect']
        this.out_heal = data['outgoing_heal']
        this.max_en = data['max_energy']
        this.en_reg = data['energy_regen']
        this.cur_en = 0
        this.eff_hit = data['effect_hitrate']
        this.eff_res = data['effect_hitres']
        this.ele_dmg = data['element_dmg_boost']
        this.ele_res = data['element_dmg_res']
        this.auto_lvl = data['auto_lvl']
        this.skill_lvl = data['skill_lvl']
        this.ult_lvl = data['ult_lvl']

        this.hp = this.base_hp * (1 + this.hp_per)
        this.atk = this.base_atk * (1 + this.atk_per)
        this.def = this.base_def * (1 + this.def_per)
    }
    increase_en(en_value){
        this.cur_en += (en_value * ( 1 + this.en_reg))
        if (this.cur_en > this.max_en){
            this.cur_en = this.max_en
        }
    }
    get_turn_info(){
        const info = {}
        info[this.character] = this.base_spd
        return info
    }
}



export default BaseCharacter
