class BaseHead{
    constructor(data){
        this.type='hat'
        this.hp = data['hp']
        this.base_atk =data['base_atk']
        this.atk_per = data['atk_per']
        this.def = data['def']
        this.hp_per = data['hp_per']
        this.def_per =data['def_pre']
        this.crit_rate =data['crit_rate']
        this.crit_dmg =  data['crit_dmg']
        this.eff_hit =  data['eff_hit']
        this.eff_res = data['eff_res']
        this.break_eff = data['break']
        this.spd = data['spd']

    }
}

export default BaseHead
