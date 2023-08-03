class TurnCount{
    constructor(character_list){
        this.turn_list = []
        this.character_list = character_list
        this.character_speed_list = []
        this.base_AV_dict = {}
        this.cycle = 1
        this.current_cycle_AV = 0

        for (let char of character_list){
            this.character_speed_list.push(char.get_turn_info())
        }

        let AV_dict = {}

        for (let char of this.character_speed_list){
            for (let name in char){
                const spd = char[name]
                let av = 10000/spd
                if(Number.isInteger(av) === false){
                    av = parseInt(av) + 1
                }
                AV_dict[name] = av
            }
        }
        this.base_AV_dict = JSON.parse(JSON.stringify(AV_dict))

        while(Object.keys(AV_dict).length !== 0){
            let lowest_AV = 100000000
            let lowest_char = null
            for(let char in AV_dict){
                const spd = AV_dict[char]
                if(spd < lowest_AV){
                    lowest_AV = spd
                    lowest_char = char
                }
            }
            const char = {}
            char[lowest_char] = lowest_AV
            this.turn_list.push(char)
            delete AV_dict[lowest_char]
        }
    }
    set_turn_order(){
        let AV_dict = {}
        for(let item of this.turn_list){
            for(let char in item){
                AV_dict[char] = item[char]
            }
        }
        this.turn_list = []

        while(Object.keys(AV_dict).length !== 0){

            let lowest_AV = 10000000
            let lowest_char = null

            for(let char in AV_dict){
                const spd = AV_dict[char]
                if(spd < lowest_AV){
                    lowest_AV = spd
                    lowest_char = char
                }
            }
            const char = {}
            char[lowest_char] = lowest_AV
            this.turn_list.push(char)
            delete AV_dict[lowest_char]
        }
    }
    update_cycle(AV){
        if(this.cycle === 1){
            this.current_cycle_AV += AV
            if(this.current_cycle_AV >= 150){
                this.cycle += 1
                this.current_cycle_AV -= 150
                }
            } else if (this.cycle > 1){
                this.current_cycle_AV += AV
                while(this.current_cycle_AV >= 100){
                    this.cycle += 1
                    this.current_cycle_AV -= 100
                }
            }
        }
    current_character(){
        return Object.keys(this.turn_list[0])[0]
    }
    next_turn(){
        const first = Object.keys(this.turn_list[0])[0]
        const AV_consumption = Object.values(this.turn_list[0])[0]
        this.update_cycle(AV_consumption)
        this.turn_list.splice(0,1)

        for(let item of this.turn_list){
            for(let char in item){
                const AV = item[char]
                item[char] = AV - AV_consumption
            }
        }

        const base_AV = this.base_AV_dict[first]
        const char = {}
        char[first] = base_AV
        this.turn_list.push(char)
        this.set_turn_order()
    }
}


export default TurnCount
