import { enemyIMG } from "../assets/index.mjs"

class BaseEnemy{
    constructor(){
        this.character = 'Base Enemy'
        this.unit_type = 'enemy'
        this.base_spd = 95
        this.toughness = 300
        this.weakness = ['Physical','Lightning','Wind']
        this.ele_res = {
            'Physical': 0,
            'Fire': 0,
            'Ice': 0,
            'Lightning': 0,
            'Wind': 0,
            'Quantum': 0,
            'Imaginary': 0,
        }
        this.ele_vuln = {}
        this.atk = 100
        this.def = 600
        this.hp = 999999
        this.img= enemyIMG
    }
    get_turn_info(){
        const info = {}
        info[this.character] = this.base_spd
        return info
    }
}

const Enemy = new BaseEnemy()
export default Enemy
