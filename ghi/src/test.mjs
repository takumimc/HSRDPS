import PhysTb from "./characters/phys_tb.mjs";
import TurnCount from "./battle_sys/turn_counter.mjs";
import BattleSystem from "./battle_sys/battle.mjs";
import BaseEnemy from "./characters/base_enemy.mjs";


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

let Phys = new PhysTb(character_data)
                    const character_data2 = {
                        'character': 'Trailblazer',
                        'element': 'physical',
                        'base_hp': 1000,
                        'base_atk': 500,
                        'base_def': 500,
                        'base_spd': 100,
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

let Phys2 = new PhysTb(character_data2)
                    const character_data3 = {
                        'character': 'enemy',
                        'element': 'physical',
                        'base_hp': 1000,
                        'base_atk': 500,
                        'base_def': 500,
                        'base_spd': 80,
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

let En = new BaseEnemy()
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
let battle = new BattleSystem([Phys, Phys2],[En])
const a = {}
const action = {     'action':'auto',
       'atk_type':'single',
    'target':'enemy'
}
console.log(battle.take_action(action))
// console.log(battle.turn_counter.next_turn())
// console.log(battle.take_action(a))
