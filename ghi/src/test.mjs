
import TurnCount from "./battle_sys/turn_counter.mjs";
import BattleSystem from "./battle_sys/battle.mjs";
import BaseEnemy from "./characters/base_enemy.mjs";
import PhysicalTrailblazer from "./characters/phys_tb.mjs";


// let turns = new TurnCount([Phys, Phys2])
// console.log(Phys.ult('single'))
// console.log(turns.character_speed_list)
// console.log('AV',turns.base_AV_dict)
// turns.set_turn_order()
// console.log('turns',turns.turn_list)
// console.log(turns.current_character())

// turns.next_turn()
// console.log('1',turns.turn_list)
// turns.next_turn()
// console.log('2',turns.turn_list)
// turns.next_turn()
// console.log('3',turns.turn_list)
// turns.next_turn()
// console.log('4',turns.turn_list)
let battle = new BattleSystem([PhysicalTrailblazer],[BaseEnemy])
const a = {}
const action = {
    'action':'auto',
    'atk_type':'single',
    'target':'enemy'
}
console.log(battle.take_action(action))
// console.log(battle.turn_counter.next_turn())
// console.log(battle.take_action(a))
