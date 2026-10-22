// Official rune identities and effects from the reviewed patch; used as a dated offline fallback.
const bundledRuneCatalogue = {
  "version": "16.21.1",
  "trees": [
    {
      "id": 8100,
      "name": "Domination",
      "icon": "perk-images/Styles/7200_Domination.png",
      "slots": [
        [
          {
            "id": 8112,
            "key": "Electrocute",
            "name": "Electrocute",
            "icon": "perk-images/Styles/Domination/Electrocute/Electrocute.png",
            "effect": "Hitting a champion with 3 separate attacks or abilities within 3s deals bonus adaptive damage . Damage: 70 - 240 (+0.1 bonus AD, +0.05 AP) damage. Cooldown: 20s 'We called them the Thunderlords, for to speak of their lightning was to invite disaster.'"
          },
          {
            "id": 8128,
            "key": "DarkHarvest",
            "name": "Dark Harvest",
            "icon": "perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png",
            "effect": "Damaging a Champion below 50% health deals adaptive damage and harvests their soul, permanently increasing Dark Harvest's damage by 11. Dark Harvest damage: 30 (+11 damage per soul) (+0.1 bonus AD) (+0.05 AP) Cooldown: 35s (resets to 1.0s on takedown)"
          },
          {
            "id": 9923,
            "key": "HailOfBlades",
            "name": "Hail of Blades",
            "icon": "perk-images/Styles/Domination/HailOfBlades/HailOfBlades.png",
            "effect": "Gain 90% (60% for ranged champions) Attack Speed and bonus true damage when you attack an enemy champion for up to 3 attacks. No more than 3s can elapse between attacks or this effect will end. Cooldown: 10s. On-Hit Damage: 2 - 20 (+0.12 bonus AD, +0.1 AP) damage. Attack resets increase the attack limit by 1. Allows you to temporarily exceed the Attack Speed limit."
          }
        ],
        [
          {
            "id": 8126,
            "key": "CheapShot",
            "name": "Cheap Shot",
            "icon": "perk-images/Styles/Domination/CheapShot/CheapShot.png",
            "effect": "Damaging champions with impaired movement or actions deals 10 - 45 bonus true damage (based on level). Cooldown: 4s Activates on damage occurring after the impairment."
          },
          {
            "id": 8139,
            "key": "TasteOfBlood",
            "name": "Taste of Blood",
            "icon": "perk-images/Styles/Domination/TasteOfBlood/GreenTerror_TasteOfBlood.png",
            "effect": "Heal when you damage an enemy champion. Healing: 16-40 (+0.1 bonus AD, +0.05 AP) health (based on level) Cooldown: 20s"
          },
          {
            "id": 8143,
            "key": "SuddenImpact",
            "name": "Sudden Impact",
            "icon": "perk-images/Styles/Domination/SuddenImpact/SuddenImpact.png",
            "effect": "Damaging basic attacks and abilities deal a bonus 20 - 80 True Damage based on level to enemy champions after using a dash, leap, blink, teleport, or when leaving stealth for 4s. Cooldown: 10s"
          }
        ],
        [
          {
            "id": 8137,
            "key": "SixthSense",
            "name": "Sixth Sense",
            "icon": "perk-images/Styles/Domination/SixthSense/SixthSense.png",
            "effect": "Automatically sense a nearby untracked and unseen ward, tracking it for the team. Level 11: Also reveal the ward for 10s. This effect has a 250 second Cooldown."
          },
          {
            "id": 8140,
            "key": "GrislyMementos",
            "name": "Grisly Mementos",
            "icon": "perk-images/Styles/Domination/GrislyMementos/GrislyMementos.png",
            "effect": "Collect 1 memento on champion takedowns , up to 18 total. Gain 6 Trinket Haste for each collected. In game modes where vision Trinkets do not exist, instead gain 3 Summoner Spell Haste."
          },
          {
            "id": 8141,
            "key": "DeepWard",
            "name": "Deep Ward",
            "icon": "perk-images/Styles/Domination/DeepWard/DeepWard.png",
            "effect": "Your wards in the enemy jungle are Deep . Deep wards gain +1 extra Health and +[30 - 45]s increased duration (+[45 - 150]s for Trinket stealth wards). Level 9: Wards in the river are also Deep ."
          }
        ],
        [
          {
            "id": 8135,
            "key": "TreasureHunter",
            "name": "Treasure Hunter",
            "icon": "perk-images/Styles/Domination/TreasureHunter/TreasureHunter.png",
            "effect": "Gain an additional 50 gold the next time you collect a Bounty Hunter stack. Increase the gold gained by 20 gold for each Bounty Hunter stack, up to 130 gold . Bounty Hunter stacks are earned the first time you get a takedown on each enemy champion."
          },
          {
            "id": 8105,
            "key": "RelentlessHunter",
            "name": "Relentless Hunter",
            "icon": "perk-images/Styles/Domination/RelentlessHunter/RelentlessHunter.png",
            "effect": "Gain 8 Move Speed out of combat per Bounty Hunter stack. Bounty Hunter stacks are earned the first time you get a takedown on each enemy champion."
          },
          {
            "id": 8106,
            "key": "UltimateHunter",
            "name": "Ultimate Hunter",
            "icon": "perk-images/Styles/Domination/UltimateHunter/UltimateHunter.png",
            "effect": "Your ultimate gains 6 Ability Haste, plus an additional 5 Ability Haste per Bounty Hunter stack. Bounty Hunter stacks are earned the first time you get a takedown on each enemy champion."
          }
        ]
      ]
    },
    {
      "id": 8300,
      "name": "Inspiration",
      "icon": "perk-images/Styles/7203_Whimsy.png",
      "slots": [
        [
          {
            "id": 8351,
            "key": "GlacialAugment",
            "name": "Glacial Augment",
            "icon": "perk-images/Styles/Inspiration/GlacialAugment/GlacialAugment.png",
            "effect": "Immobilizing an enemy champion will cause 3 glacial rays to emanate from them towards you and other nearby champions, creating frozen zones for 3 (+ the immobilizing effect's duration) seconds that slow enemies for 20% (+90% per 100% Heal and Shield Power) (+6% per 100 Ability Power) (+7% per 100 bonus Attack Damage) and reduce their damage by 15% against your allies (not including yourself). Cooldown: 25s"
          },
          {
            "id": 8360,
            "key": "UnsealedSpellbook",
            "name": "Unsealed Spellbook",
            "icon": "perk-images/Styles/Inspiration/UnsealedSpellbook/UnsealedSpellbook.png",
            "effect": "Swap one of your equipped Summoner Spells to a new, single use Summoner Spell. Each unique Summoner Spell you swap to permanently decreases your swap cooldown by 25s (initial swap cooldown is @f3@ seconds). Your first swap becomes available at 6 mins. Summoner Spells can only be swapped while out of combat. After using a swapped Summoner Spell you must swap 3 more times before the first can be selected again. Smite damage increases after two Summoner Spell swaps."
          },
          {
            "id": 8369,
            "key": "FirstStrike",
            "name": "First Strike",
            "icon": "perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png",
            "effect": "Attacks or abilities against an enemy champion within 0.25s of entering champion combat grant 10 gold and First Strike for 3 seconds, causing you to deal 7% extra damage against champions, and granting 50% (35% for ranged champions) of bonus damage dealt as gold . Cooldown: 25 - 15 s"
          }
        ],
        [
          {
            "id": 8306,
            "key": "HextechFlashtraption",
            "name": "Hextech Flashtraption",
            "icon": "perk-images/Styles/Inspiration/HextechFlashtraption/HextechFlashtraption.png",
            "effect": "While Flash is on cooldown it is replaced by Hexflash . Hexflash : Channel for 2s to blink to a new location. Cooldown: 20s. Goes on a 10s cooldown when you enter champion combat."
          },
          {
            "id": 8304,
            "key": "MagicalFootwear",
            "name": "Magical Footwear",
            "icon": "perk-images/Styles/Inspiration/MagicalFootwear/MagicalFootwear.png",
            "effect": "You get free Slightly Magical Footwear at 12 min, but you cannot buy boots before then. For each takedown you acquire the boots 45s sooner. Slightly Magical Footwear grants you an additional 10 Move Speed ."
          },
          {
            "id": 8321,
            "key": "CashBack",
            "name": "Cash Back",
            "icon": "perk-images/Styles/Inspiration/CashBack/CashBack2.png",
            "effect": "Get 7.5% Gold back when you purchase Legendary Items."
          }
        ],
        [
          {
            "id": 8313,
            "key": "PerfectTiming",
            "name": "Triple Tonic",
            "icon": "perk-images/Styles/Inspiration/PerfectTiming/AlchemistCabinet.png",
            "effect": "Upon reaching level 3, gain an Elixir of Avarice. Upon reaching level 6, gain an Elixir of Force. Upon reaching level 9, gain an Elixir of Skill."
          },
          {
            "id": 8352,
            "key": "TimeWarpTonic",
            "name": "Time Warp Tonic",
            "icon": "perk-images/Styles/Inspiration/TimeWarpTonic/TimeWarpTonic.png",
            "effect": "Consuming a potion grants 40% of its health restoration immediately."
          },
          {
            "id": 8345,
            "key": "BiscuitDelivery",
            "name": "Biscuit Delivery",
            "icon": "perk-images/Styles/Inspiration/BiscuitDelivery/BiscuitDelivery.png",
            "effect": "Biscuit Delivery: Gain a Total Biscuit of Everlasting Will every 2 mins, until 6 min. Biscuits restore 20 + 2% of your maximum health, increased by up to 100% based on missing Health. Consuming or selling a Biscuit permanently increases your max health by 30."
          }
        ],
        [
          {
            "id": 8347,
            "key": "CosmicInsight",
            "name": "Cosmic Insight",
            "icon": "perk-images/Styles/Inspiration/CosmicInsight/CosmicInsight.png",
            "effect": "+ 18 Summoner Spell Haste + 10 Item Haste"
          },
          {
            "id": 8410,
            "key": "ApproachVelocity",
            "name": "Approach Velocity",
            "icon": "perk-images/Styles/Resolve/ApproachVelocity/ApproachVelocity.png",
            "effect": "Gain 7.5% Move Speed towards nearby enemy champions that are movement impaired. This bonus is increased to 15% Move Speed for any enemy champion that you impair. Activation Range for CC from allies: 1000"
          },
          {
            "id": 8316,
            "key": "JackOfAllTrades",
            "name": "Jack Of All Trades",
            "icon": "perk-images/Styles/Inspiration/JackOfAllTrades/JackofAllTrades2.png",
            "effect": "For each different stat gained from items, gain one Jack stack. Each stack grants you 1 Ability Haste . Gain 8 or 20 bonus Adaptive Force at 5 and 10 stacks, respectively."
          }
        ]
      ]
    },
    {
      "id": 8000,
      "name": "Precision",
      "icon": "perk-images/Styles/7201_Precision.png",
      "slots": [
        [
          {
            "id": 8005,
            "key": "PressTheAttack",
            "name": "Press the Attack",
            "icon": "perk-images/Styles/Precision/PressTheAttack/PressTheAttack.png",
            "effect": "Hitting an enemy champion with 3 consecutive basic attacks deals 40 - 160 bonus adaptive damage (based on level) and amplifies your damage dealt by 8% until you leave combat with champions."
          },
          {
            "id": 8008,
            "key": "LethalTempo",
            "name": "Lethal Tempo",
            "icon": "perk-images/Styles/Precision/LethalTempo/LethalTempoTemp.png",
            "effect": "Attacking an enemy champion grants you [6% Melee || 4% Ranged] Attack Speed for 6 seconds, up to 6. At max stacks, deal [9 - 30 Melee || 6 - 24 Ranged] bonus adaptive damage On-Attack, increased by 1% per 1% Bonus Attack Speed ."
          },
          {
            "id": 8021,
            "key": "FleetFootwork",
            "name": "Fleet Footwork",
            "icon": "perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png",
            "effect": "Attacking and moving builds Energy stacks. At 100 stacks, your next attack is Energized Energized attacks heal you for 15 - 160 (+0.1 Bonus AD, +0.05 AP) and grant 20% Move Speed for 1s. For Ranged Champions, Healing is 60% effective and Move Speed is 75% effective. All healing is 15% effective against Minions."
          },
          {
            "id": 8010,
            "key": "Conqueror",
            "name": "Conqueror",
            "icon": "perk-images/Styles/Precision/Conqueror/Conqueror.png",
            "effect": "Basic attacks or spells that deal damage to an enemy champion grant 2 stacks of Conqueror for 5s, gaining 1.8-4 Adaptive Force per stack. Stacks up to 12 times. Ranged champions gain only 1 stack per basic attack. When fully stacked, heal for 8% of the damage you deal to champions (5% for ranged champions)."
          }
        ],
        [
          {
            "id": 9101,
            "key": "AbsorbLife",
            "name": "Absorb Life",
            "icon": "perk-images/Styles/Precision/AbsorbLife/AbsorbLife.png",
            "effect": "Killing a target heals you for @HealAmount@."
          },
          {
            "id": 9111,
            "key": "Triumph",
            "name": "Triumph",
            "icon": "perk-images/Styles/Precision/Triumph.png",
            "effect": "Takedowns restore 5% of your missing health, 2.5% of your max health, and grant an additional 20 gold. 'The most dangerous game brings the greatest glory.' —Noxian Reckoner"
          },
          {
            "id": 8009,
            "key": "PresenceOfMind",
            "name": "Presence of Mind",
            "icon": "perk-images/Styles/Precision/PresenceOfMind/PresenceOfMind.png",
            "effect": "Damaging an enemy champion restores 6-50 (80% for ranged) mana or 6 energy. Takedowns restore 15% of your maximum mana or energy. Cooldown for damage restoration: 8s"
          }
        ],
        [
          {
            "id": 9104,
            "key": "LegendAlacrity",
            "name": "Legend: Alacrity",
            "icon": "perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png",
            "effect": "Gain 3% attack speed plus an additional 1.5% for every Legend stack ( max 10 stacks ). Earn progress toward Legend stacks for every champion takedown, epic monster takedown, large monster kill, and minion kill."
          },
          {
            "id": 9105,
            "key": "LegendHaste",
            "name": "Legend: Haste",
            "icon": "perk-images/Styles/Precision/LegendHaste/LegendHaste.png",
            "effect": "Gain 1.5 basic ability haste for every Legend stack ( max 10 stacks ). Earn progress toward Legend stacks for every champion takedown, epic monster takedown, large monster kill, and minion kill."
          },
          {
            "id": 9103,
            "key": "LegendBloodline",
            "name": "Legend: Bloodline",
            "icon": "perk-images/Styles/Precision/LegendBloodline/LegendBloodline.png",
            "effect": "Gain 0.45% Life Steal for every Legend stack ( max 15 stacks ). At maximum Legend stacks, gain 85 max health . Earn progress toward Legend stacks for every champion takedown, epic monster takedown, large monster kill, and minion kill."
          }
        ],
        [
          {
            "id": 8014,
            "key": "CoupDeGrace",
            "name": "Coup de Grace",
            "icon": "perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png",
            "effect": "Deal 8% more damage to champions who have less than 40% health."
          },
          {
            "id": 8017,
            "key": "CutDown",
            "name": "Cut Down",
            "icon": "perk-images/Styles/Precision/CutDown/CutDown.png",
            "effect": "Deal 8% more damage to champions who have more than 60% health."
          },
          {
            "id": 8299,
            "key": "LastStand",
            "name": "Last Stand",
            "icon": "perk-images/Styles/Sorcery/LastStand/LastStand.png",
            "effect": "Deal 5% - 11% increased damage to champions while you are below 60% health. Max damage gained at 30% health."
          }
        ]
      ]
    },
    {
      "id": 8400,
      "name": "Resolve",
      "icon": "perk-images/Styles/7204_Resolve.png",
      "slots": [
        [
          {
            "id": 8437,
            "key": "GraspOfTheUndying",
            "name": "Grasp of the Undying",
            "icon": "perk-images/Styles/Resolve/GraspOfTheUndying/GraspOfTheUndying.png",
            "effect": "Every 4s in combat, your next basic attack on a champion will: Deal bonus magic damage equal to 3.5% of your max health Heal you for 1.3% of your max health Permanently increase your health by 5 Ranged Champions: Damage, healing, and permanent health gained are 40% effective."
          },
          {
            "id": 8439,
            "key": "Aftershock",
            "name": "Aftershock",
            "icon": "perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png",
            "effect": "After immobilizing an enemy champion, increase your Armor and Magic Resist by 45 + 75% of your Bonus Resists for 2.5s. Then explode, dealing magic damage to nearby enemies. Damage: 25 - 120 (+8% of your bonus health) Cooldown: 20s Resistance bonus from Aftershock capped at: 80-150 (based on level)"
          },
          {
            "id": 8465,
            "key": "Guardian",
            "name": "Guardian",
            "icon": "perk-images/Styles/Resolve/Guardian/Guardian.png",
            "effect": "Guard allies within 350 units of you, and allies you target with spells for 2.5s. While Guarding , if you or the ally take more than a small amount of damage over the duration of the Guard , both of you gain a shield for 1.5s. Cooldown: 75 - 40 seconds Shield: 40 - 150 + 20% of your ability power + 6% of your bonus health Proc Threshold: 50 - 165 postmitigation damage"
          }
        ],
        [
          {
            "id": 8446,
            "key": "Demolish",
            "name": "Demolish",
            "icon": "perk-images/Styles/Resolve/Demolish/Demolish.png",
            "effect": "Your third attack against towers deals [85 (+28% max Health) Melee || 50 (+20% max Health) Ranged] bonus physical damage. Cooldown: 30s"
          },
          {
            "id": 8463,
            "key": "FontOfLife",
            "name": "Font of Life",
            "icon": "perk-images/Styles/Resolve/FontOfLife/FontOfLife.png",
            "effect": "Impairing the movement of an enemy champion restores @BaseHeal@ Health to you and the lowest health nearby allied champion. 70% effect for Ranged Users. Cooldown: 20s"
          },
          {
            "id": 8401,
            "key": "ShieldBash",
            "name": "Shield Bash",
            "icon": "perk-images/Styles/Resolve/MirrorShell/MirrorShell.png",
            "effect": "Whenever you gain a new shield, your next basic attack against a champion deals 5 - 30 (+2.5% Bonus Health) (+15.0% New Shield Amount) bonus adaptive damage. You have up to 2s after the shield expires to use this effect."
          }
        ],
        [
          {
            "id": 8429,
            "key": "Conditioning",
            "name": "Conditioning",
            "icon": "perk-images/Styles/Resolve/Conditioning/Conditioning.png",
            "effect": "After 12 min gain +8 Armor and +8 Magic Resist and increase your Armor and Magic Resist by 3%."
          },
          {
            "id": 8444,
            "key": "SecondWind",
            "name": "Second Wind",
            "icon": "perk-images/Styles/Resolve/SecondWind/SecondWind.png",
            "effect": "After taking damage from an enemy champion, heal for 4% of your missing health over 10s."
          },
          {
            "id": 8473,
            "key": "BonePlating",
            "name": "Bone Plating",
            "icon": "perk-images/Styles/Resolve/BonePlating/BonePlating.png",
            "effect": "After taking damage from an enemy champion, the next 3 spells or attacks you receive from them deal 30-60 (based on level) less damage. Duration: 1.5s Cooldown: 55s"
          }
        ],
        [
          {
            "id": 8451,
            "key": "Overgrowth",
            "name": "Overgrowth",
            "icon": "perk-images/Styles/Resolve/Overgrowth/Overgrowth.png",
            "effect": "Absorb life essence from monsters or enemy minions that die near you, permanently gaining 3 maximum health for every 8. When you've absorbed 120 monsters or enemy minions, gain an additional 3.5% maximum health."
          },
          {
            "id": 8453,
            "key": "Revitalize",
            "name": "Revitalize",
            "icon": "perk-images/Styles/Resolve/Revitalize/Revitalize.png",
            "effect": "Gain 5% Heal and Shield Power. Heals and shields you cast or receive are 10% stronger on targets below 40% health."
          },
          {
            "id": 8242,
            "key": "Unflinching",
            "name": "Unflinching",
            "icon": "perk-images/Styles/Sorcery/Unflinching/Unflinching.png",
            "effect": "Gain 10 Armor and Magic Resist when crowd controlled and for 2 seconds after."
          }
        ]
      ]
    },
    {
      "id": 8200,
      "name": "Sorcery",
      "icon": "perk-images/Styles/7202_Sorcery.png",
      "slots": [
        [
          {
            "id": 8214,
            "key": "SummonAery",
            "name": "Summon Aery",
            "icon": "perk-images/Styles/Sorcery/SummonAery/SummonAery.png",
            "effect": "Damaging enemy champions with basic attacks or abilities sends Aery to them, dealing 10 - 50 based on level (+ 0.05 AP ) (+ 0.1 bonus AD ). Empowering or protecting allies with abilities sends Aery to them, shielding them for 20 - 100 based on level (+ 0.05 AP ) (+ 0.1 bonus AD ). Aery cannot be sent out again until she returns to you."
          },
          {
            "id": 8229,
            "key": "ArcaneComet",
            "name": "Arcane Comet",
            "icon": "perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png",
            "effect": "Damaging a champion with an ability hurls a comet at their location, dealing increased damage based on distance. Adaptive Damage : 15 - 100 based on level ( +0.05 AP and +0.1 bonus AD ) Cooldown: 20 - 8s Damage amplification scales up to 100% at 750 range."
          },
          {
            "id": 8230,
            "key": "PhaseRush",
            "name": "Stormraider's Surge",
            "icon": "perk-images/Styles/Sorcery/PhaseRush/StormraidersSurgeRuneIcon2.png",
            "effect": "Dealing 25% of a champion's maximum health within 3s grants 48% Move Speed and 50% Slow Resistance for 4s. Move Speed is 75% effective for ranged champions. Cooldown: 20s - 10s"
          },
          {
            "id": 8992,
            "key": "DeathfireTouch",
            "name": "Deathfire Touch",
            "icon": "perk-images/Styles/Sorcery/DeathfireTouch/DEATHFIRE_TOUCH_KEYSTONE.png",
            "effect": "Damaging a champion with an ability burns them for 3 - 12 based on level (+ 2.5% AP ) (+ 7% bonus AD ) magic damage per second. After burning for 3 seconds, the damage of the burn increases by 75% while they remain on fire. Duration: Single Target: 4s Area of Effect: 2s Damage over Time: 1s"
          }
        ],
        [
          {
            "id": 8224,
            "key": "NullifyingOrb",
            "name": "Axiom Arcanist",
            "icon": "perk-images/Styles/Sorcery/NullifyingOrb/Axiom_Arcanist.png",
            "effect": "Your Ultimate has 12% increased damage, healing, and shielding. (AoE damage is reduced to a 8% increase) Scoring a takedown on an enemy champion reduces your Ultimate's current cooldown by 7%."
          },
          {
            "id": 8226,
            "key": "ManaflowBand",
            "name": "Manaflow Band",
            "icon": "perk-images/Styles/Sorcery/ManaflowBand/ManaflowBand.png",
            "effect": "Hitting an enemy champion with an ability permanently increases your maximum mana by 25, up to 250 mana. After reaching 250 bonus mana, restore 1% of your missing mana every 5 seconds. Cooldown: 15 seconds"
          },
          {
            "id": 8275,
            "key": "NimbusCloak",
            "name": "Nimbus Cloak",
            "icon": "perk-images/Styles/Sorcery/NimbusCloak/6361.png",
            "effect": "After casting a Summoner Spell, gain a Move Speed increase that lasts for 2s and allows you to pass through units. Increase: 15% - 45% Move Speed based on the Summoner Spell's cooldown. (Higher cooldown Summoner Spells grant more Move Speed )."
          }
        ],
        [
          {
            "id": 8210,
            "key": "Transcendence",
            "name": "Transcendence",
            "icon": "perk-images/Styles/Sorcery/Transcendence/Transcendence.png",
            "effect": "Gain bonuses upon reaching the following levels: Level 5: +5 Ability Haste Level 8: +5 Ability Haste Level 11: On Champion takedown, reduce the remaining cooldown of basic abilities by 20%."
          },
          {
            "id": 8234,
            "key": "Celerity",
            "name": "Celerity",
            "icon": "perk-images/Styles/Sorcery/Celerity/CelerityTemp.png",
            "effect": "All movement bonuses are 7% more effective on you and gain 1% Move Speed ."
          },
          {
            "id": 8233,
            "key": "AbsoluteFocus",
            "name": "Absolute Focus",
            "icon": "perk-images/Styles/Sorcery/AbsoluteFocus/AbsoluteFocus.png",
            "effect": "While above 70% health, gain an adaptive bonus of up to 18 Attack Damage or 30 Ability Power (based on level). Grants 1.8 Attack Damage or 3 Ability Power at level 1."
          }
        ],
        [
          {
            "id": 8237,
            "key": "Scorch",
            "name": "Scorch",
            "icon": "perk-images/Styles/Sorcery/Scorch/Scorch.png",
            "effect": "Your next damaging ability hit sets champions on fire dealing 20 - 40 bonus magic damage based on level after 1s. Cooldown: 10s"
          },
          {
            "id": 8232,
            "key": "Waterwalking",
            "name": "Waterwalking",
            "icon": "perk-images/Styles/Sorcery/Waterwalking/Waterwalking.png",
            "effect": "Gain 10 Move Speed and 13 - 30 Adaptive Force (based on level) when in the river. May you be as swift as the rushing river and agile as a startled Rift Scuttler."
          },
          {
            "id": 8236,
            "key": "GatheringStorm",
            "name": "Gathering Storm",
            "icon": "perk-images/Styles/Sorcery/GatheringStorm/GatheringStorm.png",
            "effect": "Every 10 min gain AP or AD, adaptive . 10 min : + 8 AP or 5 AD 20 min : + 24 AP or 14 AD 30 min : + 48 AP or 29 AD 40 min : + 80 AP or 48 AD 50 min : + 120 AP or 72 AD 60 min : + 168 AP or 101 AD etc..."
          }
        ]
      ]
    }
  ]
};
