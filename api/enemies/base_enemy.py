class BaseEnemy():
    def __init__(self):
        # data = self.import_character(character)
        # print('class data',data)
        self.character = 'enemy'
        self.unit_type = 'enemy'
        self.spd = 100
        self.toughness = 300
        self.weakness = ['physical','fire','ice','lightning','wind','quantum','imaginary']
        self.ele_res = {
            'physical': 0,
            'fire': 0,
            'ice': 0,
            'lightning': 0,
            'wind': 0,
            'quantum': 0,
            'imaginary': 0,
        }
        self.ele_vuln = {}

    def get_turn_info(self):
        return {self.character : self.spd}
