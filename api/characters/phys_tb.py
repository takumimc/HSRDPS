from characters.base_char import BaseCharacter
class PhysTb(BaseCharacter):
    def auto(self):
        lvl = self.auto_lvl
        if lvl > 9:
            lvl = 9
        mod = (.5 + (.1 * (lvl - 1)))
        action = {
            'dmg' : [self.atk * mod],
            'target': 'single'
        }
        return action

    def skill(self):
        action = {
            'dmg' : [self.atk * 1.25],
            'target': 'blast'
        }
        return action

    def ult(self,target):

        if target == 'single':
            action = {
                'dmg' : [self.atk * 4.5],
                'target' : target
            }
        elif target == 'blast':
            action = {
                'dmg' : [self.atk * 2.7, self.atk *1.62],
                'target' : target
            }

        return action
