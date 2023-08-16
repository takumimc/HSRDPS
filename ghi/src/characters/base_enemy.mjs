class BaseEnemy{
    constructor(){
        this.character = 'enemy'
        this.unit_type = 'enemy'
        this.base_spd = 100
        this.toughness = 300
        this.weakness = ['physical','fire','ice','lightning','wind','quantum','imaginary']
        this.ele_res = {
            'physical': 0,
            'fire': 0,
            'ice': 0,
            'lightning': 0,
            'wind': 0,
            'quantum': 0,
            'imaginary': 0,
        }
        this.ele_vuln = {}
    }
    get_turn_info(){
        const info = {}
        info[this.character] = this.base_spd
        return info
    }
}

const Enemy = new BaseEnemy()
export default Enemy
