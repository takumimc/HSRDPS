class TurnCount:
    def __init__(self,character_list):
        # character_list is a list of dictionary where dictionary = {'character_name': speed}
        # EX:
        #character_list = [{'phys_tb': 100},{'dan_heng'}:108]

        self.turn_list = []
        self.character_list = character_list
        self.base_AV_dict = {}
        AV_dict = {}

        for char in character_list:
            for k,v in char.items():
                AV_dict[k] = 10000/v

        #cleaning up base AV dict values
        self.base_AV_dict = AV_dict.copy()
        for k,v in self.base_AV_dict.items():
            if v.is_integer() == False:
                new_v = int(v + 1)
                self.base_AV_dict[k] = new_v

        #calculating turn order
        lowest_AV = 10000000
        lowest_char = None
        while AV_dict != {}:
            for k,v in  AV_dict.items():
                if v < lowest_AV:
                    lowest_AV = v
                    lowest_char = k

            if lowest_AV.is_integer() == False:
                lowest_AV = int(lowest_AV + 1)

            self.turn_list.append({lowest_char:int(lowest_AV)})
            AV_dict.pop(lowest_char)
            lowest_char = None
            lowest_AV = 10000000

    def set_turn_order(self):
        AV_dict = {}
        for char in self.turn_list:
            for k,v in char.items():
                AV_dict[k] = v

        self.turn_list = []
        lowest_AV = 10000000
        lowest_char = None
        while AV_dict != {}:
            for k,v in  AV_dict.items():
                if v < lowest_AV:
                    lowest_AV = float(v)
                    lowest_char = k

            if lowest_AV.is_integer() == False:
                lowest_AV = int(lowest_AV + 1)

            self.turn_list.append({lowest_char:int(lowest_AV)})

            AV_dict.pop(lowest_char)
            lowest_char = None
            lowest_AV = 10000000

    def current_character(self):
        return self.turn_list[0]

    def next_turn(self):
        first = self.turn_list[0]
        AV_consumption = 0
        current_character = None
        for k,v in first.items():
            AV_consumption = v
            current_character = k

        self.turn_list.pop(0)
        for char in self.turn_list:
            for k,v in char.items():
                char[k] = v - AV_consumption

        base_AV = self.base_AV_dict[current_character]
        self.turn_list.append({current_character:base_AV})
        self.set_turn_order()
        return self.turn_list


# cr_list = [
#         {'char1': 270},
#         {'char2': 100},
#         {'char3': 120},
#         {'char4': 140}
#        ]

# test = TurnCount(cr_list)
# print('Current turn order: ',test.turn_list)
# print('Current character: ',test.current_character())
# print('turn taken: ',test.next_turn())
# print('turn taken: ',test.next_turn())
# print('turn taken: ',test.next_turn())
# print('turn taken: ',test.next_turn())
# print('turn taken: ',test.next_turn())
# print('turn taken: ',test.next_turn())
# print('current character taking action:',test.current_character())


# https://hsr.keqingmains.com/speed-guide/#compendium
