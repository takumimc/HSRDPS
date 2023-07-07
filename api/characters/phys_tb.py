from characters.base_char import BaseCharacter
class PhysTb(BaseCharacter):
    def auto(self,atk_type):
        lvl = self.auto_lvl
        self.increase_en(20)
        if lvl > 9:
            lvl = 9
        mod = (.5 + (.1 * (lvl - 1)))
        action = {
            'dmg' : [mod],
            'atk_type': 'single'
        }
        return action

    def skill(self,atk_type):
        self.increase_en(30)
        action = {
            'dmg' : [1.25],
            'atk_type': 'blast'
        }
        return action

    def ult(self,atk_type):
        self.cur_en = 0
        if atk_type == 'single':
            action = {
                'dmg' : [4.5],
                'atk_type' : atk_type
            }
        elif atk_type == 'blast':
            action = {
                'dmg' : [2.7,1.62],  # main target, sub target
                'atk_type' : atk_type
            }

        return action
