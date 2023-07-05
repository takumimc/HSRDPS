from queries.character_queries import CharacterQueries

class BaseCharacter(CharacterQueries):
    def __init__(self, character):
        data = self.import_character(character)
        # print('class data',data)
        self.character = data['character']
        self.element = data['element']
        self.hp = data['base_hp']
        self.atk = data['base_atk']
        self.defe = data['base_def']
        self.spd = data['base_spd']
        self.hp_per = data['hp_per']
        self.atk_per = data['atk_per']
        self.defe_per = data['defe_per']
        self.crit_rate = data['crit_rate']
        self.crit_dmg = data['crit_dmg']
        self.break_effect = data['break_effect']
        self.out_heal = data['outgoing_heal']
        self.max_en = data['max_energy']
        self.en_reg = data['energy_regen']
        self.cur_en = 0
        self.eff_hit = data['effect_hitrate']
        self.eff_res = data['effect_hitres']
        self.ele_dmg = data['element_dmg_boost']
        self.ele_res = data['element_dmg_res']
        self.auto_lvl = data['auto_lvl']
        self.skill_lvl = data['skill_lvl']
        self.ult_lvl = data['ult_lvl']

    def get_character(self):
        character = {
            'character': self.character,
            'element': self.element,
        }
        return character

    def get_stats(self):
        stats = {
                'hp':self.hp,
                'atk':self.atk,
                'def':self.defe,
                'spd':self.spd,
                'max energy': self.max_en,
                'current energy': self.cur_en,
            }
        return stats

    def get_percents(self):
        percents = {
            'hp percent': self.hp_per,
            'atk percent': self.atk_per,
            'def percent': self.defe_per,
            'crit rate': self.crit_rate,
            'crit dmg': self.crit_dmg,
            'break effect': self.break_effect,
            'outgoing heal': self.out_heal,
            'energy regen': self.en_reg,
            'effect hit rate': self.eff_hit,
            'effect hit res': self.eff_res,
            'element dmg bonus': self.ele_dmg,
            'element dmg res': self.ele_res,
        }
        return percents

    def skill_levels(self):
        levels = {
            'auto' : self.auto_lvl,
            'skill' : self.skill_lvl,
            'ult' : self.ult_lvl,
        }

        return levels
