from battle_sys.sp_counter import SpCounter
from battle_sys.turn_counter import TurnCount


class BattleSystem:
    def __init__(self,character_list,enemy_list):
        self.character_list = character_list
        self.enemy_list = enemy_list
        self.all_units = character_list + enemy_list
        self.sp_counter = SpCounter()
        self.sp = self.sp_counter.sp
        self.turn_counter = TurnCount(self.all_units)
        self.history = []

    # action = {
    #     'action':'auto'/'skill'/'ult',
    #     'atk_type':'single'/'blast'/'aoe',
    #     'target':'enemy name'
    # }
    def take_action(self,action):
        current_character_turn = self.turn_counter.current_character()
        select_character = None
        #set character
        for unit in self.all_units:
            if unit.character == current_character_turn:
                select_character = unit


        #set target
        target= None
        for unit in self.all_units:
            if unit.character == action['target']:
                target = unit

        if select_character.unit_type == 'enemy':
            self.update_history(('enemy atk placholder'))
            return 'enemy atk'
        else:
            command = action['action']
            atk_type = action['atk_type']

            skill_multi = 0
            #get base dmg
            if command == 'auto':
                char_action = select_character.auto(atk_type)
                skill_multi = char_action['dmg']
                self.sp_counter.increase()

            elif command == 'skill':
                if self.sp == 0:
                    return {'message':'Not enough SP'}
                char_action = select_character.skill(atk_type)
                skill_multi = char_action['dmg']
                self.sp_counter.decrease()

            elif command == 'ult':
                if select_character.cur_en != select_character.max_en:
                    return {'message':'not enough energy'}
                char_action = select_character.ult(atk_type)
                skill_multi = char_action['dmg']

            #STD DMG
            # DMG = Base DMGAttacker * CRIT MultiplierAttacker * DMG Boost Multiplier * DEF MultiplierTarget * RES MultiplierTarget * Vulnerability MultiplierTarget * Toughness MultiplierTarget


            outgoing_dmg = {}
            for dmg in skill_multi:
                extra_multi = 0 #extra effects like dan dmg bonus on slow
                extra_dmg = 0 #flat base dmg (most ppl do not have)
                base_dmg = float((dmg + extra_multi) * select_character.atk + extra_dmg)

                #crit dmg normalized
                crit_rate = select_character.crit_rate
                if crit_rate > 1:
                    crit_rate = 1
                crit_dmg = float(1 + ((select_character.crit_dmg) * crit_rate))

                #all dmg boost includes effects from lcs/buffs
                all_dmg_boost = 0
                dot_boost = 0
                dmg_boost_multi = float(1 + select_character.ele_dmg + all_dmg_boost + dot_boost)

                #def multiplier
                #assume lvl 80 units
                lvl_atk = 80
                lvl_en = 80
                defe_reduc_per = 0
                def_multi =float((lvl_atk + 20)/(lvl_en  * (1-defe_reduc_per) + lvl_atk + 20))

                #res multi
                element = select_character.element
                res_pen = 0 #things like wind pen from dan
                enemy_res = target.ele_res[element] #elementaly wekaness, 0 if weak to ele, .2 if not weak, .4 if main ele

                res_multi = float(1- (enemy_res - res_pen))

                #vuln_multi
                ele_vuln = 0 #extra % dmg taken/received
                all_vuln = 0
                vuln_multi = float(1 + ele_vuln + all_vuln)

                #tough_multi
                tough_multi = .9 #.9 if eneny isnt broken , 1 if enemy broken
                dmg_calc = base_dmg * crit_dmg * dmg_boost_multi * def_multi * res_multi * vuln_multi * tough_multi
                outgoing_dmg[target.character] = dmg_calc

        #BREAK + DOT DMG
            #DMG = Base Break DMGAttacker * DMG MultiplierElement * (1 + Break Effect) * DEF MultiplierTarget * RES MultiplierTarget * Vulnerability MultiplierTarget * Toughness MultiplierTarget * Max Toughness MultiplierTarget
            self.update_history((select_character.character,command,outgoing_dmg))
            return outgoing_dmg

    def update_history(self,info):
        cycle = self.turn_counter.cycle
        if len(self.history) == 0:
            self.history.append([])
        elif len(self.history) < cycle:
            self.history.append([])

        self.history[self.turn_counter.cycle - 1].append(info)

#https://docs.google.com/spreadsheets/d/1fAdxm8nMqHv14Z_hYFNY-0FVFiD-y9ZemwA46_Jxmx8/edit#gid=0 REFERENCE DMG FOMRULA
