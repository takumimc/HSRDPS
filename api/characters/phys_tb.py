from characters.base_char import BaseCharacter
class PhysTb(BaseCharacter):
    def auto(self):
        action = {
            'dmg' : self.atk * .6,
            'target': 1
        }
        return action

    def skill(self):
        action = {
            'dmg' : 0,
            'target': 3
        }
        return action

    def ult(self,target):
        action = {
            'dmg' : 0
        }
        if target == 1:
            action['target'] = 1
        elif target == 3:
            action['target'] = 3

        return action
