steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE character_stats (
            id SERIAL PRIMARY KEY NOT NULL,
            character VARCHAR(100) NOT NULL,
            element VARCHAR(20) NOT NULL,
            base_hp INTEGER NOT NULL DEFAULT 1000,
            base_atk INTEGER NOT NULL DEFAULT 1000,
            base_def INTEGER NOT NULL DEFAULT 500,
            base_spd INTEGER NOT NULL DEFAULT 100,
            hp_per DECIMAL NOT NULL DEFAULT 0,
            atk_per DECIMAL NOT NULL DEFAULT 0,
            defe_per DECIMAL NOT NULL DEFAULT 0,
            crit_rate DECIMAL NOT NULL DEFAULT 0,
            crit_dmg DECIMAL NOT NULL DEFAULT 0,
            break_effect DECIMAL NOT NULL DEFAULT 0,
            outgoing_heal DECIMAL NOT NULL DEFAULT 0,
            max_energy INTEGER NOT NULL DEFAULT 100,
            energey_regen DECIMAL NOT NULL DEFAULT 0,
            effect_hit_rate DECIMAL NOT NULL DEFAULT 0,
            effect_hit_res DECIMAL NOT NULL DEFAULT 0,
            element_dmg_boost DECIMAL NOT NULL DEFAULT 0,
            element_dmg_res DECIMAL NOT NULL DEFAULT 0,
            auto_lvl INTEGER NOT NULL DEFAULT 5,
            skill_lvl INTEGER NOT NULL DEFAULT 10,
            ult_lvl INTEGER NOT NULL DEFAULT 10
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE character_stats;
        """
    ]
]
