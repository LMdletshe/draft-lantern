// Official ability text used to review the directed matchup rules. Extend only after reviewing changed interactions.
const reviewedAbilityEvidence = {
  "patch": "16.21.1",
  "abilities": {
    "Xin Zhao:R": {
      "champion": "Xin Zhao",
      "slot": "R",
      "id": "XinZhaoR",
      "name": "Crescent Guard",
      "description": "Xin Zhao passively challenges an enemy he damaged recently. When activated, Xin Zhao deals damage to nearby enemies based on their current Health and knocks non-challenged targets back, becoming impervious to damage dealt by champions outside of the circle created.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/XinZhao.json"
    },
    "Karthus:R": {
      "champion": "Karthus",
      "slot": "R",
      "id": "KarthusFallenOne",
      "name": "Requiem",
      "description": "After channeling for 3 seconds, Karthus deals damage to all enemy champions.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Karthus.json"
    },
    "Xin Zhao:E": {
      "champion": "Xin Zhao",
      "slot": "E",
      "id": "XinZhaoE",
      "name": "Audacious Charge",
      "description": "Xin Zhao charges to an enemy, gaining increased Attack Speed and dealing damage to all enemies in the area, slowing them briefly. This Ability gains increased range against Challenged targets.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/XinZhao.json"
    },
    "Sylas:R": {
      "champion": "Sylas",
      "slot": "R",
      "id": "SylasR",
      "name": "Hijack",
      "description": "Sylas steals the enemy's ultimate ability and can cast it freely.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Sylas.json"
    },
    "Malphite:R": {
      "champion": "Malphite",
      "slot": "R",
      "id": "UFSlash",
      "name": "Unstoppable Force",
      "description": "Malphite launches himself to a location at high speed, damaging enemies and knocking them into the air.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Malphite.json"
    },
    "Malphite:Q": {
      "champion": "Malphite",
      "slot": "Q",
      "id": "SeismicShard",
      "name": "Seismic Shard",
      "description": "Malphite sends a shard of the earth through the ground at his foe, dealing damage upon impact and stealing Move Speed for 3 seconds.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Malphite.json"
    },
    "Sylas:W": {
      "champion": "Sylas",
      "slot": "W",
      "id": "SylasW",
      "name": "Kingslayer",
      "description": "Sylas lunges at an enemy with magical force dealing damage and healing himself against enemy champions.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Sylas.json"
    },
    "Mordekaiser:P": {
      "champion": "Mordekaiser",
      "slot": "P",
      "id": null,
      "name": "Darkness Rise",
      "description": "Mordekaiser gains a powerful damage aura and Move Speed after landing 3 attacks or spells against champions or monsters.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Mordekaiser.json"
    },
    "Malphite:W": {
      "champion": "Malphite",
      "slot": "W",
      "id": "Obduracy",
      "name": "Thunderclap",
      "description": "Malphite attacks with such force that it creates a sonic boom. For the next few seconds, his attacks create aftershocks in front of him.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Malphite.json"
    },
    "Gwen:Q": {
      "champion": "Gwen",
      "slot": "Q",
      "id": "GwenQ",
      "name": "Snip Snip!",
      "description": "Gwen snips her scissors in a cone up to 6 times dealing magic damage. Gwen deals true damage to units in the center and applies her passive to them on each snip.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Gwen.json"
    },
    "Malphite:E": {
      "champion": "Malphite",
      "slot": "E",
      "id": "Landslide",
      "name": "Ground Slam",
      "description": "Malphite slams the ground, sending out a shockwave that deals magic damage based on his Armor and reduces the Attack Speed of enemies for a short duration.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Malphite.json"
    },
    "Poppy:W": {
      "champion": "Poppy",
      "slot": "W",
      "id": "PoppyW",
      "name": "Steadfast Presence",
      "description": "Poppy passively gains Armor and Magic Resist. This bonus increases when she is low on Health. Poppy can activate Steadfast Presence to gain Move Speed and stop enemy dashes around her. If a dash is stopped, the enemy is slowed and grounded.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Poppy.json"
    },
    "Riven:E": {
      "champion": "Riven",
      "slot": "E",
      "id": "RivenFeint",
      "name": "Valor",
      "description": "Riven steps forward a short distance and blocks incoming damage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Riven.json"
    },
    "Poppy:P": {
      "champion": "Poppy",
      "slot": "P",
      "id": null,
      "name": "Iron Ambassador",
      "description": "Poppy throws her buckler that bounces off the target. Poppy can pick it up to gain a temporary shield.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Poppy.json"
    },
    "Poppy:E": {
      "champion": "Poppy",
      "slot": "E",
      "id": "PoppyE",
      "name": "Heroic Charge",
      "description": "Poppy dashes to the target and pushes it back. If the target is pushed into a wall, it is stunned.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Poppy.json"
    },
    "Camille:E": {
      "champion": "Camille",
      "slot": "E",
      "id": "CamilleE",
      "name": "Hookshot",
      "description": "Camille pulls herself to a wall, leaping off and knocking up enemy champions upon landing.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Camille.json"
    },
    "Irelia:Q": {
      "champion": "Irelia",
      "slot": "Q",
      "id": "IreliaQ",
      "name": "Bladesurge",
      "description": "Irelia dashes forward to strike her target, healing herself. If the target is Marked or dies to Bladesurge, its cooldown refreshes.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Irelia.json"
    },
    "Jax:Q": {
      "champion": "Jax",
      "slot": "Q",
      "id": "JaxQ",
      "name": "Leap Strike",
      "description": "Jax leaps toward a unit. If they are an enemy, he strikes them with his weapon.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Jax.json"
    },
    "Jax:E": {
      "champion": "Jax",
      "slot": "E",
      "id": "JaxE",
      "name": "Counter Strike",
      "description": "Jax's combat prowess allows him to dodge all incoming attacks for a short duration and then quickly counterattack, stunning all surrounding enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Jax.json"
    },
    "Fiora:Q": {
      "champion": "Fiora",
      "slot": "Q",
      "id": "FioraQ",
      "name": "Lunge",
      "description": "Fiora lunges in a direction and stabs a nearby enemy, dealing physical damage and applying on-hit effects.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Fiora.json"
    },
    "Camille:Q": {
      "champion": "Camille",
      "slot": "Q",
      "id": "CamilleQ",
      "name": "Precision Protocol",
      "description": "Camille's next attack deals bonus damage and grants bonus Move Speed. This spell can be recast for a short period of time, doing significantly increased bonus damage if Camille delays a period of time between the two attacks.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Camille.json"
    },
    "Tryndamere:P": {
      "champion": "Tryndamere",
      "slot": "P",
      "id": null,
      "name": "Battle Fury",
      "description": "Tryndamere gains Fury for each attack, critical strike, and killing blow he makes. Fury passively increases his Critical Strike Chance and can be consumed with his Bloodlust spell.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Tryndamere.json"
    },
    "Tryndamere:R": {
      "champion": "Tryndamere",
      "slot": "R",
      "id": "UndyingRage",
      "name": "Undying Rage",
      "description": "Tryndamere's lust for battle becomes so strong that he is unable to die, no matter how wounded he becomes.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Tryndamere.json"
    },
    "Jax:P": {
      "champion": "Jax",
      "slot": "P",
      "id": null,
      "name": "Relentless Assault",
      "description": "Jax's consecutive basic attacks continuously increase his Attack Speed.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Jax.json"
    },
    "Vayne:E": {
      "champion": "Vayne",
      "slot": "E",
      "id": "VayneCondemn",
      "name": "Condemn",
      "description": "Vayne draws a heavy crossbow from her back, and fires a huge bolt at her target, knocking them back and dealing damage. If they collide with terrain, they are impaled, dealing bonus damage and stunning them.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Vayne.json"
    },
    "Garen:Q": {
      "champion": "Garen",
      "slot": "Q",
      "id": "GarenQ",
      "name": "Decisive Strike",
      "description": "Garen gains a burst of Move Speed, breaking free of all slows affecting him. His next attack strikes a vital area of his foe, dealing bonus damage and silencing them.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Garen.json"
    },
    "Vayne:W": {
      "champion": "Vayne",
      "slot": "W",
      "id": "VayneSilveredBolts",
      "name": "Silver Bolts",
      "description": "Vayne tips her bolts with a rare metal, toxic to evil things. The third consecutive attack or ability against the same target deals a percentage of the target's max health as bonus true damage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Vayne.json"
    },
    "Darius:E": {
      "champion": "Darius",
      "slot": "E",
      "id": "DariusAxeGrabCone",
      "name": "Apprehend",
      "description": "Darius hones his axe, passively causing his physical damage to ignore a percentage of his target's Armor. When activated, Darius sweeps up his enemies with his axe's hook and pulls them to him.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Darius.json"
    },
    "Sett:E": {
      "champion": "Sett",
      "slot": "E",
      "id": "SettE",
      "name": "Facebreaker",
      "description": "Sett pulls in all enemies on opposite sides of him, dealing damage and stunning them. If enemies were only on one side, they are slowed instead of stunned.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Sett.json"
    },
    "Quinn:E": {
      "champion": "Quinn",
      "slot": "E",
      "id": "QuinnE",
      "name": "Vault",
      "description": "Quinn dashes to an enemy, dealing physical damage and slowing the target's Move Speed. Upon reaching the target, she leaps off the target, briefly interrupting it, and lands near her maximum Attack Range away from the target.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Quinn.json"
    },
    "Rumble:Q": {
      "champion": "Rumble",
      "slot": "Q",
      "id": "RumbleFlameThrower",
      "name": "Flamespitter",
      "description": "Rumble torches opponents in front of him, dealing magic damage in a cone for 3 seconds. While in Danger Zone this damage is increased.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Rumble.json"
    },
    "Teemo:Q": {
      "champion": "Teemo",
      "slot": "Q",
      "id": "TeemoQ",
      "name": "Blinding Dart",
      "description": "Obscures an enemy's vision with a powerful venom, dealing damage to the target unit and blinding it for the duration.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Teemo.json"
    },
    "Rumble:W": {
      "champion": "Rumble",
      "slot": "W",
      "id": "RumbleShield",
      "name": "Scrap Shield",
      "description": "Rumble pulls up a shield, protecting him from damage and granting him a quick burst of speed. While in Danger Zone, the shield strength and speed bonus is increased.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Rumble.json"
    },
    "Nasus:W": {
      "champion": "Nasus",
      "slot": "W",
      "id": "NasusW",
      "name": "Wither",
      "description": "Nasus ages an enemy champion, decelerating their Move Speed and Attack Speed over time.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Nasus.json"
    },
    "Tryndamere:E": {
      "champion": "Tryndamere",
      "slot": "E",
      "id": "TryndamereE",
      "name": "Spinning Slash",
      "description": "Tryndamere slices toward a target unit, dealing damage to enemies in his path.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Tryndamere.json"
    },
    "Fiora:W": {
      "champion": "Fiora",
      "slot": "W",
      "id": "FioraW",
      "name": "Riposte",
      "description": "Fiora parries all incoming damage and disables for a short time, then stabs in a direction. This stab slows the first enemy champion hit, or stuns them if Fiora blocked an immobilizing effect with this ability.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Fiora.json"
    },
    "Aatrox:Q": {
      "champion": "Aatrox",
      "slot": "Q",
      "id": "AatroxQ",
      "name": "The Darkin Blade",
      "description": "Aatrox slams his greatsword down, dealing physical damage. He can swing three times, each with a different area of effect.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Aatrox.json"
    },
    "Lissandra:R": {
      "champion": "Lissandra",
      "slot": "R",
      "id": "LissandraR",
      "name": "Frozen Tomb",
      "description": "If cast on an enemy champion, the target is frozen solid, stunning it. If cast on Lissandra, she encases herself in dark ice, healing herself while becoming untargetable and invulnerable. Dark ice then emanates from the target dealing magic damage to enemies and slowing Move Speed.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Lissandra.json"
    },
    "Zed:R": {
      "champion": "Zed",
      "slot": "R",
      "id": "ZedR",
      "name": "Death Mark",
      "description": "Zed becomes untargetable and dashes to an enemy champion, marking them. After 3 seconds the mark triggers, repeating a portion of all the damage Zed dealt to the target while they were marked.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Zed.json"
    },
    "Lissandra:W": {
      "champion": "Lissandra",
      "slot": "W",
      "id": "LissandraW",
      "name": "Ring of Frost",
      "description": "Freezes nearby enemies in ice, dealing magic damage and rooting them.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Lissandra.json"
    },
    "Katarina:R": {
      "champion": "Katarina",
      "slot": "R",
      "id": "KatarinaR",
      "name": "Death Lotus",
      "description": "Katarina becomes a flurry of blades, dealing massive magic damage while she channels to the 3 nearest enemy champions.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Katarina.json"
    },
    "LeBlanc:W": {
      "champion": "LeBlanc",
      "slot": "W",
      "id": "LeblancW",
      "name": "Distortion",
      "description": "LeBlanc dashes to a location, dealing damage to enemies near her destination. For the next 4 seconds, activate Distortion again to return LeBlanc to her starting location.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Leblanc.json"
    },
    "Fizz:R": {
      "champion": "Fizz",
      "slot": "R",
      "id": "FizzR",
      "name": "Chum the Waters",
      "description": "Fizz tosses a fish in a direction that attaches to any champion that touches it, slowing the target. After a short delay, a shark erupts from the ground, knocking up the target and knocking any nearby enemies aside. All enemies hit are dealt magic damage and slowed.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Fizz.json"
    },
    "Akali:E": {
      "champion": "Akali",
      "slot": "E",
      "id": "AkaliE",
      "name": "Shuriken Flip",
      "description": "Flip backward and fire a shuriken forward, dealing magic damage. The first enemy or smoke cloud hit is marked. Re-cast to dash to the marked target, dealing additional damage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Akali.json"
    },
    "Malzahar:R": {
      "champion": "Malzahar",
      "slot": "R",
      "id": "MalzaharR",
      "name": "Nether Grasp",
      "description": "Malzahar channels the essence of the Void to suppress an enemy champion over a zone of damaging negative energy.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Malzahar.json"
    },
    "Yasuo:E": {
      "champion": "Yasuo",
      "slot": "E",
      "id": "YasuoE",
      "name": "Sweeping Blade",
      "description": "Dashes through target enemy, dealing magic damage. Each cast increases subsequent dash's damage, up to a max amount. Cannot be re-cast on the same enemy for a few seconds. If Steel Tempest is cast while dashing, it will strike as a circle.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Yasuo.json"
    },
    "Kassadin:Q": {
      "champion": "Kassadin",
      "slot": "Q",
      "id": "NullLance",
      "name": "Null Sphere",
      "description": "Kassadin fires an orb of void energy at a target, dealing damage and interrupting channels. The excess energy forms around himself, granting a temporary shield that absorbs magic damage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Kassadin.json"
    },
    "Kassadin:R": {
      "champion": "Kassadin",
      "slot": "R",
      "id": "RiftWalk",
      "name": "Riftwalk",
      "description": "Kassadin teleports to a nearby location dealing damage to nearby enemy units. Multiple Riftwalks in a short period of time cost additional Mana but also deal additional damage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Kassadin.json"
    },
    "Veigar:E": {
      "champion": "Veigar",
      "slot": "E",
      "id": "VeigarEventHorizon",
      "name": "Event Horizon",
      "description": "Veigar twists the edges of space, creating a cage that Stuns enemies that pass through.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Veigar.json"
    },
    "Vex:P": {
      "champion": "Vex",
      "slot": "P",
      "id": null,
      "name": "Doom 'n Gloom",
      "description": "Vex periodically becomes empowered, causing her next basic Ability to fear enemies and interrupt dashes. Whenever a nearby enemy dashes, Vex applies a mark that can be consumed for bonus damage that also reduces the cooldown of her empowered state.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Vex.json"
    },
    "Yone:E": {
      "champion": "Yone",
      "slot": "E",
      "id": "YoneE",
      "name": "Soul Unbound",
      "description": "Yone's spirit leaves his body behind, gaining Move Speed. When this ability ends, Yone's spirit is forced back to his body and he repeats a portion of the damage he dealt as a spirit.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Yone.json"
    },
    "Taliyah:E": {
      "champion": "Taliyah",
      "slot": "E",
      "id": "TaliyahE",
      "name": "Unraveled Earth",
      "description": "Taliyah creates a slowing minefield. If enemies dash through it or are knocked through it, the mines explode and stun them.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Taliyah.json"
    },
    "Sylas:E": {
      "champion": "Sylas",
      "slot": "E",
      "id": "SylasE",
      "name": "Abscond / Abduct",
      "description": "Sylas dashes to a location. Sylas can recast the ability to throw his chains out, pulling himself to an enemy he hits.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Sylas.json"
    },
    "Galio:W": {
      "champion": "Galio",
      "slot": "W",
      "id": "GalioW",
      "name": "Shield of Durand",
      "description": "Galio charges a defensive stance, moving slowly. Upon releasing the charge, Galio will taunt and damage nearby enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Galio.json"
    },
    "Akali:W": {
      "champion": "Akali",
      "slot": "W",
      "id": "AkaliW",
      "name": "Twilight Shroud",
      "description": "Akali drops a cover of smoke and briefly gains Move Speed. While inside the shroud, Akali becomes invisible and unable to be selected by enemy spells and attacks. Attacking or using abilities will briefly reveal her.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Akali.json"
    },
    "Cassiopeia:W": {
      "champion": "Cassiopeia",
      "slot": "W",
      "id": "CassiopeiaW",
      "name": "Miasma",
      "description": "Cassiopeia releases several clouds of poison, slowing, grounding, and lightly damaging enemies that pass through them. Grounded enemies cannot use Movement abilities.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Cassiopeia.json"
    },
    "Cassiopeia:E": {
      "champion": "Cassiopeia",
      "slot": "E",
      "id": "CassiopeiaE",
      "name": "Twin Fang",
      "description": "Cassiopeia lets loose an attack that deals increased damage to Poisoned targets and heals her for a percentage of the damage dealt. If the target dies from this attack, Cassiopeia regains Mana.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Cassiopeia.json"
    },
    "Cassiopeia:P": {
      "champion": "Cassiopeia",
      "slot": "P",
      "id": null,
      "name": "Serpentine Grace",
      "description": "All Move Speed bonuses are more effective on Cassiopeia.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Cassiopeia.json"
    },
    "Yasuo:W": {
      "champion": "Yasuo",
      "slot": "W",
      "id": "YasuoW",
      "name": "Wind Wall",
      "description": "Creates a moving wall that blocks all enemy projectiles for 4 seconds.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Yasuo.json"
    },
    "Ahri:E": {
      "champion": "Ahri",
      "slot": "E",
      "id": "AhriE",
      "name": "Charm",
      "description": "Ahri blows a kiss that damages and charms an enemy it encounters, instantly stopping movement abilities and causing them to walk harmlessly towards her.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Ahri.json"
    },
    "Lee Sin:Q": {
      "champion": "Lee Sin",
      "slot": "Q",
      "id": "LeeSinQOne",
      "name": "Sonic Wave / Resonating Strike",
      "description": "Sonic Wave: Lee Sin projects a discordant wave of sound to locate his enemies, dealing physical damage to the first enemy it encounters. If Sonic Wave hits, Lee Sin can cast Resonating Strike for the next 3 seconds. Resonating Strike: Lee Sin dashes to the enemy hit by Sonic Wave, dealing physical damage based on the target's missing Health.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/LeeSin.json"
    },
    "Jarvan IV:Q": {
      "champion": "Jarvan IV",
      "slot": "Q",
      "id": "JarvanIVDragonStrike",
      "name": "Dragon Strike",
      "description": "Jarvan IV extends his lance, dealing physical damage and lowering the Armor of enemies in its path. Additionally, this will pull Jarvan to his Demacian Standard, knocking up enemies in his path.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/JarvanIV.json"
    },
    "Jarvan IV:R": {
      "champion": "Jarvan IV",
      "slot": "R",
      "id": "JarvanIVCataclysm",
      "name": "Cataclysm",
      "description": "Jarvan IV heroically leaps into battle at a target with such force that he terraforms the surrounding area to create an arena around them. Nearby enemies are damaged at the moment of impact.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/JarvanIV.json"
    },
    "Zac:E": {
      "champion": "Zac",
      "slot": "E",
      "id": "ZacE",
      "name": "Elastic Slingshot",
      "description": "Zac attaches his arms to the ground and stretches back, launching himself forward.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Zac.json"
    },
    "Bel'Veth:Q": {
      "champion": "Bel'Veth",
      "slot": "Q",
      "id": "BelvethQ",
      "name": "Void Surge",
      "description": "Bel'Veth dashes in a chosen direction and damages all enemies she passes through.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Belveth.json"
    },
    "Kayn:Q": {
      "champion": "Kayn",
      "slot": "Q",
      "id": "KaynQ",
      "name": "Reaping Slash",
      "description": "Kayn dashes, then slashes. Both deal damage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Kayn.json"
    },
    "Vi:Q": {
      "champion": "Vi",
      "slot": "Q",
      "id": "ViQ",
      "name": "Vault Breaker",
      "description": "Vi charges her gauntlets and unleashes a vault shattering punch, carrying her forward. Enemies she hits are knocked back and receive a stack of Denting Blows.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Vi.json"
    },
    "Vi:R": {
      "champion": "Vi",
      "slot": "R",
      "id": "ViR",
      "name": "Cease and Desist",
      "description": "Vi runs down an enemy, knocking aside anyone in the way. When she reaches her target she knocks it into the air, jumps after it, and slams it back into the ground.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Vi.json"
    },
    "Hecarim:E": {
      "champion": "Hecarim",
      "slot": "E",
      "id": "HecarimRamp",
      "name": "Devastating Charge",
      "description": "Hecarim gains increasing Move Speed and can move through units for a short duration. His next attack knocks the target back and deals additional physical damage based on the distance he has traveled since activating the ability.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Hecarim.json"
    },
    "Hecarim:R": {
      "champion": "Hecarim",
      "slot": "R",
      "id": "HecarimUlt",
      "name": "Onslaught of Shadows",
      "description": "Hecarim summons spectral riders and charges forward, dealing magic damage in a line. Hecarim creates a shockwave when he finishes his charge, causing nearby enemies to flee in terror.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Hecarim.json"
    },
    "Kha'Zix:E": {
      "champion": "Kha'Zix",
      "slot": "E",
      "id": "KhazixE",
      "name": "Leap",
      "description": "Kha'Zix leaps to an area, dealing physical damage upon landing. If he chooses to Evolve Wings , Leap's range increases and the cooldown resets on champion kill or assist.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Khazix.json"
    },
    "Rammus:W": {
      "champion": "Rammus",
      "slot": "W",
      "id": "DefensiveBallCurl",
      "name": "Defensive Ball Curl",
      "description": "Rammus goes into a defensive formation, vastly increasing his Armor and Magic Resistance, and returning damage to enemies that attack him.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Rammus.json"
    },
    "Master Yi:P": {
      "champion": "Master Yi",
      "slot": "P",
      "id": null,
      "name": "Double Strike",
      "description": "Every few consecutive basic attack, Master Yi strikes twice.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/MasterYi.json"
    },
    "Rammus:E": {
      "champion": "Rammus",
      "slot": "E",
      "id": "PuncturingTaunt",
      "name": "Frenzying Taunt",
      "description": "Rammus taunts an enemy champion or monster into a reckless assault against him.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Rammus.json"
    },
    "Master Yi:E": {
      "champion": "Master Yi",
      "slot": "E",
      "id": "WujuStyle",
      "name": "Wuju Style",
      "description": "Grants bonus true damage on basic attacks.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/MasterYi.json"
    },
    "Master Yi:R": {
      "champion": "Master Yi",
      "slot": "R",
      "id": "Highlander",
      "name": "Highlander",
      "description": "Master Yi moves with unparalleled agility, temporarily increasing his Move Speed and Attack Speed as well as making him immune to all slowing effects. While active, Champion kills or assists extend Highlander's duration. Passively reduces cooldown for his other abilities on a kill or assist.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/MasterYi.json"
    },
    "Bel'Veth:P": {
      "champion": "Bel'Veth",
      "slot": "P",
      "id": null,
      "name": "Death in Lavender ",
      "description": "Bel'Veth gains permanent attack speed stacks after taking down large minions and monsters and champions. She also gains temporary bonus attack speed after using an ability.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Belveth.json"
    },
    "Trundle:R": {
      "champion": "Trundle",
      "slot": "R",
      "id": "TrundlePain",
      "name": "Subjugate",
      "description": "Trundle immediately steals a percent of his target's Health, Armor and Magic Resistance. Over the next 4 seconds the amount of Health, Armor, and Magic Resistance stolen is doubled.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Trundle.json"
    },
    "Trundle:E": {
      "champion": "Trundle",
      "slot": "E",
      "id": "TrundleCircle",
      "name": "Pillar of Ice",
      "description": "Trundle creates an ice pillar at target location, becoming impassable terrain and slowing all nearby enemy units.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Trundle.json"
    },
    "Gragas:R": {
      "champion": "Gragas",
      "slot": "R",
      "id": "GragasR",
      "name": "Explosive Cask",
      "description": "Gragas hurls his cask to a location, dealing damage and knocking back enemies caught in the blast radius.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Gragas.json"
    },
    "Kindred:R": {
      "champion": "Kindred",
      "slot": "R",
      "id": "KindredR",
      "name": "Lamb's Respite",
      "description": "Lamb grants all living things inside a zone a respite from death. Until the effect ends, nothing can die. At the end, units are healed.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Kindred.json"
    },
    "Lee Sin:R": {
      "champion": "Lee Sin",
      "slot": "R",
      "id": "LeeSinR",
      "name": "Dragon's Rage",
      "description": "Lee Sin performs a powerful roundhouse kick launching his target back, dealing physical damage to the target and any enemies they collide with. Enemies the target collides with are knocked into the air for a short duration. This technique was taught to him by Jesse Perring, although Lee Sin does not kick players off the map.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/LeeSin.json"
    },
    "Morgana:E": {
      "champion": "Morgana",
      "slot": "E",
      "id": "MorganaE",
      "name": "Black Shield",
      "description": "Morgana anoints an ally with a protective barrier of starfire, which absorbs magical damage and disabling effects until it is broken.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Morgana.json"
    },
    "Blitzcrank:Q": {
      "champion": "Blitzcrank",
      "slot": "Q",
      "id": "RocketGrab",
      "name": "Rocket Grab",
      "description": "Blitzcrank fires their right hand to grab an opponent on its path, dealing damage and dragging it back to them.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Blitzcrank.json"
    },
    "Morgana:Q": {
      "champion": "Morgana",
      "slot": "Q",
      "id": "MorganaQ",
      "name": "Dark Binding",
      "description": "Morgana binds an enemy in place with dark magic, forcing them to feel the pain they've caused and dealing magic damage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Morgana.json"
    },
    "Blitzcrank:R": {
      "champion": "Blitzcrank",
      "slot": "R",
      "id": "StaticField",
      "name": "Static Field",
      "description": "Enemies attacked by Blitzcrank are marked and take lightning damage after 1 second. Additionally, Blitzcrank can activate this ability to remove nearby enemies' shields, damage them, and silence them briefly.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Blitzcrank.json"
    },
    "Nautilus:Q": {
      "champion": "Nautilus",
      "slot": "Q",
      "id": "NautilusAnchorDrag",
      "name": "Dredge Line",
      "description": "Nautilus hurls his anchor forward. Colliding with an enemy pulls them and Nautilus together, dealing magic damage. Colliding with terrain pulls Nautilus towards it.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Nautilus.json"
    },
    "Leona:E": {
      "champion": "Leona",
      "slot": "E",
      "id": "LeonaZenithBlade",
      "name": "Zenith Blade",
      "description": "Leona projects a solar image of her sword, dealing magic damage to all enemies in a line. When the image fades, the last enemy champion struck will be briefly immobilized and Leona will dash to them.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Leona.json"
    },
    "Alistar:Q": {
      "champion": "Alistar",
      "slot": "Q",
      "id": "Pulverize",
      "name": "Pulverize",
      "description": "Alistar smashes the ground, dealing damage to nearby enemies and tossing them into the air.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Alistar.json"
    },
    "Rakan:W": {
      "champion": "Rakan",
      "slot": "W",
      "id": "RakanW",
      "name": "Grand Entrance",
      "description": "Dashes to a location, knocking up nearby enemies on arrival.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Rakan.json"
    },
    "Janna:Q": {
      "champion": "Janna",
      "slot": "Q",
      "id": "HowlingGale",
      "name": "Howling Gale",
      "description": "By creating a localized change in pressure and temperature, Janna is able to create a small storm that grows in size with time. She can activate the spell again to release the storm. On release this storm will fly towards the direction it was cast in, dealing damage and knocking away any enemies in its path.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Janna.json"
    },
    "Janna:E": {
      "champion": "Janna",
      "slot": "E",
      "id": "EyeOfTheStorm",
      "name": "Eye Of The Storm",
      "description": "Janna conjures a defensive gale that shields an ally champion or turret from incoming damage and increases their Attack Damage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Janna.json"
    },
    "Janna:R": {
      "champion": "Janna",
      "slot": "R",
      "id": "ReapTheWhirlwind",
      "name": "Monsoon",
      "description": "Janna surrounds herself in a magical storm, throwing enemies back. After the storm has settled, soothing winds heal nearby allies while the ability is active.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Janna.json"
    },
    "Alistar:W": {
      "champion": "Alistar",
      "slot": "W",
      "id": "Headbutt",
      "name": "Headbutt",
      "description": "Alistar rams a target with his head, dealing damage and knocking the target back.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Alistar.json"
    },
    "Rakan:R": {
      "champion": "Rakan",
      "slot": "R",
      "id": "RakanR",
      "name": "The Quickness",
      "description": "Gains Move Speed, charming and dealing magic damage to enemies touched.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Rakan.json"
    },
    "Soraka:R": {
      "champion": "Soraka",
      "slot": "R",
      "id": "SorakaR",
      "name": "Wish",
      "description": "Soraka fills her allies with hope, instantly restoring health to herself and all allied champions.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Soraka.json"
    },
    "Pyke:R": {
      "champion": "Pyke",
      "slot": "R",
      "id": "PykeR",
      "name": "Death From Below",
      "description": "Pyke blinks to and executes low health enemies, allowing him to cast this spell again and granting additional gold to an ally who assists.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Pyke.json"
    },
    "Soraka:E": {
      "champion": "Soraka",
      "slot": "E",
      "id": "SorakaE",
      "name": "Equinox",
      "description": "Creates a zone at a location that silences all enemies inside. When the zone expires, all enemies still inside are rooted.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Soraka.json"
    },
    "Lulu:R": {
      "champion": "Lulu",
      "slot": "R",
      "id": "LuluR",
      "name": "Wild Growth",
      "description": "Lulu enlarges an ally, knocking nearby enemies into the air and granting the ally a large amount of bonus health. For the next few seconds, that ally gains an aura that slows nearby enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Lulu.json"
    },
    "Sivir:E": {
      "champion": "Sivir",
      "slot": "E",
      "id": "SivirE",
      "name": "Spell Shield",
      "description": "Creates a magical barrier that blocks a single enemy ability cast on Sivir. She receives health and a burst of movement speed if a spell is blocked.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Sivir.json"
    },
    "Ashe:R": {
      "champion": "Ashe",
      "slot": "R",
      "id": "EnchantedCrystalArrow",
      "name": "Enchanted Crystal Arrow",
      "description": "Ashe fires a missile of ice in a straight line. If the arrow collides with an enemy Champion, it deals damage and stuns the Champion, stunning for longer the farther arrow has traveled. In addition, surrounding enemy units take damage and are slowed.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Ashe.json"
    },
    "Varus:R": {
      "champion": "Varus",
      "slot": "R",
      "id": "VarusR",
      "name": "Chain of Corruption",
      "description": "Varus flings out a damaging tendril of corruption that immobilizes the first enemy champion hit and then spreads towards nearby uninfected champions, immobilizing them too on contact.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Varus.json"
    },
    "Jhin:W": {
      "champion": "Jhin",
      "slot": "W",
      "id": "JhinW",
      "name": "Deadly Flourish",
      "description": "Jhin brandishes his cane, firing a single shot with incredible range. It pierces through minions and monsters, but stops on the first champion hit. If the target was recently struck by Jhin's allies, lotus traps, or damaged by Jhin, they are rooted.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Jhin.json"
    },
    "Jhin:R": {
      "champion": "Jhin",
      "slot": "R",
      "id": "JhinR",
      "name": "Curtain Call",
      "description": "Jhin channels, transforming Whisper into a shoulder-mounted mega-cannon. It is able to fire 4 super shots at extreme range that pierce through minions and monsters, but stop on the first champion impacted. Whisper cripples enemies hit, which slows them and deals execute damage. The 4th shot is perfectly crafted, epically powerful, and guaranteed to critically strike.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Jhin.json"
    },
    "Miss Fortune:R": {
      "champion": "Miss Fortune",
      "slot": "R",
      "id": "MissFortuneBulletTime",
      "name": "Bullet Time",
      "description": "Miss Fortune channels a barrage of bullets into a cone in front of her, dealing large amounts of damage to enemies. Each wave of Bullet Time can critically strike",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/MissFortune.json"
    },
    "Miss Fortune:E": {
      "champion": "Miss Fortune",
      "slot": "E",
      "id": "MissFortuneScattershot",
      "name": "Make It Rain",
      "description": "Miss Fortune reveals an area with a flurry of bullets, dealing waves of damage to opponents and slowing them.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/MissFortune.json"
    },
    "Ezreal:Q": {
      "champion": "Ezreal",
      "slot": "Q",
      "id": "EzrealQ",
      "name": "Mystic Shot",
      "description": "Ezreal fires a damaging bolt of energy which reduces all of his cooldowns slightly if it strikes an enemy unit.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Ezreal.json"
    },
    "Ezreal:E": {
      "champion": "Ezreal",
      "slot": "E",
      "id": "EzrealE",
      "name": "Arcane Shift",
      "description": "Ezreal teleports to a target nearby location and fires a homing bolt which strikes the nearest enemy unit. Prioritizes enemies stuck with Essence Flux.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Ezreal.json"
    },
    "Braum:E": {
      "champion": "Braum",
      "slot": "E",
      "id": "BraumE",
      "name": "Unbreakable",
      "description": "Braum raises his shield in a direction for several seconds, intercepting all projectiles causing them to hit him and be destroyed. He negates the damage of the first attack completely and reduces the damage of all subsequent attacks from this direction.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Braum.json"
    },
    "Akshan:E": {
      "champion": "Akshan",
      "slot": "E",
      "id": "AkshanE",
      "name": "Heroic Swing",
      "description": "Akshan fires a grappling hook into terrain then swings around it, repeatedly firing at the nearest enemy while swinging. He can jump off early or gets knocked off when colliding with champions or terrain.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Akshan.json"
    },
    "Ambessa:P": {
      "champion": "Ambessa",
      "slot": "P",
      "id": null,
      "name": "Drakehound's Step",
      "description": "Entering an attack or movement command while casting an ability will cause Ambessa to dash a short distance once the ability is cast, granting her next attack bonus range, damage, and attack speed, and refunding energy.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Ambessa.json"
    },
    "Ambessa:R": {
      "champion": "Ambessa",
      "slot": "R",
      "id": "AmbessaR",
      "name": "Public Execution",
      "description": "Ambessa blinks to the farthest enemy champion in a line of her choosing and suppresses them upon her arrival. She then slams the enemy into the ground where they take damage and are stunned.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Ambessa.json"
    },
    "Diana:E": {
      "champion": "Diana",
      "slot": "E",
      "id": "DianaTeleport",
      "name": "Lunar Rush",
      "description": "Becomes the living embodiment of the vengeful moon, dashing to an enemy and dealing magic damage. Lunar Rush has no cooldown when used to dash to an enemy afflicted with Moonlight. All other enemies will have the Moonlight debuff removed regardless of whether they were the target of Lunar Rush.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Diana.json"
    },
    "Ekko:E": {
      "champion": "Ekko",
      "slot": "E",
      "id": "EkkoE",
      "name": "Phase Dive",
      "description": "Ekko rolls evasively while charging up his Z-Drive. His next attack deals bonus damage and warps reality, teleporting him to his target.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Ekko.json"
    },
    "Gragas:E": {
      "champion": "Gragas",
      "slot": "E",
      "id": "GragasE",
      "name": "Body Slam",
      "description": "Gragas charges to a location and collides with the first enemy unit he comes across, dealing damage to all nearby enemy units and stunning them.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Gragas.json"
    },
    "Graves:E": {
      "champion": "Graves",
      "slot": "E",
      "id": "GravesMove",
      "name": "Quickdraw",
      "description": "Graves dashes forward gaining an Armor and Magic Resist boost for several seconds. If Graves dashes towards an enemy champion, gain two stacks of True Grit instead. Hitting enemies with basic attacks lowers the cooldown of this skill and refreshes the resistance boost.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Graves.json"
    },
    "Gwen:E": {
      "champion": "Gwen",
      "slot": "E",
      "id": "GwenE",
      "name": "Skip 'n Slash",
      "description": "Gwen dashes a short distance then gains Attack Speed, attack range, and magic damage On-Hit for a few seconds. If she hits an enemy during that time, this Ability's cooldown is partially refunded.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Gwen.json"
    },
    "Jayce:Q": {
      "champion": "Jayce",
      "slot": "Q",
      "id": "JayceToTheSkies",
      "name": "To the Skies! / Shock Blast",
      "description": "Hammer Stance: Leaps to an enemy dealing physical damage and slowing enemies. Cannon Stance: Fires an orb of electricity that detonates upon hitting an enemy (or reaching the end of its path) dealing physical damage to all enemies hit.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Jayce.json"
    },
    "Kled:E": {
      "champion": "Kled",
      "slot": "E",
      "id": "KledE",
      "name": "Jousting",
      "description": "Kled dashes, dealing physical damage and gaining a short burst of speed. Kled can cast this ability again to dash back through his initial target, dealing the same damage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Kled.json"
    },
    "Kled:R": {
      "champion": "Kled",
      "slot": "R",
      "id": "KledR",
      "name": "Chaaaaaaaarge!!!",
      "description": "Kled and Skaarl charge to a location, leaving a speed-granting trail behind them and gaining a shield. Skaarl locks onto and rams the first enemy champion encountered.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Kled.json"
    },
    "Nidalee:W": {
      "champion": "Nidalee",
      "slot": "W",
      "id": "Bushwhack",
      "name": "Bushwhack / Pounce",
      "description": "In human form, Nidalee lays a trap for unwary opponents that, when sprung, damages and reveals its target. As a cougar, she jumps in a direction, dealing damage in an area where she lands.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Nidalee.json"
    },
    "Pantheon:W": {
      "champion": "Pantheon",
      "slot": "W",
      "id": "PantheonW",
      "name": "Shield Vault",
      "description": "Pantheon dashes to a target, damaging and stunning them.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Pantheon.json"
    },
    "Rek'Sai:E": {
      "champion": "Rek'Sai",
      "slot": "E",
      "id": "RekSaiE",
      "name": "Furious Bite / Tunnel",
      "description": "Rek'Sai bites her target, dealing physical damage, or bonus true damage if she has max Fury. While Burrowed, Rek'Sai creates a re-usable, long lasting tunnel. Enemies can destroy it by standing on top of either entrance.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/RekSai.json"
    },
    "Rell:W": {
      "champion": "Rell",
      "slot": "W",
      "id": "RellW_Dismount",
      "name": "Ferromancy: Crash Down",
      "description": "Mounted: Rell Dismounts, crashing down in her armor, Knocking enemies up and gaining a large Shield. While dismounted, she gains Armor, Magic Resist, Attack Speed, and Attack Range, but is Slowed. Dismounted: Rell forms her Mount, gaining a burst of speed and Knocking Up the next enemy she attacks.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Rell.json"
    },
    "Renekton:E": {
      "champion": "Renekton",
      "slot": "E",
      "id": "RenektonSliceAndDice",
      "name": "Slice and Dice",
      "description": "Renekton dashes, dealing damage to units along the way. Empowered, Renekton deals bonus damage and reduces the Armor of units hit.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Renekton.json"
    },
    "Rengar:P": {
      "champion": "Rengar",
      "slot": "P",
      "id": null,
      "name": "Unseen Predator",
      "description": "While in Brush, Rengar leaps at his target with his basic attack. Rengar generates Ferocity whenever he casts an ability. At Max Ferocity, his next ability is empowered. Killing enemy champions awards trophies on Rengar's Bonetooth Necklace , granting bonus attack damage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Rengar.json"
    },
    "Sejuani:Q": {
      "champion": "Sejuani",
      "slot": "Q",
      "id": "SejuaniQ",
      "name": "Arctic Assault",
      "description": "Sejuani charges forward, knocking enemies into the air. The charge stops after hitting an enemy champion.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Sejuani.json"
    },
    "Shen:E": {
      "champion": "Shen",
      "slot": "E",
      "id": "ShenE",
      "name": "Shadow Dash",
      "description": "Shen dashes in a direction, taunting enemies in his path.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Shen.json"
    },
    "Wukong:E": {
      "champion": "Wukong",
      "slot": "E",
      "id": "MonkeyKingNimbus",
      "name": "Nimbus Strike",
      "description": "Wukong dashes to a targeted enemy and sends out images to attack enemies near his target, dealing damage to each enemy struck.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/MonkeyKing.json"
    },
    "Yone:Q": {
      "champion": "Yone",
      "slot": "Q",
      "id": "YoneQ",
      "name": "Mortal Steel",
      "description": "Thrusts forward, damaging all enemies in a line. On hit, grants a stack of Gathering Storm for a few seconds. At 2 stacks, Mortal Steel dashes Yone forward with a gust of wind knocking enemies Airborne .",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Yone.json"
    },
    "Yone:R": {
      "champion": "Yone",
      "slot": "R",
      "id": "YoneR",
      "name": "Fate Sealed",
      "description": "Yone blinks behind the last champion in a line with a slash so powerful it pulls all enemies hit towards him.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Yone.json"
    },
    "Zaahen:E": {
      "champion": "Zaahen",
      "slot": "E",
      "id": "ZaahenE",
      "name": "Aureate Rush",
      "description": "Zaahen dashes to a location and slices around himself.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Zaahen.json"
    },
    "Darius:W": {
      "champion": "Darius",
      "slot": "W",
      "id": "DariusNoxianTacticsONH",
      "name": "Crippling Strike",
      "description": "Darius's next attack strikes an enemy's crucial artery. As they bleed out, their Move Speed is slowed.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Darius.json"
    },
    "Fiora:E": {
      "champion": "Fiora",
      "slot": "E",
      "id": "FioraE",
      "name": "Bladework",
      "description": "Fiora has increased attack speed for the next two attacks. The first attack slows the target, and the second attack will critically strike.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Fiora.json"
    },
    "Nasus:Q": {
      "champion": "Nasus",
      "slot": "Q",
      "id": "NasusQ",
      "name": "Siphoning Strike",
      "description": "Nasus strikes his foe, dealing damage and increasing the power of his future Siphoning Strikes if he slays his target.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Nasus.json"
    },
    "Sett:Q": {
      "champion": "Sett",
      "slot": "Q",
      "id": "SettQ",
      "name": "Knuckle Down",
      "description": "Sett's next two attacks deal additional damage based off of the target's max health. Sett also gains Move Speed while moving towards enemy champions.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Sett.json"
    },
    "Trundle:Q": {
      "champion": "Trundle",
      "slot": "Q",
      "id": "TrundleTrollSmash",
      "name": "Chomp",
      "description": "Trundle bites his opponent, dealing damage, briefly slowing and sapping some of their Attack Damage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Trundle.json"
    },
    "Volibear:Q": {
      "champion": "Volibear",
      "slot": "Q",
      "id": "VolibearQ",
      "name": "Thundering Smash",
      "description": "Volibear gains speed towards enemies, Stunning and damaging the first one he Attacks.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Volibear.json"
    },
    "Wukong:Q": {
      "champion": "Wukong",
      "slot": "Q",
      "id": "MonkeyKingDoubleAttack",
      "name": "Crushing Blow",
      "description": "Wukong's next attack gains attack range, deals bonus damage, and reduces the target's armor for a few seconds.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/MonkeyKing.json"
    },
    "Xin Zhao:Q": {
      "champion": "Xin Zhao",
      "slot": "Q",
      "id": "XinZhaoQ",
      "name": "Three Talon Strike",
      "description": "Xin Zhao's next 3 standard attacks deal increased damage with the third attack knocking an opponent into the air.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/XinZhao.json"
    },
    "Briar:W": {
      "champion": "Briar",
      "slot": "W",
      "id": "BriarW",
      "name": "Blood Frenzy / Snack Attack",
      "description": "Briar leaps forward and shatters her pillory, entering a Blood Frenzy that causes her to relentlessly pursue the nearest enemy (prioritizing champions). While frenzied, she gains increased Attack Speed and Move Speed, and her attacks deal damage in an area around her target. Briar can reactivate this ability while frenzied to take a CHOMP out of her target on her next attack, dealing additional damage based on their missing Health, and healing Briar based on the damage she deals.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Briar.json"
    },
    "Ornn:R": {
      "champion": "Ornn",
      "slot": "R",
      "id": "OrnnR",
      "name": "Call of the Forge God",
      "description": "Ornn summons a massive elemental at a location which travels toward him with increasing speed. Enemies run over by the elemental take damage, are slowed and are made Brittle. Ornn can recast the ability to charge into the elemental, redirecting it in the direction he hits it, causing the elemental to affect any enemies it runs over to be knocked up, dealing the same damage and re-applying Brittle.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Ornn.json"
    },
    "Sion:Q": {
      "champion": "Sion",
      "slot": "Q",
      "id": "SionQ",
      "name": "Decimating Smash",
      "description": "Sion charges a powerful swing in an area in front of himself that will deal damage to enemies when released. If he charges for enough time, enemies hit by the swing will also be knocked up and stunned.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Sion.json"
    },
    "K'Sante:Q": {
      "champion": "K'Sante",
      "slot": "Q",
      "id": "KSanteQ",
      "name": "Ntofo Strikes",
      "description": "K'Sante strikes, damaging and slowing enemies in a short line. On hit, grants a stack of Ntofo Strikes. At 2 stacks, K'Sante fires a shockwave that pulls enemies in. When All Out, cooldown is reduced.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/KSante.json"
    },
    "Gnar:R": {
      "champion": "Gnar",
      "slot": "R",
      "id": "GnarR",
      "name": "GNAR!",
      "description": "Mega Gnar throws everything around him in a chosen direction, dealing damage and slowing them. Any enemy that hits a wall is stunned and takes bonus damage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Gnar.json"
    },
    "Illaoi:E": {
      "champion": "Illaoi",
      "slot": "E",
      "id": "IllaoiE",
      "name": "Test of Spirit",
      "description": "Illaoi rips the spirit from a foe's body, forcing it to stand before her. Spirits echo a percentage of the damage they take to the original target. If killed, or if the target gets too far from the spirit, the target will become a Vessel and begin spawning Tentacles.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Illaoi.json"
    },
    "Urgot:E": {
      "champion": "Urgot",
      "slot": "E",
      "id": "UrgotE",
      "name": "Disdain",
      "description": "Urgot charges in a direction, shielding himself and trampling non-champion enemies. If he catches an enemy champion, he will stop and hurl them out of his way.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Urgot.json"
    },
    "Kled:Q": {
      "champion": "Kled",
      "slot": "Q",
      "id": "KledQ",
      "name": "Bear Trap on a Rope",
      "description": "Kled throws a bear trap that damages and hooks an enemy champion. If shackled for a short duration, the target takes additional physical damage and is yanked toward Kled. When dismounted, this ability is replaced by Pocket Pistol, a ranged gun blast that knocks back Kled and restores courage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Kled.json"
    },
    "Zaahen:Q": {
      "champion": "Zaahen",
      "slot": "Q",
      "id": "ZaahenQ",
      "name": "The Darkin Glaive",
      "description": "Zaahen slashes twice on his next attack, dealing bonus damage and healing himself. Zaahen can recast this ability to have his next attack deal bonus damage and knock up his target.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Zaahen.json"
    },
    "Amumu:R": {
      "champion": "Amumu",
      "slot": "R",
      "id": "CurseoftheSadMummy",
      "name": "Curse of the Sad Mummy",
      "description": "Amumu entangles surrounding enemy units in bandages, applying his Curse , damaging and stunning them.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Amumu.json"
    },
    "Annie:P": {
      "champion": "Annie",
      "slot": "P",
      "id": null,
      "name": "Pyromania",
      "description": "After casting 4 spells, Annie's next offensive spell will stun the target. Annie begins the game and respawns with Pyromania available.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Annie.json"
    },
    "Annie:R": {
      "champion": "Annie",
      "slot": "R",
      "id": "AnnieR",
      "name": "Summon: Tibbers",
      "description": "Annie wills her bear Tibbers to life, dealing damage to units in the area. Tibbers can attack and also burns enemies that stand near him.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Annie.json"
    },
    "Bard:Q": {
      "champion": "Bard",
      "slot": "Q",
      "id": "BardQ",
      "name": "Cosmic Binding",
      "description": "Bard fires a missile which will slow the first enemy struck, and continue onward. If it strikes a wall, it will stun the initial target; if it strikes another enemy, it will stun them both.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Bard.json"
    },
    "Braum:P": {
      "champion": "Braum",
      "slot": "P",
      "id": null,
      "name": "Concussive Blows",
      "description": "Braum's basic attacks apply Concussive Blows. Once the first stack is applied, ally basic attacks also stack Concussive Blows. Upon reaching 4 stacks, the target is stunned and takes magic damage. For the next few seconds they cannot receive new stacks, but take bonus magic damage from Braum's attacks.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Braum.json"
    },
    "Cho'Gath:Q": {
      "champion": "Cho'Gath",
      "slot": "Q",
      "id": "Rupture",
      "name": "Rupture",
      "description": "Ruptures the ground at target location, popping enemy units into the air, dealing damage and slowing them.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Chogath.json"
    },
    "Fiddlesticks:Q": {
      "champion": "Fiddlesticks",
      "slot": "Q",
      "id": "FiddleSticksQ",
      "name": "Terrify",
      "description": "Fiddlesticks damaging enemies with spells while unseen or targeting an enemy with Terrify's activation strikes a target unit with fear, causing it to flee in terror for a duration.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Fiddlesticks.json"
    },
    "Hwei:E": {
      "champion": "Hwei",
      "slot": "E",
      "id": "HweiE",
      "name": "Subject: Torment",
      "description": "Hwei envisions a series of torments, allowing him to paint controlling visages. This ability replaces Hwei's abilities with crowd control abilities: Grim Visage, Gaze of the Abyss, and Crushing Maw.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Hwei.json"
    },
    "Ivern:Q": {
      "champion": "Ivern",
      "slot": "Q",
      "id": "IvernQ",
      "name": "Rootcaller",
      "description": "Ivern conjures a vine, dealing damage and rooting enemy targets hit. Ivern's allies can dash to the rooted target.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Ivern.json"
    },
    "LeBlanc:E": {
      "champion": "LeBlanc",
      "slot": "E",
      "id": "LeblancE",
      "name": "Ethereal Chains",
      "description": "LeBlanc launches a chain that shackles the first enemy hit. If the target remains shackled for 1.5 seconds, LeBlanc roots them and deals additional damage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Leblanc.json"
    },
    "Lux:Q": {
      "champion": "Lux",
      "slot": "Q",
      "id": "LuxLightBinding",
      "name": "Light Binding",
      "description": "Lux releases a sphere of light that binds and deals damage to up to two enemy units.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Lux.json"
    },
    "Maokai:R": {
      "champion": "Maokai",
      "slot": "R",
      "id": "MaokaiR",
      "name": "Nature's Grasp",
      "description": "Maokai summons a colossal wall of brambles and thorns that slowly advances forwards, damaging and rooting any enemies in the path.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Maokai.json"
    },
    "Mel:E": {
      "champion": "Mel",
      "slot": "E",
      "id": "MelE",
      "name": "Solar Snare",
      "description": "Mel fires a radiant orb forward, rooting those at its center while the area around it slows enemies and deals damage over time.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Mel.json"
    },
    "Mel:W": {
      "champion": "Mel",
      "slot": "W",
      "id": "MelW",
      "name": "Rebuttal",
      "description": "Mel forms a barrier around herself that reflects enemy projectiles back at the attacker, prevents her from taking damage, and grants her movement speed.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Mel.json"
    },
    "Nautilus:R": {
      "champion": "Nautilus",
      "slot": "R",
      "id": "NautilusGrandLine",
      "name": "Depth Charge",
      "description": "Nautilus fires a shockwave into the earth that chases an opponent. This shockwave rips up the earth above it, knocking enemies into the air. When it reaches the opponent, the shockwave erupts, knocking his target into the air and stunning them.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Nautilus.json"
    },
    "Neeko:R": {
      "champion": "Neeko",
      "slot": "R",
      "id": "NeekoR",
      "name": "Pop Blossom",
      "description": "After a short preparation, Neeko leaps into the air, knocking up all nearby enemies. Upon landing, nearby enemies are damaged and stunned. The preparation is hidden if Neeko is disguised.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Neeko.json"
    },
    "Nunu & Willump:W": {
      "champion": "Nunu & Willump",
      "slot": "W",
      "id": "NunuW",
      "name": "Biggest Snowball Ever!",
      "description": "Willump creates a snowball that grows in size and speed as he rolls it. The snowball damages and knocks up enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Nunu.json"
    },
    "Rell:Q": {
      "champion": "Rell",
      "slot": "Q",
      "id": "RellQ",
      "name": "Shattering Strike",
      "description": "Rell deals magic damage to units in a line, breaking their shields and stunning them.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Rell.json"
    },
    "Sejuani:R": {
      "champion": "Sejuani",
      "slot": "R",
      "id": "SejuaniR",
      "name": "Glacial Prison",
      "description": "Sejuani throws her bola that freezes and stuns the first champion hit and creates an ice storm that slows other enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Sejuani.json"
    },
    "Seraphine:R": {
      "champion": "Seraphine",
      "slot": "R",
      "id": "SeraphineR",
      "name": "Encore",
      "description": "Seraphine deals damage and charms enemies hit, refreshing the range with every allied or enemy champion hit.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Seraphine.json"
    },
    "Shaco:W": {
      "champion": "Shaco",
      "slot": "W",
      "id": "JackInTheBox",
      "name": "Jack In The Box",
      "description": "Shaco creates a hidden animated Jack-in-the-Box. When triggered, it will fear and attack nearby enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Shaco.json"
    },
    "Skarner:R": {
      "champion": "Skarner",
      "slot": "R",
      "id": "SkarnerR",
      "name": "Impale",
      "description": "Skarner's tails lash forward to suppress enemy champions. Once suppressed, the victims will be dragged along by Skarner as he moves around.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Skarner.json"
    },
    "Swain:E": {
      "champion": "Swain",
      "slot": "E",
      "id": "SwainE",
      "name": "Nevermove",
      "description": "Swain launches a wave of demonic power forward. It then returns to Swain and roots enemies it hits. Swain can then choose to pull all rooted champions closer. This ability has a shorter cooldown during Demonic Ascension.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Swain.json"
    },
    "Tahm Kench:Q": {
      "champion": "Tahm Kench",
      "slot": "Q",
      "id": "TahmKenchQ",
      "name": "Tongue Lash",
      "description": "Tahm Kench lashes out with his tongue, damaging and slowing the first unit hit and healing himself if he strikes an enemy champion. Applies a stack of An Acquired Taste to enemy champions. If the champion already has 3 stacks of An Acquired Taste , they are stunned and the stacks are consumed.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/TahmKench.json"
    },
    "Taric:E": {
      "champion": "Taric",
      "slot": "E",
      "id": "TaricE",
      "name": "Dazzle",
      "description": "Taric readies a beam of starlight that, after a brief delay, deals magic damage and stuns enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Taric.json"
    },
    "Thresh:Q": {
      "champion": "Thresh",
      "slot": "Q",
      "id": "ThreshQ",
      "name": "Death Sentence",
      "description": "Thresh binds an enemy in chains and pulls them toward him. Activating this ability a second time pulls Thresh to the enemy.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Thresh.json"
    },
    "Zilean:Q": {
      "champion": "Zilean",
      "slot": "Q",
      "id": "ZileanQ",
      "name": "Time Bomb",
      "description": "Tosses a bomb to target area that sticks to units that come near it (prioritizes Champions). It detonates after 3 seconds, dealing area of effect damage. If a Time Bomb is detonated early by another Time Bomb, it also stuns enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Zilean.json"
    },
    "Zoe:E": {
      "champion": "Zoe",
      "slot": "E",
      "id": "ZoeE",
      "name": "Sleepy Trouble Bubble",
      "description": "Causes the target to become drowsy, then fall asleep. While asleep, the target's Magic Resist is reduced. The first source of damage that breaks the sleep is doubled, up to a cap.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Zoe.json"
    },
    "Zyra:E": {
      "champion": "Zyra",
      "slot": "E",
      "id": "ZyraE",
      "name": "Grasping Roots",
      "description": "Zyra sends forth vines through the ground to ensnare her target, dealing damage and rooting enemies they come across. If cast near a seed, Grasping Roots grows a Vine Lasher, whose short range attacks reduce enemy Move Speed.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Zyra.json"
    },
    "Aphelios:R": {
      "champion": "Aphelios",
      "slot": "R",
      "id": "ApheliosR",
      "name": "Moonlight Vigil",
      "description": "Fire a concentrated blast of moonlight that explodes on enemy champions. Applies the unique effect of Aphelios' main-hand gun.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Aphelios.json"
    },
    "Caitlyn:Q": {
      "champion": "Caitlyn",
      "slot": "Q",
      "id": "CaitlynQ",
      "name": "Piltover Peacemaker",
      "description": "Caitlyn revs up her rifle for 1 second to unleash a penetrating shot that deals physical damage (deals less damage to subsequent targets).",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Caitlyn.json"
    },
    "Corki:R": {
      "champion": "Corki",
      "slot": "R",
      "id": "MissileBarrage",
      "name": "Missile Barrage",
      "description": "Corki fires a missile toward his target location that explodes on impact, dealing damage to enemies in an area. Corki stores missiles over time, up to a maximum. Every 3rd missile fired will be a Big One, dealing extra damage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Corki.json"
    },
    "Draven:E": {
      "champion": "Draven",
      "slot": "E",
      "id": "DravenDoubleShot",
      "name": "Stand Aside",
      "description": "Draven throws his axes, dealing physical damage to targets hit and knocking them aside. Targets hit are slowed.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Draven.json"
    },
    "Jinx:W": {
      "champion": "Jinx",
      "slot": "W",
      "id": "JinxW",
      "name": "Zap!",
      "description": "Jinx uses Zapper, her shock pistol, to fire a blast that deals damage to the first enemy hit, slowing and revealing it.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Jinx.json"
    },
    "Kai'Sa:W": {
      "champion": "Kai'Sa",
      "slot": "W",
      "id": "KaisaW",
      "name": "Void Seeker",
      "description": "Kai'Sa shoots a long range missile, marking enemies with her passive. Living Weapon: Void Seeker is upgraded to apply more passive marks and reduce cooldown on champion hit.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Kaisa.json"
    },
    "Kalista:Q": {
      "champion": "Kalista",
      "slot": "Q",
      "id": "KalistaMysticShot",
      "name": "Pierce",
      "description": "Throw a fast moving spear that passes through enemies it kills.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Kalista.json"
    },
    "Kog'Maw:W": {
      "champion": "Kog'Maw",
      "slot": "W",
      "id": "KogMawBioArcaneBarrage",
      "name": "Bio-Arcane Barrage",
      "description": "Kog'Maw's attacks gain range and deal a percent of the target's maximum health as magic damage %i:OnHit% On-Hit .",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/KogMaw.json"
    },
    "Lucian:R": {
      "champion": "Lucian",
      "slot": "R",
      "id": "LucianR",
      "name": "The Culling",
      "description": "Lucian unleashes a torrent of shots from his weapons.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Lucian.json"
    },
    "Samira:R": {
      "champion": "Samira",
      "slot": "R",
      "id": "SamiraR",
      "name": "Inferno Trigger",
      "description": "Samira unleashes a torrent of shots from her weapons, wildly shooting all enemies surrounding her.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Samira.json"
    },
    "Senna:W": {
      "champion": "Senna",
      "slot": "W",
      "id": "SennaW",
      "name": "Last Embrace",
      "description": "Senna sends forth a wave of Black Mist. If it hits an enemy it latches onto them hungrily, rooting them and everything nearby after a brief delay.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Senna.json"
    },
    "Sivir:Q": {
      "champion": "Sivir",
      "slot": "Q",
      "id": "SivirQ",
      "name": "Boomerang Blade",
      "description": "Sivir hurls her crossblade like a boomerang, dealing damage each way.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Sivir.json"
    },
    "Smolder:Q": {
      "champion": "Smolder",
      "slot": "Q",
      "id": "SmolderQ",
      "name": "Super Scorcher Breath",
      "description": "Smolder breathes fire on an enemy. As he gains more stacks, this ability becomes more powerful.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Smolder.json"
    },
    "Tristana:R": {
      "champion": "Tristana",
      "slot": "R",
      "id": "TristanaR",
      "name": "Buster Shot",
      "description": "Tristana loads a massive cannonball into her weapon and fires it at an enemy unit. This deals Magic Damage and knocks the target back. If the target is carrying the Explosive Charge bomb, the bomb detonation radius is doubled.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Tristana.json"
    },
    "Twitch:R": {
      "champion": "Twitch",
      "slot": "R",
      "id": "TwitchFullAutomatic",
      "name": "Spray and Pray",
      "description": "Twitch unleashes the full power of his crossbow, shooting bolts over a great distance that pierce all enemies caught in their path.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Twitch.json"
    },
    "Xayah:E": {
      "champion": "Xayah",
      "slot": "E",
      "id": "XayahE",
      "name": "Bladecaller",
      "description": "Xayah calls back all her dropped Feathers dealing damage and rooting enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Xayah.json"
    },
    "Yunara:W": {
      "champion": "Yunara",
      "slot": "W",
      "id": "YunaraW",
      "name": "Arc of Judgment | Arc of Ruin",
      "description": "Yunara fires a spinning prayer bead that deals damage and slows enemies. While in her Transcendent State she instead fires off a laser that deals damage and slows enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Yunara.json"
    },
    "Yunara:R": {
      "champion": "Yunara",
      "slot": "R",
      "id": "YunaraR",
      "name": "Transcend One's Self",
      "description": "Yunara enters a Transcendent State that upgrades her basic Abilities.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Yunara.json"
    },
    "Zeri:Q": {
      "champion": "Zeri",
      "slot": "Q",
      "id": "ZeriQ",
      "name": "Burst Fire",
      "description": "Burst Fire shoots a burst of 7 rounds that deal attack damage to the first enemy hit. This Ability is treated as an Attack.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Zeri.json"
    },
    "Ziggs:Q": {
      "champion": "Ziggs",
      "slot": "Q",
      "id": "ZiggsQ",
      "name": "Bouncing Bomb",
      "description": "Ziggs throws a bouncing bomb that deals magic damage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Ziggs.json"
    },
    "Syndra:R": {
      "champion": "Syndra",
      "slot": "R",
      "id": "SyndraR",
      "name": "Unleashed Power",
      "description": "Syndra bombards an enemy Champion with all of her Dark Spheres.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Syndra.json"
    },
    "Vel'Koz:Q": {
      "champion": "Vel'Koz",
      "slot": "Q",
      "id": "VelkozQ",
      "name": "Plasma Fission",
      "description": "Vel'Koz shoots a bolt of plasma that splits in two on reactivation or upon hitting an enemy. The bolt slows and damages on hit.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Velkoz.json"
    },
    "Xerath:E": {
      "champion": "Xerath",
      "slot": "E",
      "id": "XerathMageSpear",
      "name": "Shocking Orb",
      "description": "Deals magic damage to an enemy and stuns them.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Xerath.json"
    },
    "Aurora:Q": {
      "champion": "Aurora",
      "slot": "Q",
      "id": "AuroraQ",
      "name": "Twofold Hex",
      "description": "Aurora sends out a missile that curses any enemies it hits. She can then recast the ability to draw active curses back toward herself, damaging foes who are hit along the way.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Aurora.json"
    },
    "Locke:P": {
      "champion": "Locke",
      "slot": "P",
      "id": null,
      "name": "Silver Stake",
      "description": "Locke's attacks deal additional magic damage On-Hit, increased based on enemy missing Health.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Locke.json"
    },
    "Shyvana:Q": {
      "champion": "Shyvana",
      "slot": "Q",
      "id": "ShyvanaQ",
      "name": "Emberstrike",
      "description": "Shyvana's next attack strikes both the target and the surrounding area. This Ability can be recast. While in Dragon Form, it gains an additional recast, dealing massive damage to a single target.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Shyvana.json"
    },
    "Udyr:Q": {
      "champion": "Udyr",
      "slot": "Q",
      "id": "UdyrQ",
      "name": "Wilding Claw",
      "description": "Udyr gains attack speed and his next two attacks deal bonus physical damage. Recast: Gain even more attack speed, and the next two attacks call lightning to strike the target.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Udyr.json"
    },
    "Warwick:P": {
      "champion": "Warwick",
      "slot": "P",
      "id": null,
      "name": "Eternal Hunger",
      "description": "Warwick's basic attacks deal bonus magic damage. If Warwick is below 50% health, he heals the same amount. If Warwick is below 25% health, this healing triples.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Warwick.json"
    },
    "Twisted Fate:W": {
      "champion": "Twisted Fate",
      "slot": "W",
      "id": "PickACard",
      "name": "Pick a Card",
      "description": "Twisted Fate chooses a magic card from his deck, and uses that for his next attack, causing bonus effects.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/TwistedFate.json"
    },
    "Talon:Q": {
      "champion": "Talon",
      "slot": "Q",
      "id": "TalonQ",
      "name": "Noxian Diplomacy",
      "description": "Talon stabs the target unit. If they are within melee range, this attack deals critical damage. If they are outside melee range, Talon will leap at his target before stabbing them. Talon refunds some health and cooldown if this ability kills the target.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Talon.json"
    },
    "Talon:R": {
      "champion": "Talon",
      "slot": "R",
      "id": "TalonR",
      "name": "Shadow Assault",
      "description": "Talon disperses a ring of blades and becomes Invisible while gaining additional Move Speed. When Talon emerges from Invisibility, the blades converge on his location. Each time the blades move, Shadow Assault deals physical damage to enemies hit by at least one blade.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Talon.json"
    },
    "Viego:W": {
      "champion": "Viego",
      "slot": "W",
      "id": "ViegoW",
      "name": "Spectral Maw",
      "description": "Viego charges up before dashing forward, releasing a ball of concentrated Black Mist that stuns the first enemy hit.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Viego.json"
    },
    "Viego:R": {
      "champion": "Viego",
      "slot": "R",
      "id": "ViegoR",
      "name": "Heartbreaker",
      "description": "Viego teleports to a nearby location and executes an enemy champion on arrival, piercing their heart and causing a destructive shockwave around them that knocks away their allies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Viego.json"
    },
    "Qiyana:E": {
      "champion": "Qiyana",
      "slot": "E",
      "id": "QiyanaE",
      "name": "Audacity",
      "description": "Qiyana dashes to an enemy, damaging them.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Qiyana.json"
    },
    "Qiyana:R": {
      "champion": "Qiyana",
      "slot": "R",
      "id": "QiyanaR",
      "name": "Supreme Display of Talent",
      "description": "Qiyana sends out a shockwave that detonates whatever elements she hits with it, stunning and damaging nearby enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Qiyana.json"
    },
    "Azir:E": {
      "champion": "Azir",
      "slot": "E",
      "id": "AzirEWrapper",
      "name": "Shifting Sands",
      "description": "Azir shields himself briefly and dashes to one of his Sand Soldiers, damaging enemies. If he hits an enemy champion, he instantly readies a new Sand Soldier for deployment and halts his dash.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Azir.json"
    },
    "Naafiri:R": {
      "champion": "Naafiri",
      "slot": "R",
      "id": "NaafiriW",
      "name": "Hounds' Pursuit",
      "description": "Naafiri and her packmates dash at a champion, dealing damage. Naafiri reveals nearby enemies if she scores a takedown and can recast this Ability once. The second cast grants a shield.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Naafiri.json"
    },
    "Aurelion Sol:Q": {
      "champion": "Aurelion Sol",
      "slot": "Q",
      "id": "AurelionSolQ",
      "name": "Breath of Light",
      "description": "Aurelion Sol channels his dragon breath for a few seconds, damaging the first enemy hit and splashing reduced damage onto nearby enemies. Each second the breath is channeled directly at an enemy will deal bonus damage, which is improved by the amount of Stardust that's been collected. This ability collects Stardust if the target is a champion.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/AurelionSol.json"
    },
    "Kayle:E": {
      "champion": "Kayle",
      "slot": "E",
      "id": "KayleE",
      "name": "Starfire Spellblade",
      "description": "Passive: Kayle's celestial sword, Virtue, deals bonus magic damage to enemies she attacks. Active: Kayle's next attack smites her target with celestial fire, dealing bonus damage proportionate to their missing health.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Kayle.json"
    },
    "Kayle:R": {
      "champion": "Kayle",
      "slot": "R",
      "id": "KayleR",
      "name": "Divine Judgment",
      "description": "Kayle makes an ally invulnerable and calls upon former Aspects of Justice to purify the area around her target with a holy rain of swords.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Kayle.json"
    },
    "Akshan:P": {
      "champion": "Akshan",
      "slot": "P",
      "id": null,
      "name": "Dirty Fighting",
      "description": "Every three hits from Akshan's Attacks and Abilities deals bonus damage and grants him a Shield if the target was a champion. When Akshan Attacks, he fires an additional Attack for reduced damage. If he cancels the additional Attack, he instead gains Move Speed.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Akshan.json"
    },
    "Gnar:Q": {
      "champion": "Gnar",
      "slot": "Q",
      "id": "GnarQ",
      "name": "Boomerang Throw / Boulder Toss",
      "description": "Gnar throws a boomerang that damages and slows enemies it hits before returning to him. If he catches the boomerang its cooldown is reduced. Mega Gnar instead throws a boulder that stops on the first unit hit, damaging and slowing everything nearby. It can then be picked up to reduce the cooldown.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Gnar.json"
    },
    "Gnar:P": {
      "champion": "Gnar",
      "slot": "P",
      "id": null,
      "name": "Rage Gene",
      "description": "While in combat Gnar generates Rage. At maximum Rage his next ability will transform him into Mega Gnar, granting increased survivability and access to new spells.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Gnar.json"
    },
    "Master Yi:Q": {
      "champion": "Master Yi",
      "slot": "Q",
      "id": "AlphaStrike",
      "name": "Alpha Strike",
      "description": "Master Yi teleports across the battlefield with blinding speed, dealing physical damage to multiple units in his path, while simultaneously becoming untargetable. Alpha Strike can critically strike and deals bonus physical damage to monsters. Basic attacks reduce Alpha Strike's cooldown.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/MasterYi.json"
    },
    "Amumu:Q": {
      "champion": "Amumu",
      "slot": "Q",
      "id": "BandageToss",
      "name": "Bandage Toss",
      "description": "Amumu tosses a sticky bandage at a target, stunning and damaging the target while he pulls himself to them.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Amumu.json"
    },
    "Anivia:Q": {
      "champion": "Anivia",
      "slot": "Q",
      "id": "FlashFrost",
      "name": "Flash Frost",
      "description": "Anivia brings her wings together and summons a sphere of ice that flies towards her opponents, chilling and damaging anyone in its path. When the sphere explodes it does moderate damage in a radius, stunning anyone in the area.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Anivia.json"
    },
    "Anivia:R": {
      "champion": "Anivia",
      "slot": "R",
      "id": "GlacialStorm",
      "name": "Glacial Storm",
      "description": "Anivia summons a driving rain of ice and hail to damage her enemies and slow their advance.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Anivia.json"
    },
    "Annie:Q": {
      "champion": "Annie",
      "slot": "Q",
      "id": "AnnieQ",
      "name": "Disintegrate",
      "description": "Annie hurls a Mana infused fireball, dealing damage and refunding the Mana cost if it destroys the target.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Annie.json"
    },
    "Aphelios:Q": {
      "champion": "Aphelios",
      "slot": "Q",
      "id": "ApheliosQ_ClientTooltipWrapper",
      "name": "Weapon Abilites",
      "description": "Aphelios has 5 different activated abilities, based on his main-hand weapon: Calibrum (Rifle): Long range shot that marks its target for a long-range follow-up attack. Severum (Scythe Pistol): Run fast while attacking nearby enemies with both weapons. Gravitum (Cannon): Root all enemies slowed by this weapon. Infernum (Flamethrower): Blast enemies in a cone and attack them with your off-hand weapon. Crescendum (Chakram): Deploy a sentry that shoots your off-hand weapon.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Aphelios.json"
    },
    "Vayne:Q": {
      "champion": "Vayne",
      "slot": "Q",
      "id": "VayneTumble",
      "name": "Tumble",
      "description": "Vayne tumbles, maneuvering to carefully place her next shot. Her next attack deals bonus damage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Vayne.json"
    },
    "Aphelios:P": {
      "champion": "Aphelios",
      "slot": "P",
      "id": null,
      "name": "The Hitman and the Seer",
      "description": "Aphelios wields 5 Lunari Weapons made by his sister Alune. He has access to two at a time: one main-hand and one off-hand. Each weapon has a unique Basic Attack and Ability. Attacks and abilities consume a weapon's ammo. When out of ammo, Aphelios discards the weapon and Alune summons the next of the 5.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Aphelios.json"
    },
    "Kalista:P": {
      "champion": "Kalista",
      "slot": "P",
      "id": null,
      "name": "Martial Poise",
      "description": "Enter a movement command while winding up Kalista's basic attack or Pierce to lunge a short distance when she launches her attack.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Kalista.json"
    },
    "Heimerdinger:Q": {
      "champion": "Heimerdinger",
      "slot": "Q",
      "id": "HeimerdingerQ",
      "name": "H-28 G Evolution Turret",
      "description": "Heimerdinger lays down a rapid-fire cannon turret equipped with a secondary pass-through beam attack (turrets deal half damage to towers).",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Heimerdinger.json"
    },
    "Heimerdinger:E": {
      "champion": "Heimerdinger",
      "slot": "E",
      "id": "HeimerdingerE",
      "name": "CH-2 Electron Storm Grenade",
      "description": "Heimerdinger lobs a grenade at a location, dealing damage to enemy units, as well as stunning anyone directly hit and slowing surrounding units.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Heimerdinger.json"
    },
    "Aurora:W": {
      "champion": "Aurora",
      "slot": "W",
      "id": "AuroraW",
      "name": "Across the Veil",
      "description": "Aurora leaps in a direction of her choosing, entering the spirit realm upon landing, becoming invisible, and gaining Move Speed for a short duration of time.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Aurora.json"
    },
    "Garen:E": {
      "champion": "Garen",
      "slot": "E",
      "id": "GarenE",
      "name": "Judgment",
      "description": "Garen rapidly spins his sword around his body, dealing physical damage to nearby enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Garen.json"
    },
    "Azir:R": {
      "champion": "Azir",
      "slot": "R",
      "id": "AzirR",
      "name": "Emperor's Divide",
      "description": "Azir summons a wall of soldiers which charge forward, knocking back and damaging enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Azir.json"
    },
    "Azir:W": {
      "champion": "Azir",
      "slot": "W",
      "id": "AzirW",
      "name": "Arise!",
      "description": "Azir summons a Sand Soldier to attack nearby targets for him, replacing his basic attack against targets within the soldier's range. Their attacks deal magic damage to enemies in a line.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Azir.json"
    },
    "Bard:R": {
      "champion": "Bard",
      "slot": "R",
      "id": "BardR",
      "name": "Tempered Fate",
      "description": "Bard sends spirit energy arcing to a location, putting all champions, minions, monsters, and turrets hit into stasis for a brief time.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Bard.json"
    },
    "Taric:R": {
      "champion": "Taric",
      "slot": "R",
      "id": "TaricR",
      "name": "Cosmic Radiance",
      "description": "Pulses cosmic energy onto nearby allied champions after a delay, making them invulnerable for a short duration.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Taric.json"
    },
    "Bel'Veth:E": {
      "champion": "Bel'Veth",
      "slot": "E",
      "id": "BelvethE",
      "name": "Royal Maelstrom",
      "description": "Bel'Veth roots herself in place, channeling a storm of slashes around her that targets the lowest-health enemy and grants her lifesteal and damage reduction.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Belveth.json"
    },
    "Karthus:E": {
      "champion": "Karthus",
      "slot": "E",
      "id": "KarthusDefile",
      "name": "Defile",
      "description": "Karthus passively steals energy from his victims, gaining Mana on each kill. Alternatively, Karthus can surround himself in the souls of his prey, dealing damage to nearby enemies, but quickly draining his own Mana.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Karthus.json"
    },
    "Lulu:E": {
      "champion": "Lulu",
      "slot": "E",
      "id": "LuluE",
      "name": "Help, Pix!",
      "description": "If cast on an ally, commands Pix to jump to an ally and shield them. He then follows them and aids their attacks. If cast on an enemy, commands Pix to jump to an enemy and damage them. He then follows them and grants you vision of that enemy.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Lulu.json"
    },
    "Blitzcrank:E": {
      "champion": "Blitzcrank",
      "slot": "E",
      "id": "PowerFist",
      "name": "Power Fist",
      "description": "Blitzcrank charges up their fist to make the next attack deal double damage and pop their target up in the air.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Blitzcrank.json"
    },
    "Brand:P": {
      "champion": "Brand",
      "slot": "P",
      "id": null,
      "name": "Blaze",
      "description": "Brand's spells light his targets ablaze, dealing damage over 4 seconds, stacking up to 3 times. If Brand kills an enemy while it is ablaze he regains mana. When Blaze reaches max stacks on a Champion or large monster, it becomes unstable. It detonates in 2 seconds, applying spell effects and dealing massive damage in an area around the victim.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Brand.json"
    },
    "Zac:P": {
      "champion": "Zac",
      "slot": "P",
      "id": null,
      "name": "Cell Division",
      "description": "Each time Zac hits an enemy with an ability, he sheds a chunk of himself that can be reabsorbed to restore Health. Upon taking fatal damage, Zac splits into 4 bloblets that attempt to recombine. If any bloblets remain, he will revive with an amount of Health depending on the Health of the surviving bloblets. Each bloblet has a percentage of Zac's maximum Health, Armor and Magic Resistance. This ability has a 5 minute cooldown.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Zac.json"
    },
    "Brand:Q": {
      "champion": "Brand",
      "slot": "Q",
      "id": "BrandQ",
      "name": "Sear",
      "description": "Brand launches a ball of fire forward that deals magic damage. If the target is ablaze, Sear will stun the target.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Brand.json"
    },
    "Briar:Q": {
      "champion": "Briar",
      "slot": "Q",
      "id": "BriarQ",
      "name": "Head Rush",
      "description": "Briar leaps to a unit and hits enemies with The Heel Wheel (of Pain), stunning them and breaking their Armor.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Briar.json"
    },
    "Lillia:Q": {
      "champion": "Lillia",
      "slot": "Q",
      "id": "LilliaQ",
      "name": "Blooming Blows",
      "description": "Passively, Lillia gains stacking Move Speed when hitting enemies with spells. She can activate this to deal magic damage to nearby enemies, dealing extra true damage on the edge.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Lillia.json"
    },
    "Lillia:R": {
      "champion": "Lillia",
      "slot": "R",
      "id": "LilliaR",
      "name": "Lilting Lullaby",
      "description": "Lillia causes all enemies with Dream Dust on them to become Drowsy before falling asleep. Those enemies will take extra damage on being forcibly woken up.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Lillia.json"
    },
    "Caitlyn:W": {
      "champion": "Caitlyn",
      "slot": "W",
      "id": "CaitlynW",
      "name": "Yordle Snap Trap",
      "description": "Caitlyn sets a trap that, when sprung, reveals and immobilizes the enemy champion for 1.5 seconds, granting Caitlyn an empowered Headshot.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Caitlyn.json"
    },
    "Nilah:W": {
      "champion": "Nilah",
      "slot": "W",
      "id": "NilahW",
      "name": "Jubilant Veil",
      "description": "Nilah envelops herself in mist, increasing her movement speed and allowing her to gracefully dodge all incoming attacks. Any allies she touches during the mist's duration will also gain this effect.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Nilah.json"
    },
    "K'Sante:W": {
      "champion": "K'Sante",
      "slot": "W",
      "id": "KSanteW",
      "name": "Path Maker",
      "description": "K'Sante charges up, taking reduced damage, then dashes, knocking back and stunning enemies. When All Out, deals increased damage and no longer knocks back or stuns.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/KSante.json"
    },
    "Camille:P": {
      "champion": "Camille",
      "slot": "P",
      "id": null,
      "name": "Adaptive Defenses",
      "description": "Basic attacks on champions grant a shield equal to a percentage of Camille's maximum health against their damage type (Physical or Magic) for a brief duration.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Camille.json"
    },
    "K'Sante:R": {
      "champion": "K'Sante",
      "slot": "R",
      "id": "KSanteR",
      "name": "All Out",
      "description": "K'Sante knocks an enemy back, launching them through any wall in their path. Then, K'Sante goes All Out and dashes after them, gaining increased damage, healing, and transformed abilities at the cost of reduced defenses.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/KSante.json"
    },
    "Cho'Gath:W": {
      "champion": "Cho'Gath",
      "slot": "W",
      "id": "FeralScream",
      "name": "Feral Scream",
      "description": "Cho'Gath unleashes a terrible scream at enemies in a cone, dealing magic damage and Silencing enemies for a few seconds.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Chogath.json"
    },
    "Corki:P": {
      "champion": "Corki",
      "slot": "P",
      "id": null,
      "name": "Hextech Munitions",
      "description": "A percentage of Corki's basic attack damage is dealt as bonus true damage .",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Corki.json"
    },
    "Corki:W": {
      "champion": "Corki",
      "slot": "W",
      "id": "CarpetBomb",
      "name": "Valkyrie",
      "description": "Corki flies a short distance, dropping bombs that create a trail of fire that damages opponents who remain in it.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Corki.json"
    },
    "Darius:P": {
      "champion": "Darius",
      "slot": "P",
      "id": null,
      "name": "Hemorrhage",
      "description": "Darius' attacks and damaging abilities cause enemies to bleed for physical damage over 5 seconds, stacking up to 5 times. Darius enrages and gains massive Attack Damage when his target reaches max stacks.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Darius.json"
    },
    "Sion:W": {
      "champion": "Sion",
      "slot": "W",
      "id": "SionW",
      "name": "Soul Furnace",
      "description": "Sion shields himself and can reactivate after 3 seconds to deal Magic Damage to enemies nearby. When Sion kills enemies, he passively gains maximum Health.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Sion.json"
    },
    "Diana:R": {
      "champion": "Diana",
      "slot": "R",
      "id": "DianaR",
      "name": "Moonfall",
      "description": "Diana reveals and draws in all nearby enemies and slows them. If Diana pulls in one or more enemy champions, the moonlight crashes down onto her after a short delay, dealing magic damage in an area around her, increased for each target beyond the first pulled.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Diana.json"
    },
    "Kindred:Q": {
      "champion": "Kindred",
      "slot": "Q",
      "id": "KindredQ",
      "name": "Dance of Arrows",
      "description": "Kindred tumbles and shoots up to three arrows at nearby targets.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Kindred.json"
    },
    "Diana:P": {
      "champion": "Diana",
      "slot": "P",
      "id": null,
      "name": "Moonsilver Blade",
      "description": "Every third strike cleaves nearby enemies for an additional magic damage. After casting a spell, Diana gains Attack Speed for 5 seconds.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Diana.json"
    },
    "Dr. Mundo:P": {
      "champion": "Dr. Mundo",
      "slot": "P",
      "id": null,
      "name": "Goes Where He Pleases",
      "description": "Dr. Mundo resists the first Immobilizing effect that hits him, instead losing Health and dropping a chemical cannister nearby. Dr. Mundo can pick it up by walking over it, restoring Health and reducing this Ability's Cooldown. Dr. Mundo also has significantly increased Health regeneration.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/DrMundo.json"
    },
    "Maokai:W": {
      "champion": "Maokai",
      "slot": "W",
      "id": "MaokaiW",
      "name": "Twisted Advance",
      "description": "Maokai contorts into a mass of moving roots, becoming untargetable and dashing to the target. Upon arrival, he roots the target.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Maokai.json"
    },
    "Smolder:E": {
      "champion": "Smolder",
      "slot": "E",
      "id": "SmolderE",
      "name": "Flap, Flap, Flap",
      "description": "Smolder takes flight ignoring terrain and bombarding the lowest health enemy.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Smolder.json"
    },
    "Ekko:R": {
      "champion": "Ekko",
      "slot": "R",
      "id": "EkkoR",
      "name": "Chronobreak",
      "description": "Ekko shatters his timeline, becoming untargetable and rewinding to a more favorable point in time. He returns to whenever he was a few seconds ago, and heals for a percentage of the damage received in that duration. Enemies near his arrival zone take massive damage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Ekko.json"
    },
    "Elise:E": {
      "champion": "Elise",
      "slot": "E",
      "id": "EliseHumanE",
      "name": "Cocoon / Rappel",
      "description": "Human Form: Stuns the first enemy unit hit and reveals them if they are not stealthed. Spider Form: Elise and her Spiderlings ascend into the air and then descend upon target enemy. After descending on an enemy target, Elise's bonus damage and healing from Spider Queen is increased.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Elise.json"
    },
    "Elise:R": {
      "champion": "Elise",
      "slot": "R",
      "id": "EliseR",
      "name": "Spider Form",
      "description": "Transforms into a menacing spider, reducing her attack range in exchange for Move Speed, new abilities, and a Spiderling swarm that will attack her foes.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Elise.json"
    },
    "Evelynn:R": {
      "champion": "Evelynn",
      "slot": "R",
      "id": "EvelynnR",
      "name": "Last Caress",
      "description": "Evelynn briefly goes untargetable and decimates the area in front of her before warping backwards a long distance.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Evelynn.json"
    },
    "Fiddlesticks:E": {
      "champion": "Fiddlesticks",
      "slot": "E",
      "id": "FiddleSticksE",
      "name": "Reap",
      "description": "Fiddlesticks slashes an area with its scythe, slowing all enemies hit and silencing enemies hit in the center of the slash.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Fiddlesticks.json"
    },
    "Nunu & Willump:R": {
      "champion": "Nunu & Willump",
      "slot": "R",
      "id": "NunuR",
      "name": "Absolute Zero",
      "description": "Nunu & Willump create a powerful blizzard in an area that slows enemies and deals massive damage at the end.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Nunu.json"
    },
    "Fizz:E": {
      "champion": "Fizz",
      "slot": "E",
      "id": "FizzE",
      "name": "Playful / Trickster",
      "description": "Fizz hops into the air, landing gracefully upon his spear and becoming untargetable. From this position, Fizz can either slam the ground or choose to jump again before smashing back down.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Fizz.json"
    },
    "Gangplank:W": {
      "champion": "Gangplank",
      "slot": "W",
      "id": "GangplankW",
      "name": "Remove Scurvy",
      "description": "Eats citrus to cure crowd control effects and restore Health.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Gangplank.json"
    },
    "Gnar:E": {
      "champion": "Gnar",
      "slot": "E",
      "id": "GnarE",
      "name": "Hop / Crunch",
      "description": "Gnar leaps to a location and bounces off the head of any unit he lands on, traveling further. Mega Gnar is too large to bounce and instead lands with earth-shattering force, dealing damage in an area around him.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Gnar.json"
    },
    "Gnar:W": {
      "champion": "Gnar",
      "slot": "W",
      "id": "GnarW",
      "name": "Hyper / Wallop",
      "description": "Gnar's attacks and spells hype him up, dealing bonus damage and granting him Move Speed. Mega Gnar is too enraged to be hyper and instead can rear up on his hind legs and smash down on the area in front of him, stunning enemies in an area.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Gnar.json"
    },
    "Graves:W": {
      "champion": "Graves",
      "slot": "W",
      "id": "GravesSmokeGrenade",
      "name": "Smoke Screen",
      "description": "Graves fires a smoke canister at the target area creating a cloud of smoke that reduces sight range. Enemies caught in the initial impact are dealt magic damage and have their Move Speed reduced briefly.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Graves.json"
    },
    "Singed:E": {
      "champion": "Singed",
      "slot": "E",
      "id": "Fling",
      "name": "Fling",
      "description": "Damages target enemy unit and flings them into the air behind Singed. If the target Singed flings lands in his Mega Adhesive, they are also rooted.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Singed.json"
    },
    "Vel'Koz:R": {
      "champion": "Vel'Koz",
      "slot": "R",
      "id": "VelkozR",
      "name": "Life Form Disintegration Ray",
      "description": "Vel'Koz unleashes a channelled beam that follows the cursor for 2.5 seconds that deals magic damage. Organic Deconstruction Researches enemy champions causing them to take true damage instead.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Velkoz.json"
    },
    "Ornn:W": {
      "champion": "Ornn",
      "slot": "W",
      "id": "OrnnW",
      "name": "Bellows Breath",
      "description": "Ornn advances, breathing fire. Enemies hit by the final gout of flame become Brittle.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Ornn.json"
    },
    "Illaoi:P": {
      "champion": "Illaoi",
      "slot": "P",
      "id": null,
      "name": "Prophet of an Elder God",
      "description": "Illaoi and the Vessels she creates spawn Tentacles on nearby impassible terrain. Tentacles swing at spirits, Vessels , and victims of Illaoi's Harsh lesson. Tentacles deal physical damage to enemies hit, and will heal Illaoi if they damage a champion.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Illaoi.json"
    },
    "Yorick:P": {
      "champion": "Yorick",
      "slot": "P",
      "id": null,
      "name": "Shepherd of Souls",
      "description": "The Cursed Horde: Yorick can summon Mist Walkers to swarm and attack nearby enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Yorick.json"
    },
    "Irelia:P": {
      "champion": "Irelia",
      "slot": "P",
      "id": null,
      "name": "Ionian Fervor",
      "description": "When Irelia strikes enemies with spells she gains stacking bonus Attack Speed. At maximum stacks she also gains bonus damage on hit.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Irelia.json"
    },
    "Yorick:W": {
      "champion": "Yorick",
      "slot": "W",
      "id": "YorickW",
      "name": "Dark Procession",
      "description": "Yorick summons a destructible wall at target location that will block enemy movement.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Yorick.json"
    },
    "Yorick:R": {
      "champion": "Yorick",
      "slot": "R",
      "id": "YorickR",
      "name": "Eulogy of the Isles",
      "description": "Yorick summons the Maiden of the Mist that causes Yorick's attacks against the Maiden's target to deal bonus damage. The Maiden will also automatically raise Walkers from dead enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Yorick.json"
    },
    "Ivern:R": {
      "champion": "Ivern",
      "slot": "R",
      "id": "IvernR",
      "name": "Daisy!",
      "description": "Ivern summons his Sentinel friend Daisy to fight with him. Re-cast command Daisy to attack or move.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Ivern.json"
    },
    "Kha'Zix:Q": {
      "champion": "Kha'Zix",
      "slot": "Q",
      "id": "KhazixQ",
      "name": "Taste Their Fear",
      "description": "Deals physical damage to the target. Damage increased on Isolated targets. If he chooses to Evolve Reaper Claws , this refunds a percent of it's cooldown against Isolated targets. Kha'Zix also gains increased range on his basic attacks and Taste Their Fear.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Khazix.json"
    },
    "Ivern:E": {
      "champion": "Ivern",
      "slot": "E",
      "id": "IvernE",
      "name": "Triggerseed",
      "description": "Ivern places a shield on an ally which explodes after a short duration slowing and damaging enemies. The shield refreshes if it hits no enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Ivern.json"
    },
    "Olaf:R": {
      "champion": "Olaf",
      "slot": "R",
      "id": "OlafRagnarok",
      "name": "Ragnarok",
      "description": "Olaf passively gains increased armor and magic resist. He can activate this ability to become immune to disables for as long as he keeps attacking.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Olaf.json"
    },
    "Jarvan IV:E": {
      "champion": "Jarvan IV",
      "slot": "E",
      "id": "JarvanIVDemacianStandard",
      "name": "Demacian Standard",
      "description": "Jarvan IV carries the pride of Demacia, passively granting him bonus Attack Speed. Activating Demacian Standard allows Jarvan IV to place a Demacian flag that deals magic damage on impact and grants Attack Speed to nearby allied champions.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/JarvanIV.json"
    },
    "Jayce:E": {
      "champion": "Jayce",
      "slot": "E",
      "id": "JayceThunderingBlow",
      "name": "Thundering Blow / Acceleration Gate",
      "description": "Hammer Stance: Deals magic damage to an enemy and knocks them back a short distance. Cannon Stance: Deploys an Acceleration Gate increasing the Move Speed of all allied champions who pass through it. If Shock Blast is fired through the gate the missile speed, range, and damage will increase.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Jayce.json"
    },
    "Jayce:R": {
      "champion": "Jayce",
      "slot": "R",
      "id": "JayceStanceHtG",
      "name": "Mercury Cannon / Mercury Hammer",
      "description": "Hammer Stance: Transforms the Mercury Hammer into the Mercury Cannon gaining new abilities and increased range. The first attack in this form reduces the target's Armor and Magic Resist. Cannon Stance: Transforms the Mercury Cannon into the Mercury Hammer gaining new abilities and increasing Armor and Magic Resist. The first attack in this form deals additional magic damage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Jayce.json"
    },
    "Jinx:E": {
      "champion": "Jinx",
      "slot": "E",
      "id": "JinxE",
      "name": "Flame Chompers!",
      "description": "Jinx throws out a line of snare grenades that explode after 5 seconds, lighting enemies on fire. Flame Chompers will bite enemy champions who walk over them, rooting them in place.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Jinx.json"
    },
    "Kai'Sa:R": {
      "champion": "Kai'Sa",
      "slot": "R",
      "id": "KaisaR",
      "name": "Killer Instinct",
      "description": "Kai'Sa dashes near an enemy champion.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Kaisa.json"
    },
    "Kog'Maw:R": {
      "champion": "Kog'Maw",
      "slot": "R",
      "id": "KogMawLivingArtillery",
      "name": "Living Artillery",
      "description": "Kog'Maw fires an artillery shell at a great distance dealing magic damage (increased significantly on low health enemies) and revealing non-stealthed targets. Additionally, multiple Living Artilleries in a short period of time cause them to cost additional Mana.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/KogMaw.json"
    },
    "Kai'Sa:P": {
      "champion": "Kai'Sa",
      "slot": "P",
      "id": null,
      "name": "Second Skin",
      "description": "Kai'Sa's basic attacks stack Plasma, dealing increasing bonus magic damage. Allies' immobilizing effects help stack Plasma. Additionally, Kai'Sa's item purchases upgrade her basic spells to have more powerful properties.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Kaisa.json"
    },
    "Kalista:E": {
      "champion": "Kalista",
      "slot": "E",
      "id": "KalistaExpungeWrapper",
      "name": "Rend",
      "description": "Attacks impale their targets with spears. Activate to rip the spears out, slowing and dealing escalating damage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Kalista.json"
    },
    "Karma:E": {
      "champion": "Karma",
      "slot": "E",
      "id": "KarmaSolKimShield",
      "name": "Inspire",
      "description": "Karma summons a protective shield that absorbs incoming damage and increases the Move Speed of the protected ally. Mantra Bonus: Energy radiates out from her target, strengthening the initial shield and applying Inspire to nearby allied champions.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Karma.json"
    },
    "Karma:W": {
      "champion": "Karma",
      "slot": "W",
      "id": "KarmaSpiritBind",
      "name": "Focused Resolve",
      "description": "Karma creates a tether between herself and a targeted enemy, dealing damage and revealing them. If the tether is not broken, the enemy will be rooted and damaged again. Mantra Bonus: Karma strengthens the link, healing herself and extending the root duration.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Karma.json"
    },
    "Leona:R": {
      "champion": "Leona",
      "slot": "R",
      "id": "LeonaSolarFlare",
      "name": "Solar Flare",
      "description": "Leona calls down a beam of solar energy, dealing damage to enemies in an area. Enemies in the center of the area are stunned, while enemies on the outside are slowed.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Leona.json"
    },
    "Karthus:Q": {
      "champion": "Karthus",
      "slot": "Q",
      "id": "KarthusLayWasteA1",
      "name": "Lay Waste",
      "description": "Karthus unleashes a delayed blast at a location, dealing damage to nearby enemies. Deals increased damage to isolated enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Karthus.json"
    },
    "Katarina:E": {
      "champion": "Katarina",
      "slot": "E",
      "id": "KatarinaEWrapper",
      "name": "Shunpo",
      "description": "Katarina blinks to the target, striking it if its an enemy, or striking the nearest enemy otherwise.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Katarina.json"
    },
    "Garen:R": {
      "champion": "Garen",
      "slot": "R",
      "id": "GarenR",
      "name": "Demacian Justice",
      "description": "Garen calls upon the might of Demacia to attempt to execute an enemy champion.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Garen.json"
    },
    "Kayn:R": {
      "champion": "Kayn",
      "slot": "R",
      "id": "KaynR",
      "name": "Umbral Trespass",
      "description": "Kayn hides in an enemy's body, dealing massive damage when he bursts out.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Kayn.json"
    },
    "Kennen:R": {
      "champion": "Kennen",
      "slot": "R",
      "id": "KennenShurikenStorm",
      "name": "Slicing Maelstrom",
      "description": "Kennen summons a storm that strikes at nearby enemy champions for magical damage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Kennen.json"
    },
    "Kennen:P": {
      "champion": "Kennen",
      "slot": "P",
      "id": null,
      "name": "Mark of the Storm",
      "description": "Kennen stuns enemies he hits 3 times with his abilities.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Kennen.json"
    },
    "Kennen:Q": {
      "champion": "Kennen",
      "slot": "Q",
      "id": "KennenShurikenHurlMissile1",
      "name": "Thundering Shuriken",
      "description": "Kennen throws a fast moving shuriken towards a location, causing damage and adding a Mark of the Storm to any opponent that it hits.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Kennen.json"
    },
    "Kha'Zix:R": {
      "champion": "Kha'Zix",
      "slot": "R",
      "id": "KhazixR",
      "name": "Void Assault",
      "description": "Each rank allows Kha'Zix to evolve one of his abilities, giving it a unique additional effect. When activated, Kha'Zix becomes Invisible , triggering Unseen Threat and increasing Move Speed. If he chooses to Evolve Adaptive Cloaking , Void Assault gains increased Invisibility duration, and an additional use.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Khazix.json"
    },
    "Yuumi:W": {
      "champion": "Yuumi",
      "slot": "W",
      "id": "YuumiW",
      "name": "You and Me!",
      "description": "Yuumi dashes to a target ally, becoming untargetable from everything except turrets. While on her Best Friend, she gains Heal & Shield Power and grants her Ally On-Hit healing.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Yuumi.json"
    },
    "Leona:Q": {
      "champion": "Leona",
      "slot": "Q",
      "id": "LeonaShieldOfDaybreak",
      "name": "Shield of Daybreak",
      "description": "Leona uses her shield to perform her next basic attack, dealing bonus magic damage and stunning the target.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Leona.json"
    },
    "Yuumi:E": {
      "champion": "Yuumi",
      "slot": "E",
      "id": "YuumiE",
      "name": "Zoomies",
      "description": "Shields Yuumi and boosts Move Speed and Attack Speed. If she's attached, she passes it to her ally instead.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Yuumi.json"
    },
    "Locke:E": {
      "champion": "Locke",
      "slot": "E",
      "id": "LockeE",
      "name": "Ashen Pursuit",
      "description": "Locke teleports to a location before dashing to attack his next target, dealing damage to enemies passed through.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Locke.json"
    },
    "Lucian:P": {
      "champion": "Lucian",
      "slot": "P",
      "id": null,
      "name": "Lightslinger",
      "description": "Whenever Lucian uses an ability, his next attack becomes a double-shot. When Lucian is healed or shielded by an ally, or when a nearby enemy Champion is immobilized, his next 2 basic attacks will deal bonus magic damage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Lucian.json"
    },
    "Lucian:E": {
      "champion": "Lucian",
      "slot": "E",
      "id": "LucianE",
      "name": "Relentless Pursuit",
      "description": "Lucian quickly dashes a short distance. Lightslinger attacks reduce Relentless Pursuit's cooldown.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Lucian.json"
    },
    "Lux:R": {
      "champion": "Lux",
      "slot": "R",
      "id": "LuxR",
      "name": "Final Spark",
      "description": "After gathering energy, Lux fires a beam of light that deals damage to all targets in the area. In addition, triggers Lux's passive ability and refreshes the Illumination debuff duration.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Lux.json"
    },
    "Maokai:Q": {
      "champion": "Maokai",
      "slot": "Q",
      "id": "MaokaiQ",
      "name": "Bramble Smash",
      "description": "Maokai knocks back nearby enemies with a shockwave, dealing magic damage and slowing them.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Maokai.json"
    },
    "Master Yi:W": {
      "champion": "Master Yi",
      "slot": "W",
      "id": "Meditate",
      "name": "Meditate",
      "description": "Master Yi rejuvenates his body by focus of mind, restoring Health and taking reduced damage for a short time. In addition, Master Yi will gain stacks of Double Strike and pause the remaining duration on Wuju Style and Highlander for each second he channels.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/MasterYi.json"
    },
    "Milio:R": {
      "champion": "Milio",
      "slot": "R",
      "id": "MilioR",
      "name": "Breath of Life",
      "description": "Milio unleashes a wave of soothing flames that heal and remove crowd control effects from allies in range.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Milio.json"
    },
    "Miss Fortune:Q": {
      "champion": "Miss Fortune",
      "slot": "Q",
      "id": "MissFortuneRicochetShot",
      "name": "Double Up",
      "description": "Miss Fortune fires a bullet at an enemy, damaging them and a target behind them. Both strikes can also apply Love Tap.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/MissFortune.json"
    },
    "Draven:Q": {
      "champion": "Draven",
      "slot": "Q",
      "id": "DravenSpinning",
      "name": "Spinning Axe",
      "description": "Draven's next attack will deal bonus physical damage. This axe will ricochet off the target high up into the air. If Draven catches it, he automatically readies another Spinning Axe. Draven can have two Spinning Axes at once.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Draven.json"
    },
    "Mordekaiser:R": {
      "champion": "Mordekaiser",
      "slot": "R",
      "id": "MordekaiserR",
      "name": "Realm of Death",
      "description": "Mordekaiser drags his victim to a different dimension with him and steals a portion of their stats. If he kills them, he keeps the stats until the victim respawns.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Mordekaiser.json"
    },
    "Illaoi:R": {
      "champion": "Illaoi",
      "slot": "R",
      "id": "IllaoiR",
      "name": "Leap of Faith",
      "description": "Illaoi smashes her idol into the ground, dealing physical damage to nearby enemies. A Tentacle spawns for each enemy champion hit.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Illaoi.json"
    },
    "Mordekaiser:W": {
      "champion": "Mordekaiser",
      "slot": "W",
      "id": "MordekaiserW",
      "name": "Indestructible",
      "description": "Mordekaiser stores damage he deals and takes to create a shield. He may consume the shield to heal.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Mordekaiser.json"
    },
    "Karthus:P": {
      "champion": "Karthus",
      "slot": "P",
      "id": null,
      "name": "Death Defied",
      "description": "Upon dying, Karthus enters a spirit form that allows him to continue casting spells.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Karthus.json"
    },
    "Hecarim:P": {
      "champion": "Hecarim",
      "slot": "P",
      "id": null,
      "name": "Warpath",
      "description": "Hecarim gains Attack Damage equal to a percentage of his bonus Move Speed.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Hecarim.json"
    },
    "Naafiri:W": {
      "champion": "Naafiri",
      "slot": "W",
      "id": "NaafiriR",
      "name": "The Call of the Pack",
      "description": "Naafiri becomes Untargetable and empowers her pack, spawning additional packmates and gaining increased Move Speed and Attack Damage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Naafiri.json"
    },
    "Syndra:E": {
      "champion": "Syndra",
      "slot": "E",
      "id": "SyndraE",
      "name": "Scatter the Weak",
      "description": "Syndra knocks enemies and Dark Spheres back dealing magic damage. Enemies hit by Dark Spheres become stunned.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Syndra.json"
    },
    "Nami:R": {
      "champion": "Nami",
      "slot": "R",
      "id": "NamiR",
      "name": "Tidal Wave",
      "description": "Summons a massive Tidal Wave that knocks up, slows, and damages enemies. Allies hit gain double the effect of Surging Tides.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Nami.json"
    },
    "Nami:W": {
      "champion": "Nami",
      "slot": "W",
      "id": "NamiW",
      "name": "Ebb and Flow",
      "description": "Unleashes a stream of water that bounces back and forth between allied and enemy champions, healing allies and damaging enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Nami.json"
    },
    "Nami:P": {
      "champion": "Nami",
      "slot": "P",
      "id": null,
      "name": "Surging Tides",
      "description": "When Nami's Abilities hit allied champions they gain Move Speed for a short duration.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Nami.json"
    },
    "Neeko:E": {
      "champion": "Neeko",
      "slot": "E",
      "id": "NeekoE",
      "name": "Tangle-Barbs",
      "description": "Neeko slings a tangle that damages and roots everything it passes through. If the tangle kills an enemy or passes through a champion, it becomes larger, faster, and roots for longer.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Neeko.json"
    },
    "Nidalee:R": {
      "champion": "Nidalee",
      "slot": "R",
      "id": "AspectOfTheCougar",
      "name": "Aspect Of The Cougar",
      "description": "Nidalee transforms into a cougar, gaining new abilities.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Nidalee.json"
    },
    "Nilah:Q": {
      "champion": "Nilah",
      "slot": "Q",
      "id": "NilahQ",
      "name": "Formless Blade",
      "description": "With a snap of her whip-blade, Nilah damages any enemies she hits in a straight line in her chosen direction. This action extends her attack range for a short duration.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Nilah.json"
    },
    "Nocturne:W": {
      "champion": "Nocturne",
      "slot": "W",
      "id": "NocturneShroudofDarkness",
      "name": "Shroud of Darkness",
      "description": "Nocturne empowers his blades, passively gaining Attack Speed. Activating Shroud of Darkness allows Nocturne to fade into the shadows, creating a magical barrier which blocks a single enemy ability and doubles his passive Attack Speed if successful.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Nocturne.json"
    },
    "Nocturne:E": {
      "champion": "Nocturne",
      "slot": "E",
      "id": "NocturneUnspeakableHorror",
      "name": "Unspeakable Horror",
      "description": "Nocturne plants a nightmare into his target's mind, dealing damage each second and applying fear to the target if they do not get out of range by the end of the duration.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Nocturne.json"
    },
    "Olaf:Q": {
      "champion": "Olaf",
      "slot": "Q",
      "id": "OlafAxeThrowCast",
      "name": "Undertow",
      "description": "Olaf throws an axe into the ground at a target location, dealing damage to enemies it passes through and reducing their Armor and Move Speed. If Olaf picks up the axe, the ability's cooldown is reset.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Olaf.json"
    },
    "Orianna:R": {
      "champion": "Orianna",
      "slot": "R",
      "id": "OrianaDetonateCommand",
      "name": "Command: Shockwave",
      "description": "Orianna commands her Ball to unleash a shockwave, dealing magic damage and launching nearby enemies towards the Ball after a short delay.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Orianna.json"
    },
    "Orianna:E": {
      "champion": "Orianna",
      "slot": "E",
      "id": "OrianaRedactCommand",
      "name": "Command: Protect",
      "description": "Orianna commands her Ball to attach to an allied champion, Shielding them and dealing magic damage to any enemies it passes through on the way. Additionally, the Ball grants additional Armor and Magic Resist to the champion it is attached to.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Orianna.json"
    },
    "Ornn:E": {
      "champion": "Ornn",
      "slot": "E",
      "id": "OrnnE",
      "name": "Searing Charge",
      "description": "Ornn charges, dealing damage to enemies he passes through. If Ornn collides with terrain while charging, the impact creates a shockwave around him which deals damage and knocks up enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Ornn.json"
    },
    "Pantheon:E": {
      "champion": "Pantheon",
      "slot": "E",
      "id": "PantheonE",
      "name": "Aegis Assault",
      "description": "Pantheon sets his shield, becoming invulnerable to damage from the front and striking repeatedly with his spear.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Pantheon.json"
    },
    "Anivia:W": {
      "champion": "Anivia",
      "slot": "W",
      "id": "Crystallize",
      "name": "Crystallize",
      "description": "Anivia condenses the moisture in the air into an impassable wall of ice to block all movement. The wall only lasts a short duration before it melts.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Anivia.json"
    },
    "Anivia:P": {
      "champion": "Anivia",
      "slot": "P",
      "id": null,
      "name": "Rebirth",
      "description": "Upon taking fatal damage, Anivia reverts to an egg and is reborn with full health.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Anivia.json"
    },
    "Rakan:E": {
      "champion": "Rakan",
      "slot": "E",
      "id": "RakanE",
      "name": "Battle Dance",
      "description": "Flies to an allied champion granting them a shield. Can be re-cast for free for a short duration.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Rakan.json"
    },
    "Rek'Sai:W": {
      "champion": "Rek'Sai",
      "slot": "W",
      "id": "RekSaiW",
      "name": "Burrow / Un-burrow",
      "description": "Rek'Sai burrows into the ground, gaining new abilities and increased Move Speed. Her vision range is reduced and she cannot use basic attacks. While Burrowed, Rek'Sai may cast Unburrow to knock up and damage nearby enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/RekSai.json"
    },
    "Evelynn:P": {
      "champion": "Evelynn",
      "slot": "P",
      "id": null,
      "name": "Demon Shade",
      "description": "When out of combat, Evelynn enters Demon Shade. Demon Shade heals Evelynn when she is low on health and grants Camouflage after level 6.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Evelynn.json"
    },
    "Renata Glasc:W": {
      "champion": "Renata Glasc",
      "slot": "W",
      "id": "RenataW",
      "name": "Bailout",
      "description": "Renata buffs an allied champion to fight harder, delaying their death and potentially saving them if they get a takedown.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Renata.json"
    },
    "Renekton:W": {
      "champion": "Renekton",
      "slot": "W",
      "id": "RenektonPreExecute",
      "name": "Ruthless Predator",
      "description": "Renekton slashes his target twice, dealing moderate physical damage and stuns them for 0.75 seconds. If Renekton has more than 50 Fury, he slashes his target three times, destroying damage shields on the target, dealing high physical damage, and stunning them for 1.5 seconds.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Renekton.json"
    },
    "Renekton:P": {
      "champion": "Renekton",
      "slot": "P",
      "id": null,
      "name": "Reign of Anger",
      "description": "Renekton's attacks generate Fury, increased when he is low on life. This Fury can empower his abilities with bonus effects.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Renekton.json"
    },
    "Rengar:R": {
      "champion": "Rengar",
      "slot": "R",
      "id": "RengarR",
      "name": "Thrill of the Hunt",
      "description": "Rengar's predatory instincts take over, Camouflaging him and revealing the nearest enemy champion in a large radius around him. During Thrill of the Hunt, Rengar gains Move Speed and he can leap to the tracked enemy without being in brush, reducing their armor.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Rengar.json"
    },
    "Riven:W": {
      "champion": "Riven",
      "slot": "W",
      "id": "RivenMartyr",
      "name": "Ki Burst",
      "description": "Riven emits a Ki Burst, damaging and stunning nearby enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Riven.json"
    },
    "Ryze:W": {
      "champion": "Ryze",
      "slot": "W",
      "id": "RyzeW",
      "name": "Rune Prison",
      "description": "Ryze traps a target in a cage of runes, damaging them and slowing their movement. If the target has Flux on it, they are instead rooted.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Ryze.json"
    },
    "Talon:E": {
      "champion": "Talon",
      "slot": "E",
      "id": "TalonE",
      "name": "Assassin's Path",
      "description": "Talon vaults over any terrain or structure, up to a max distance. This ability has a low cooldown, but puts the used terrain on a long cooldown.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Talon.json"
    },
    "Ryze:E": {
      "champion": "Ryze",
      "slot": "E",
      "id": "RyzeE",
      "name": "Spell Flux",
      "description": "Ryze releases an orb of pure magical power that damages an enemy and debuffs all nearby enemies. Ryze's spells have additional effects against the debuffed enemy.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Ryze.json"
    },
    "Samira:W": {
      "champion": "Samira",
      "slot": "W",
      "id": "SamiraW",
      "name": "Blade Whirl",
      "description": "Samira slashes around her, damaging enemies and destroying enemy missiles.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Samira.json"
    },
    "Senna:Q": {
      "champion": "Senna",
      "slot": "Q",
      "id": "SennaQ",
      "name": "Piercing Darkness",
      "description": "From the twin barrels of her Relic Cannon, Senna fires a unified beam of light and shadow through a target, healing allies and damaging enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Senna.json"
    },
    "Sona:R": {
      "champion": "Sona",
      "slot": "R",
      "id": "SonaR",
      "name": "Crescendo",
      "description": "Sona plays her ultimate chord, stunning enemy champions and forcing them to dance and dealing magic damage to them.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Sona.json"
    },
    "Seraphine:W": {
      "champion": "Seraphine",
      "slot": "W",
      "id": "SeraphineW",
      "name": "Surround Sound",
      "description": "Seraphine Shields and Hastes nearby allies. If she is already Shielded she will Heal nearby allies as well.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Seraphine.json"
    },
    "Sett:R": {
      "champion": "Sett",
      "slot": "R",
      "id": "SettR",
      "name": "The Show Stopper",
      "description": "Sett carries an enemy champion through the air and slams them into the ground, dealing damage and slowing all enemies near where they land.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Sett.json"
    },
    "Shaco:R": {
      "champion": "Shaco",
      "slot": "R",
      "id": "HallucinateFull",
      "name": "Hallucinate",
      "description": "Shaco creates an illusion of himself near him, which can attack nearby enemies (Deals reduced damage to turrets). Upon death, it explodes, spawning three mini Jack in the Boxes and dealing damage to nearby enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Shaco.json"
    },
    "Shen:W": {
      "champion": "Shen",
      "slot": "W",
      "id": "ShenW",
      "name": "Spirit's Refuge",
      "description": "Attacks that would hit Shen or his allies near his spirit blade are blocked.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Shen.json"
    },
    "Shyvana:R": {
      "champion": "Shyvana",
      "slot": "R",
      "id": "ShyvanaR",
      "name": "Dragon's Descent",
      "description": "Shyvana transforms into a Dragon and leaps forward causing enemies along her path to flee. While in Dragon form she becomes larger and her basic abilities are empowered.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Shyvana.json"
    },
    "Singed:W": {
      "champion": "Singed",
      "slot": "W",
      "id": "MegaAdhesive",
      "name": "Mega Adhesive",
      "description": "Throws a vial of mega adhesive on the ground, slowing and grounding enemies who walk on it.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Singed.json"
    },
    "Singed:Q": {
      "champion": "Singed",
      "slot": "Q",
      "id": "PoisonTrail",
      "name": "Poison Trail",
      "description": "Leaves a trail of poison behind Singed, dealing damage to enemies caught in the path.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Singed.json"
    },
    "Sona:W": {
      "champion": "Sona",
      "slot": "W",
      "id": "SonaW",
      "name": "Aria of Perseverance",
      "description": "Sona plays the Aria of Perseverance, sending out protective melodies, healing Sona and a nearby wounded ally. Sona gains a temporary aura that grants allies tagged by the zone a temporary shield.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Sona.json"
    },
    "Swain:R": {
      "champion": "Swain",
      "slot": "R",
      "id": "SwainR",
      "name": "Demonic Ascension",
      "description": "Swain transforms into a demon and drains health from nearby enemy champions, minions, and neutral monsters. Swain can cast Demonflare to decimate and slow nearby enemies with a nova of soulfire. This form is indefinite as long as Swain drains enemy champions.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Swain.json"
    },
    "Syndra:W": {
      "champion": "Syndra",
      "slot": "W",
      "id": "SyndraW",
      "name": "Force of Will",
      "description": "Syndra picks up and throws a Dark Sphere or enemy minion dealing magic damage and slowing the Move Speed of enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Syndra.json"
    },
    "Tahm Kench:R": {
      "champion": "Tahm Kench",
      "slot": "R",
      "id": "TahmKenchRWrapper",
      "name": "Devour",
      "description": "Tahm Kench devours a champion for a few seconds, dealing magic damage if they are an enemy, or shielding them if they are an ally.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/TahmKench.json"
    },
    "Talon:P": {
      "champion": "Talon",
      "slot": "P",
      "id": null,
      "name": "Blade's End",
      "description": "Talon's spells Wound champions and large monsters, stacking up to 3 times. When Talon attacks a champion with 3 stacks of Wound, they bleed for heavy damage over time.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Talon.json"
    },
    "Taric:W": {
      "champion": "Taric",
      "slot": "W",
      "id": "TaricW",
      "name": "Bastion",
      "description": "Passively increase the Armor of Taric and any allied champion with Bastion. Actively shields an ally and grants them Bastion for as long as they remain near Taric. Taric's spells also cast off the ally with Bastion.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Taric.json"
    },
    "Thresh:E": {
      "champion": "Thresh",
      "slot": "E",
      "id": "ThreshE",
      "name": "Flay",
      "description": "Thresh's attacks wind up, dealing more damage the longer he waits between attacks. When activated, Thresh sweeps his chain, knocking all enemies hit in the direction of the blow.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Thresh.json"
    },
    "Thresh:W": {
      "champion": "Thresh",
      "slot": "W",
      "id": "ThreshW",
      "name": "Dark Passage",
      "description": "Thresh throws out a lantern that shields nearby allied Champions from damage. Allies can click the lantern to dash to Thresh.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Thresh.json"
    },
    "Tristana:E": {
      "champion": "Tristana",
      "slot": "E",
      "id": "TristanaE",
      "name": "Explosive Charge",
      "description": "When Tristana kills a unit, her cannonballs burst into shrapnel, dealing damage to surrounding enemies. Can be activated to place a bomb on a target enemy that explodes after a short duration dealing damage to surrounding units.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Tristana.json"
    },
    "Twisted Fate:R": {
      "champion": "Twisted Fate",
      "slot": "R",
      "id": "Destiny",
      "name": "Destiny",
      "description": "Twisted Fate predicts the fortunes of his foes, revealing all enemy champions and enabling the use of Gate, which teleports Twisted Fate to any target location in 1.5 seconds.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/TwistedFate.json"
    },
    "Twitch:Q": {
      "champion": "Twitch",
      "slot": "Q",
      "id": "TwitchHideInShadows",
      "name": "Ambush",
      "description": "Twitch becomes Camouflaged for a short duration and gains Move Speed. When leaving Camouflage, Twitch gains Attack Speed for a short duration. When an enemy champion with Deadly Venom dies, Ambush's cooldown is reset.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Twitch.json"
    },
    "Jhin:P": {
      "champion": "Jhin",
      "slot": "P",
      "id": null,
      "name": "Whisper",
      "description": "Jhin's hand cannon, Whisper, is a precise instrument designed to deal superior damage. It fires at a fixed rate and carries only four shots. Jhin imbues the final bullet with dark magics to critically strike and deal bonus execute damage. Whenever Whisper crits, it inspires Jhin with a burst of Move Speed.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Jhin.json"
    },
    "Udyr:E": {
      "champion": "Udyr",
      "slot": "E",
      "id": "UdyrE",
      "name": "Blazing Stampede",
      "description": "Udyr gains movement speed and his first attack against each target will Stun them. Recast: Gain even more movement speed and immunity to immobilizing effects for a couple seconds.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Udyr.json"
    },
    "Udyr:P": {
      "champion": "Udyr",
      "slot": "P",
      "id": null,
      "name": "Bridge Between",
      "description": "Udyr has four basic Abilities that swap between Stances and can Recast an Ability to renew it with Ultimate benefits. Additionally, after using an Ability, Udyr's next two Attacks gain Attack Speed.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Udyr.json"
    },
    "Urgot:R": {
      "champion": "Urgot",
      "slot": "R",
      "id": "UrgotR",
      "name": "Fear Beyond Death",
      "description": "Urgot fires a chem-drill that impales the first enemy champion hit. If that champion falls below a health threshold, Urgot judges them weak and can execute them.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Urgot.json"
    },
    "Sett:W": {
      "champion": "Sett",
      "slot": "W",
      "id": "SettW",
      "name": "Haymaker",
      "description": "Sett passively stores damage he takes as Grit. On cast, Sett expends all stored Grit to gain a shield and punch an area, dealing true damage in the center and physical damage on the sides.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Sett.json"
    },
    "Sett:P": {
      "champion": "Sett",
      "slot": "P",
      "id": null,
      "name": "Pit Grit",
      "description": "Sett's basic attacks alternate between left and right punch. Right punch is slightly stronger and faster. Sett also hates losing, gaining additional health regeneration based off of his missing health.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Sett.json"
    },
    "Braum:R": {
      "champion": "Braum",
      "slot": "R",
      "id": "BraumRWrapper",
      "name": "Glacial Fissure",
      "description": "Braum slams the ground, knocking up enemies nearby and in a line in front of him. A fissure is left along the line that slows enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Braum.json"
    },
    "Fiddlesticks:W": {
      "champion": "Fiddlesticks",
      "slot": "W",
      "id": "FiddleSticksW",
      "name": "Bountiful Harvest",
      "description": "Fiddlesticks drains health from nearby enemies, dealing bonus execute damage at the end of the duration.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Fiddlesticks.json"
    },
    "Viktor:R": {
      "champion": "Viktor",
      "slot": "R",
      "id": "ViktorR",
      "name": "Arcane Storm",
      "description": "Viktor conjures an Arcane Storm on the field, dealing magic damage and interrupting enemy channels. The storm periodically does magic damage to all nearby enemies and can be redirected by Viktor. Augment: The Arcane Storm moves 25% faster, and whenever champions die after taking damage from it, the storm grows and increases in its duration.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Viktor.json"
    },
    "Vladimir:W": {
      "champion": "Vladimir",
      "slot": "W",
      "id": "VladimirSanguinePool",
      "name": "Sanguine Pool",
      "description": "Vladimir sinks into a pool of blood, becoming untargetable for 2 seconds. Additionally, enemies on the pool are slowed and Vladimir siphons life from them.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Vladimir.json"
    },
    "Volibear:W": {
      "champion": "Volibear",
      "slot": "W",
      "id": "VolibearW",
      "name": "Frenzied Maul",
      "description": "Volibear damages an enemy, applying on-hit effects and marking them. Casting this ability again on the same target deals bonus damage and Heals Volibear.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Volibear.json"
    },
    "Warwick:Q": {
      "champion": "Warwick",
      "slot": "Q",
      "id": "WarwickQ",
      "name": "Jaws of the Beast",
      "description": "Warwick lunges forward and bites his target, dealing damage based on their maximum health and healing for damage dealt.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Warwick.json"
    },
    "Wukong:W": {
      "champion": "Wukong",
      "slot": "W",
      "id": "MonkeyKingDecoy",
      "name": "Warrior Trickster",
      "description": "Wukong becomes Invisible and dashes in a direction, leaving behind a clone that will attack nearby enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/MonkeyKing.json"
    },
    "Xayah:Q": {
      "champion": "Xayah",
      "slot": "Q",
      "id": "XayahQ",
      "name": "Double Daggers",
      "description": "Xayah throws two damaging daggers that also drop Feathers she can recall.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Xayah.json"
    },
    "Xayah:R": {
      "champion": "Xayah",
      "slot": "R",
      "id": "XayahR",
      "name": "Featherstorm",
      "description": "Xayah leaps into the air becoming untargetable and throwing out a fan of daggers, dropping Feathers she can recall.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Xayah.json"
    },
    "Xerath:Q": {
      "champion": "Xerath",
      "slot": "Q",
      "id": "XerathArcanopulseChargeUp",
      "name": "Arcanopulse",
      "description": "Fires a long-range beam of energy, dealing magic damage to all targets hit.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Xerath.json"
    },
    "Yunara:E": {
      "champion": "Yunara",
      "slot": "E",
      "id": "YunaraE",
      "name": "Kanmei's Steps | Untouchable Shadow",
      "description": "Yunara gains Move Speed and becomes Ghosted. While in her Transcendent State she instead dashes in a direction.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Yunara.json"
    },
    "Yunara:Q": {
      "champion": "Yunara",
      "slot": "Q",
      "id": "YunaraQ",
      "name": "Cultivation of Spirit",
      "description": "Yunara gains Attack Speed, bonus damage On-Hit, and her Attacks spread to nearby enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Yunara.json"
    },
    "Yuumi:R": {
      "champion": "Yuumi",
      "slot": "R",
      "id": "YuumiR",
      "name": "Final Chapter",
      "description": "Yuumi channels five waves that damage enemies and heal allies. Yuumi can move, attach, and cast Zoomies! while channeling. While on her Best Friend, this spell also follows her mouse.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Yuumi.json"
    },
    "Zaahen:P": {
      "champion": "Zaahen",
      "slot": "P",
      "id": null,
      "name": "Cultivation of War",
      "description": "Zaahen's attacks and abilities against enemy champions grant him stacks of Determination, gaining bonus Attack Damage per stack. When filled with Determination, Zaahen gains increased Attack Damage and can revive.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Zaahen.json"
    },
    "Zed:W": {
      "champion": "Zed",
      "slot": "W",
      "id": "ZedW",
      "name": "Living Shadow",
      "description": "Passive: Zed gains energy whenever he and his shadows strike an enemy with the same ability. Energy can only be gained once per cast ability. Active: Zed's shadow dashes forward, remaining in place for a few seconds. Reactivating Living Shadow will cause Zed to switch positions with this shadow.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Zed.json"
    },
    "Zeri:E": {
      "champion": "Zeri",
      "slot": "E",
      "id": "ZeriE",
      "name": "Spark Surge",
      "description": "Zeri dashes a short distance and energizes Burst Fire to pierce through enemies. She will vault and grind over any terrain she touches.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Zeri.json"
    },
    "Ziggs:W": {
      "champion": "Ziggs",
      "slot": "W",
      "id": "ZiggsW",
      "name": "Satchel Charge",
      "description": "Ziggs flings an explosive charge that detonates after a delay, or when this ability is activated again. The explosion deals magic damage to enemies, knocking them away. Ziggs is also knocked away, but takes no damage. Ziggs can use the Satchel to hexplode vulnerable enemy turrets.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Ziggs.json"
    },
    "Zilean:R": {
      "champion": "Zilean",
      "slot": "R",
      "id": "ChronoShift",
      "name": "Chronoshift",
      "description": "Zilean places a protective time rune on an allied champion, teleporting the champion back in time if they take lethal damage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Zilean.json"
    },
    "Zoe:Q": {
      "champion": "Zoe",
      "slot": "Q",
      "id": "ZoeQ",
      "name": "Paddle Star!",
      "description": "Zoe fires a missile that she can redirect in flight. Deals more damage the longer it flies in a straight line.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Zoe.json"
    },
    "Zyra:W": {
      "champion": "Zyra",
      "slot": "W",
      "id": "ZyraW",
      "name": "Rampant Growth",
      "description": "Zyra plants a seed, lasting up to 60 seconds. Deadly Spines and Grasping Roots cast near seeds will turn them into plants who fight for Zyra. Zyra can store multiple seeds at once, and killing enemies reduces Rampant Growth's recharge time.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Zyra.json"
    },
    "Zyra:Q": {
      "champion": "Zyra",
      "slot": "Q",
      "id": "ZyraQ",
      "name": "Deadly Spines",
      "description": "Thick vines spread through the ground and explode into spines, dealing magic damage to enemies within the area. If cast near a seed, Deadly Spines grows a Thorn Spitter plant, which fires at enemies from afar.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Zyra.json"
    },
    "Ashe:W": {
      "champion": "Ashe",
      "slot": "W",
      "id": "Volley",
      "name": "Volley",
      "description": "Ashe fires arrows in a cone for increased damage. Also applies Frost Shot.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Ashe.json"
    },
    "Brand:W": {
      "champion": "Brand",
      "slot": "W",
      "id": "BrandW",
      "name": "Pillar of Flame",
      "description": "After a short delay, Brand creates a Pillar of Flame at a target area, dealing magic damage to enemy units within the area. Units that are ablaze take an additional 25% damage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Brand.json"
    },
    "Brand:E": {
      "champion": "Brand",
      "slot": "E",
      "id": "BrandE",
      "name": "Conflagration",
      "description": "Brand conjures a powerful blast at his target that spreads to nearby enemies, dealing magic damage. If the target is ablaze, Conflagration's spread is doubled.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Brand.json"
    },
    "Cassiopeia:Q": {
      "champion": "Cassiopeia",
      "slot": "Q",
      "id": "CassiopeiaQ",
      "name": "Noxious Blast",
      "description": "Cassiopeia blasts an area with Poison after a brief delay, granting her increased Move Speed if she hits an enemy champion.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Cassiopeia.json"
    },
    "Cho'Gath:R": {
      "champion": "Cho'Gath",
      "slot": "R",
      "id": "Feast",
      "name": "Feast",
      "description": "Devours an enemy unit, dealing a high amount of true damage. If the target is killed, Cho'Gath grows, gaining maximum Health.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Chogath.json"
    },
    "Dr. Mundo:R": {
      "champion": "Dr. Mundo",
      "slot": "R",
      "id": "DrMundoR",
      "name": "Maximum Dosage",
      "description": "Dr. Mundo pumps himself with chemicals, instantly healing a percent of his missing Health. He then gains Move Speed and regenerates a portion of his maximum Health over a long duration.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/DrMundo.json"
    },
    "Dr. Mundo:Q": {
      "champion": "Dr. Mundo",
      "slot": "Q",
      "id": "DrMundoQ",
      "name": "Infected Bonesaw",
      "description": "Dr. Mundo throws an infected bonesaw, dealing damage to the first enemy hit based on their current health and slowing them.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/DrMundo.json"
    },
    "Gangplank:Q": {
      "champion": "Gangplank",
      "slot": "Q",
      "id": "GangplankQWrapper",
      "name": "Parrrley",
      "description": "Shoots target, plundering Gold for each enemy unit killed.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Gangplank.json"
    },
    "Gangplank:E": {
      "champion": "Gangplank",
      "slot": "E",
      "id": "GangplankE",
      "name": "Powder Keg",
      "description": "Gangplank uncovers a powder keg at target location. If he attacks it, it explodes, spreading the attack's damage to enemies in the area, slowing them.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Gangplank.json"
    },
    "Locke:W": {
      "champion": "Locke",
      "slot": "W",
      "id": "LockeW",
      "name": "Soul Ignition",
      "description": "Locke ignites his soul, gaining Attack Speed and Move Speed, and dealing damage to himself. At the end of the duration, Locke will heal back a portion of the damage he takes during the effect.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Locke.json"
    },
    "Milio:E": {
      "champion": "Milio",
      "slot": "E",
      "id": "MilioE",
      "name": "Warm Hugs",
      "description": "Milio tosses a shield to an ally, temporarily increasing their movement speed. This ability has 2 charges.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Milio.json"
    },
    "Milio:Q": {
      "champion": "Milio",
      "slot": "Q",
      "id": "MilioQ",
      "name": "Ultra Mega Fire Kick",
      "description": "Kick a ball that knocks back an enemy. The ball launches upward on hit and falls toward the enemy, damaging and slowing enemies in the area upon impact.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Milio.json"
    },
    "Gwen:W": {
      "champion": "Gwen",
      "slot": "W",
      "id": "GwenW",
      "name": "Hallowed Mist",
      "description": "Gwen summons mist that protects her from enemies outside of it. She can only be targeted by enemies who enter the mist.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Gwen.json"
    },
    "Zed:Q": {
      "champion": "Zed",
      "slot": "Q",
      "id": "ZedQ",
      "name": "Razor Shuriken",
      "description": "Zed and his shadows throw their shurikens. Each shuriken deals damage to every enemy hit.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Zed.json"
    },
    "Soraka:W": {
      "champion": "Soraka",
      "slot": "W",
      "id": "SorakaW",
      "name": "Astral Infusion",
      "description": "Soraka sacrifices a portion of her own health to heal another friendly champion.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Soraka.json"
    },
    "Nocturne:R": {
      "champion": "Nocturne",
      "slot": "R",
      "id": "NocturneParanoia",
      "name": "Paranoia",
      "description": "Nocturne reduces the sight radius of all enemy champions and removes their ally vision in the process. He can then launch himself at a nearby enemy champion.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Nocturne.json"
    },
    "Orianna:Q": {
      "champion": "Orianna",
      "slot": "Q",
      "id": "OrianaIzunaCommand",
      "name": "Command: Attack",
      "description": "Orianna commands her Ball to fire toward a target location, dealing magic damage to targets along the way (deals less damage to subsequent targets). Her Ball remains at the target location after.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Orianna.json"
    },
    "Renata Glasc:R": {
      "champion": "Renata Glasc",
      "slot": "R",
      "id": "RenataR",
      "name": "Hostile Takeover",
      "description": "Renata sends out a wave of chemicals, causing any enemies hit to go Berserk.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Renata.json"
    },
    "Rumble:E": {
      "champion": "Rumble",
      "slot": "E",
      "id": "RumbleGrenade",
      "name": "Electro Harpoon",
      "description": "Rumble launches a harpoon, electrocuting his target with magic damage, slowing their Move Speed, and reducing their Magic Resist. Rumble can carry 2 harpoons at a time. While in Danger Zone the damage and slow percentage is increased.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Rumble.json"
    },
    "Rumble:R": {
      "champion": "Rumble",
      "slot": "R",
      "id": "RumbleCarpetBomb",
      "name": "The Equalizer",
      "description": "Rumble fires off a group of rockets, creating a wall of flames that damages and slows enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Rumble.json"
    },
    "Ryze:R": {
      "champion": "Ryze",
      "slot": "R",
      "id": "RyzeR",
      "name": "Realm Warp",
      "description": "Passively, Overload deals even more damage against targets with Flux. On cast, Ryze creates a portal to a nearby location. After a few seconds, allies standing near the portal are teleported to the target location.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Ryze.json"
    },
    "Senna:R": {
      "champion": "Senna",
      "slot": "R",
      "id": "SennaR",
      "name": "Dawning Shadow",
      "description": "Senna calls upon the relic stones of fallen Sentinels, splitting her relic cannon into a holy array of shadow and light. She then fires a global beam that shields allies from harm, while damaging enemies caught in the center.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Senna.json"
    },
    "Tahm Kench:E": {
      "champion": "Tahm Kench",
      "slot": "E",
      "id": "TahmKenchE",
      "name": "Thick Skin",
      "description": "Passive: Tahm Kench stores a percent of the damage he takes and heals based on it while out of combat. Active: Convert all stored damage into a temporary shield.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/TahmKench.json"
    },
    "Taliyah:Q": {
      "champion": "Taliyah",
      "slot": "Q",
      "id": "TaliyahQ",
      "name": "Threaded Volley",
      "description": "Taliyah throws a volley of rocks in a target direction, moving freely as she casts. This creates Worked Ground below her. If Taliyah casts Threaded Volley on Worked Ground, she consumes the ground to throw a stronger boulder that slows enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Taliyah.json"
    },
    "Taliyah:W": {
      "champion": "Taliyah",
      "slot": "W",
      "id": "TaliyahWVC",
      "name": "Seismic Shove",
      "description": "Taliyah causes an area of ground to erupt and throws enemies within it in a direction of her choosing.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Taliyah.json"
    },
    "Kayn:E": {
      "champion": "Kayn",
      "slot": "E",
      "id": "KaynE",
      "name": "Shadow Step",
      "description": "Kayn can walk through terrain.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Kayn.json"
    },
    "Twisted Fate:Q": {
      "champion": "Twisted Fate",
      "slot": "Q",
      "id": "WildCards",
      "name": "Wild Cards",
      "description": "Twisted Fate throws three cards, dealing damage to each enemy unit they pass through.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/TwistedFate.json"
    },
    "Lulu:W": {
      "champion": "Lulu",
      "slot": "W",
      "id": "LuluW",
      "name": "Whimsy",
      "description": "If cast on an ally, grants them Attack Speed and Move Speed for a short time. If cast on an enemy, turns them into an adorable critter that can't attack or cast spells.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Lulu.json"
    },
    "Vex:W": {
      "champion": "Vex",
      "slot": "W",
      "id": "VexW",
      "name": "Personal Space",
      "description": "Gain a shield and damage nearby enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Vex.json"
    },
    "Vex:R": {
      "champion": "Vex",
      "slot": "R",
      "id": "VexR",
      "name": "Shadow Surge",
      "description": "Fire a missile that marks an enemy champion. Recast to dash to them and deal damage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Vex.json"
    },
    "Viktor:W": {
      "champion": "Viktor",
      "slot": "W",
      "id": "ViktorW",
      "name": "Gravity Field",
      "description": "Viktor conjures a heavy gravitational field that slows enemies caught within its radius. Enemies who stay in the field for too long become stunned. Augment: Viktor's spells apply a slow to enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Viktor.json"
    },
    "Warwick:E": {
      "champion": "Warwick",
      "slot": "E",
      "id": "WarwickE",
      "name": "Primal Howl",
      "description": "Warwick gains damage reduction for 2.5 seconds. At the end, or if re-activated, he howls, causing nearby enemies to flee for 1 second.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Warwick.json"
    },
    "Xerath:R": {
      "champion": "Xerath",
      "slot": "R",
      "id": "XerathLocusOfPower2",
      "name": "Rite of the Arcane",
      "description": "Xerath immobilizes himself and gains numerous long-range barrages.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Xerath.json"
    },
    "Yasuo:R": {
      "champion": "Yasuo",
      "slot": "R",
      "id": "YasuoR",
      "name": "Last Breath",
      "description": "Blinks to an Airborne enemy champion, dealing physical damage and holding all Airborne enemies in the area in the air. Grants maximum Flow but resets all stacks of Gathering Storm. For a moderate time afterwards, Yasuo's critical strikes gain significant Bonus Armor Penetration.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Yasuo.json"
    },
    "Akali:Q": {
      "champion": "Akali",
      "slot": "Q",
      "id": "AkaliQ",
      "name": "Five Point Strike",
      "description": "Akali throws out five kunai, dealing damage based on her bonus Attack Damage and Ability Power and slowing.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Akali.json"
    },
    "Irelia:E": {
      "champion": "Irelia",
      "slot": "E",
      "id": "IreliaE",
      "name": "Flawless Duet",
      "description": "Irelia sends out two blades which converge on each other. Enemies caught in between are damaged, stunned and Marked.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Irelia.json"
    },
    "Mordekaiser:E": {
      "champion": "Mordekaiser",
      "slot": "E",
      "id": "MordekaiserE",
      "name": "Death's Grasp",
      "description": "Mordekaiser pulls all enemies in an area.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Mordekaiser.json"
    },
    "Rengar:E": {
      "champion": "Rengar",
      "slot": "E",
      "id": "RengarE",
      "name": "Bola Strike",
      "description": "Rengar throws a bola, slowing the first target hit for a short duration. Ferocity effect: roots the target.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Rengar.json"
    },
    "Warwick:R": {
      "champion": "Warwick",
      "slot": "R",
      "id": "WarwickR",
      "name": "Infinite Duress",
      "description": "Warwick leaps in a direction (scaling with his bonus Move Speed), suppressing the first champion he collides with for 1.5 seconds.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Warwick.json"
    },
    "Wukong:R": {
      "champion": "Wukong",
      "slot": "R",
      "id": "MonkeyKingSpinToWin",
      "name": "Cyclone",
      "description": "Wukong's extends his staff and spins it around repeatedly, gaining Move Speed. Enemies struck take damage and are knocked up.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/MonkeyKing.json"
    },
    "Ekko:W": {
      "champion": "Ekko",
      "slot": "W",
      "id": "EkkoW",
      "name": "Parallel Convergence",
      "description": "Ekko's basic attacks deal bonus magic damage to low health enemies. He can cast Parallel Convergence to split the timeline, creating an anomaly after a few seconds that slows enemies caught inside. If Ekko enters the anomaly, he gains shielding and stuns enemies by suspending them in time.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Ekko.json"
    },
    "Evelynn:W": {
      "champion": "Evelynn",
      "slot": "W",
      "id": "EvelynnW",
      "name": "Allure",
      "description": "Evelynn curses her target, causing her next attack or spell after a delay to charm her target and reduce their magic resist.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Evelynn.json"
    },
    "Kayn:W": {
      "champion": "Kayn",
      "slot": "W",
      "id": "KaynW",
      "name": "Blade's Reach",
      "description": "Kayn damages and slows targets in a line.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Kayn.json"
    },
    "Fiora:P": {
      "champion": "Fiora",
      "slot": "P",
      "id": null,
      "name": "Duelist's Dance",
      "description": "Fiora has revealed a Vital on this Champion. If she hits the Vital , she restores Health and gains Move Speed .",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Fiora.json"
    },
    "Kha'Zix:W": {
      "champion": "Kha'Zix",
      "slot": "W",
      "id": "KhazixW",
      "name": "Void Spike",
      "description": "Kha'Zix fires exploding spikes that deal physical damage to enemies hit. Kha'Zix is healed if he is also within the explosion radius. If he chooses to Evolve Spike Racks , Void Spike now fires three spikes in a cone, slow enemies hit, and reveals enemy champions hit for 2 seconds. Isolated targets are slowed for extra.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Khazix.json"
    },
    "Nidalee:Q": {
      "champion": "Nidalee",
      "slot": "Q",
      "id": "JavelinToss",
      "name": "Javelin Toss / Takedown",
      "description": "In human form, Nidalee throws a spiked javelin at her target that gains damage as it flies. As a cougar, her next attack will attempt to fatally wound her target, dealing more damage the less life they have.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Nidalee.json"
    },
    "Poppy:R": {
      "champion": "Poppy",
      "slot": "R",
      "id": "PoppyR",
      "name": "Keeper's Verdict",
      "description": "Poppy channels a hammer strike that knocks enemies very far away.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Poppy.json"
    },
    "Naafiri:E": {
      "champion": "Naafiri",
      "slot": "E",
      "id": "NaafiriE",
      "name": "Eviscerate",
      "description": "Naafiri dashes and damages enemies in an area around her, recalling her packmates and fully healing them.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Naafiri.json"
    },
    "Tristana:W": {
      "champion": "Tristana",
      "slot": "W",
      "id": "TristanaW",
      "name": "Rocket Jump",
      "description": "Tristana fires at the ground to propel her to a distant location, dealing damage and slowing surrounding units for a brief period where she lands.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Tristana.json"
    },
    "Vladimir:Q": {
      "champion": "Vladimir",
      "slot": "Q",
      "id": "VladimirQ",
      "name": "Transfusion",
      "description": "Vladimir steals life from the target enemy. When Vladimir's resource is full, Transfusion will benefit from massively increased damage and healing for a brief time.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Vladimir.json"
    },
    "Ekko:P": {
      "champion": "Ekko",
      "slot": "P",
      "id": null,
      "name": "Z-Drive Resonance",
      "description": "Every third attack or damaging spell on the same target deals bonus magic damage, and grants Ekko a burst of speed if the target is a champion.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Ekko.json"
    },
    "Malzahar:P": {
      "champion": "Malzahar",
      "slot": "P",
      "id": null,
      "name": "Void Shift",
      "description": "When he hasn't recently taken damage or been crowd controlled, Malzahar gains massive damage reduction and crowd control immunity, lingering for a short period after taking damage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Malzahar.json"
    },
    "Locke:R": {
      "champion": "Locke",
      "slot": "R",
      "id": "LockeR",
      "name": "Purgatory",
      "description": "Locke throws a binding artifact that deals damage and potentially executes enemies hit. Locke gains additional power for sealing away enemy champions.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Locke.json"
    },
    "Ziggs:E": {
      "champion": "Ziggs",
      "slot": "E",
      "id": "ZiggsE",
      "name": "Hexplosive Minefield",
      "description": "Ziggs scatters proximity mines that detonate on enemy contact, dealing magic damage and slowing. Successive mine detonations on the same target deal reduced damage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Ziggs.json"
    },
    "Sivir:W": {
      "champion": "Sivir",
      "slot": "W",
      "id": "SivirW",
      "name": "Ricochet",
      "description": "Sivir's next few basic attacks gain additional attack speed and bounce to nearby targets, dealing reduced damage while bouncing.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Sivir.json"
    },
    "Caitlyn:R": {
      "champion": "Caitlyn",
      "slot": "R",
      "id": "CaitlynR",
      "name": "Ace in the Hole",
      "description": "Caitlyn takes time to line up the perfect shot, dealing massive damage to a single target at a huge range. Enemy champions can intercept the bullet for their ally.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Caitlyn.json"
    },
    "Ezreal:W": {
      "champion": "Ezreal",
      "slot": "W",
      "id": "EzrealW",
      "name": "Essence Flux",
      "description": "Ezreal fires an orb that sticks to the first champion or objective hit. If Ezreal hits an enemy with the orb, it detonates and deals damage.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Ezreal.json"
    },
    "Kog'Maw:E": {
      "champion": "Kog'Maw",
      "slot": "E",
      "id": "KogMawVoidOoze",
      "name": "Void Ooze",
      "description": "Kog'Maw launches a peculiar ooze which damages all enemies it passes through and leaves a trail which slows enemies who stand on it.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/KogMaw.json"
    },
    "Lucian:W": {
      "champion": "Lucian",
      "slot": "W",
      "id": "LucianW",
      "name": "Ardent Blaze",
      "description": "Lucian shoots a missile that explodes in a star shape, marking and briefly revealing enemies. Lucian gains Move Speed for attacking marked enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Lucian.json"
    },
    "Samira:Q": {
      "champion": "Samira",
      "slot": "Q",
      "id": "SamiraQ",
      "name": "Flair",
      "description": "Samira fires a shot or swings her sword, dealing damage. If cast during Wild Rush, strike all enemies in her path upon completion.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Samira.json"
    },
    "Smolder:R": {
      "champion": "Smolder",
      "slot": "R",
      "id": "SmolderR",
      "name": "MMOOOMMMM!",
      "description": "Smolder calls his mom to breath fire from above, dealing extra damage and slowing enemies in the center of her fire.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Smolder.json"
    },
    "Twitch:E": {
      "champion": "Twitch",
      "slot": "E",
      "id": "TwitchExpunge",
      "name": "Contaminate",
      "description": "Twitch wreaks further havoc on poisoned enemies with a blast of his vile diseases.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Twitch.json"
    },
    "Yasuo:Q": {
      "champion": "Yasuo",
      "slot": "Q",
      "id": "YasuoQ1Wrapper",
      "name": "Steel Tempest",
      "description": "Thrusts forward, damaging all enemies in a line. On hit, grants a stack of Gathering Storm for a few seconds. At 2 stacks, Steel Tempest fires a whirlwind that knocks Airborne . Steel Tempest is treated as a basic attack and scales with all the same things.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Yasuo.json"
    },
    "Zeri:W": {
      "champion": "Zeri",
      "slot": "W",
      "id": "ZeriW",
      "name": "Ultrashock Laser",
      "description": "Zeri fires an electric pulse that slows and damages the first enemy hit. If the pulse hits a wall it expands into a long range laser.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Zeri.json"
    },
    "Jinx:R": {
      "champion": "Jinx",
      "slot": "R",
      "id": "JinxR",
      "name": "Super Mega Death Rocket!",
      "description": "Jinx fires a super rocket across the map that gains damage as it travels. The rocket will explode upon colliding with an enemy champion, dealing damage to it and surrounding enemies based on their missing Health.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Jinx.json"
    },
    "Ziggs:R": {
      "champion": "Ziggs",
      "slot": "R",
      "id": "ZiggsR",
      "name": "Mega Inferno Bomb",
      "description": "Ziggs deploys his ultimate creation, the Mega Inferno Bomb, hurling it an enormous distance. Enemies in the primary blast zone take more damage than those farther away.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Ziggs.json"
    },
    "Malzahar:E": {
      "champion": "Malzahar",
      "slot": "E",
      "id": "MalzaharE",
      "name": "Malefic Visions",
      "description": "Malzahar infects his target's mind with cruel visions of their demise, dealing damage over time. Using Malzahar's other spells on the target will refresh the visions. If the target dies while afflicted by the visions, they pass on to a nearby enemy unit and Malzahar gains Mana. Malzahar's Voidlings are attracted to affected units.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Malzahar.json"
    },
    "Qiyana:W": {
      "champion": "Qiyana",
      "slot": "W",
      "id": "QiyanaW",
      "name": "Terrashape",
      "description": "Qiyana dashes to a location and enchants her weapon with an element. Her attacks and abilities deal bonus damage while her weapon is enchanted.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Qiyana.json"
    },
    "Aurora:E": {
      "champion": "Aurora",
      "slot": "E",
      "id": "AuroraE",
      "name": "The Weirding",
      "description": "Aurora converges the realms, sending out a blast of spirit magic that damages and slows enemies before Aurora hops backward to safety.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Aurora.json"
    },
    "Cassiopeia:R": {
      "champion": "Cassiopeia",
      "slot": "R",
      "id": "CassiopeiaR",
      "name": "Petrifying Gaze",
      "description": "Cassiopeia releases a swirl of magical energy from her eyes, stunning any enemies in front of her that are facing her and slowing any others with their back turned.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Cassiopeia.json"
    },
    "Galio:E": {
      "champion": "Galio",
      "slot": "E",
      "id": "GalioE",
      "name": "Justice Punch",
      "description": "Galio will briefly step back and charge, knocking up the first enemy champion he encounters.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Galio.json"
    },
    "Malzahar:Q": {
      "champion": "Malzahar",
      "slot": "Q",
      "id": "MalzaharQ",
      "name": "Call of the Void",
      "description": "Malzahar opens up two portals to the Void. After a short delay, they fire projectiles that deal Magic Damage and silence enemy champions.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Malzahar.json"
    },
    "Braum:W": {
      "champion": "Braum",
      "slot": "W",
      "id": "BraumW",
      "name": "Stand Behind Me",
      "description": "Braum leaps to a target allied champion or minion. On arrival, Braum and the ally gain Armor and Magic Resist for a few seconds.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Braum.json"
    },
    "Brand:R": {
      "champion": "Brand",
      "slot": "R",
      "id": "BrandR",
      "name": "Pyroclasm",
      "description": "Brand unleashes a devastating torrent of fire that bounces up to 5 times off of Brand and nearby enemies, dealing magic damage to enemies each time bounce. Bounces prioritize stacking Blaze to max on Champions. If a target is ablaze, Pyroclasm will briefly slow them.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Brand.json"
    },
    "Shaco:E": {
      "champion": "Shaco",
      "slot": "E",
      "id": "TwoShivPoison",
      "name": "Two-Shiv Poison",
      "description": "Shaco's Shivs passively poison targets on hit, slowing their Move Speed. He can throw his Shivs to deal damage and poison the target. The thrown Shiv deals bonus damage if the target is below 30% health.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Shaco.json"
    },
    "Aatrox:E": {
      "champion": "Aatrox",
      "slot": "E",
      "id": "AatroxE",
      "name": "Umbral Dash",
      "description": "Passively, Aatrox heals when damaging enemy champions. On activation, he dashes in a direction.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Aatrox.json"
    },
    "Yorick:E": {
      "champion": "Yorick",
      "slot": "E",
      "id": "YorickE",
      "name": "Mourning Mist",
      "description": "Yorick throws a globule of Black Mist that reduces armor, damages, slows and marks enemies. Summoned units gain move speed when moving towards marked targets.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Yorick.json"
    },
    "Gwen:P": {
      "champion": "Gwen",
      "slot": "P",
      "id": null,
      "name": "A Thousand Cuts",
      "description": "Gwen's attacks deal bonus magic damage based on the targets health. She heals for a portion of the damage dealt to champions by this effect.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Gwen.json"
    },
    "Kayle:Q": {
      "champion": "Kayle",
      "slot": "Q",
      "id": "KayleQ",
      "name": "Radiant Blast",
      "description": "Kayle conjures a portal, summoning a celestial sword that pierces through enemies, slowing, damaging, and reducing the resistances of all hit.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Kayle.json"
    },
    "Teemo:W": {
      "champion": "Teemo",
      "slot": "W",
      "id": "TeemoW",
      "name": "Move Quick",
      "description": "Teemo scampers around, passively increasing his Move Speed until he is struck by an enemy champion or turret. Teemo can sprint to gain bonus Move Speed that isn't stopped by being struck for a short time.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Teemo.json"
    },
    "Riven:Q": {
      "champion": "Riven",
      "slot": "Q",
      "id": "RivenTriCleave",
      "name": "Broken Wings",
      "description": "Riven lashes out in a series of strikes. This ability can be reactivated three times in a short time frame with the third hit knocking back nearby enemies.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Riven.json"
    },
    "Shyvana:P": {
      "champion": "Shyvana",
      "slot": "P",
      "id": null,
      "name": "Scalemail",
      "description": "Takedowns on enemy champions, large minions, and large monsters grant Shyvana Scalemail stacks, improving her defenses.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Shyvana.json"
    },
    "Shyvana:W": {
      "champion": "Shyvana",
      "slot": "W",
      "id": "ShyvanaW",
      "name": "Inferno Aegis",
      "description": "Shyvana gains a shield, movement speed, and after a short delay, the area around her detonates. While in Dragon Form, the explosion will heal her if it strikes an enemy champion.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Shyvana.json"
    },
    "Shyvana:E": {
      "champion": "Shyvana",
      "slot": "E",
      "id": "ShyvanaE",
      "name": "Molten Burst",
      "description": "Shyvana launches a fireball that explodes upon striking a large target and slows them. In Dragon Form, it passes through and explodes upon striking large enemies, leaving behind a trail of fire.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Shyvana.json"
    },
    "Skarner:W": {
      "champion": "Skarner",
      "slot": "W",
      "id": "SkarnerW",
      "name": "Seismic Bastion",
      "description": "Skarner gains a shield and creates an earthquake whose shockwave damages and slows foes.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Skarner.json"
    },
    "Urgot:W": {
      "champion": "Urgot",
      "slot": "W",
      "id": "UrgotW",
      "name": "Purge",
      "description": "Urgot slows himself while he unloads his weapon on nearby enemies. Prioritizes enemy champions Urgot has recently struck with other abilities and triggers Echoing Flames.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Urgot.json"
    },
    "Vel'Koz:E": {
      "champion": "Vel'Koz",
      "slot": "E",
      "id": "VelkozE",
      "name": "Tectonic Disruption",
      "description": "Vel'Koz causes an area to explode, knocking up enemies, and knocking close enemies slightly away.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Velkoz.json"
    },
    "Renata Glasc:E": {
      "champion": "Renata Glasc",
      "slot": "E",
      "id": "RenataE",
      "name": "Loyalty Program",
      "description": "Renata sends out a pair of chemtech missiles, shielding allies and damaging and slowing enemies hit.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Renata.json"
    },
    "Senna:E": {
      "champion": "Senna",
      "slot": "E",
      "id": "SennaE",
      "name": "Curse of the Black Mist",
      "description": "Senna draws the Mist she has stored in her weapon into a storm around her, embracing darkness and becoming a wraith within. Allies who enter the area are camouflaged and also appear as wraiths as the Mist shrouds them. Wraiths gain increased Move Speed, are unselectable, and hide their identities.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Senna.json"
    },
    "Pyke:Q": {
      "champion": "Pyke",
      "slot": "Q",
      "id": "PykeQ",
      "name": "Bone Skewer",
      "description": "Pyke either stabs an enemy in front of him or pulls an enemy towards him.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Pyke.json"
    },
    "Veigar:R": {
      "champion": "Veigar",
      "slot": "R",
      "id": "VeigarR",
      "name": "Primordial Burst",
      "description": "Blasts target enemy champion, dealing a large amount of magic damage, increasing based on the target's missing health.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Veigar.json"
    },
    "Rengar:W": {
      "champion": "Rengar",
      "slot": "W",
      "id": "RengarW",
      "name": "Battle Roar",
      "description": "Rengar lets out a battle roar, damaging enemies and healing for some of the recent damage he has taken. Ferocity effect: additionally breaks crowd control effects.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Rengar.json"
    },
    "Graves:P": {
      "champion": "Graves",
      "slot": "P",
      "id": null,
      "name": "New Destiny",
      "description": "Graves' shotgun has some unique properties. He must reload when he runs out of ammo. Attacks fire 4 bullets, which cannot pass through units. Non-champions struck by multiple bullets are knocked back.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Graves.json"
    },
    "Kindred:W": {
      "champion": "Kindred",
      "slot": "W",
      "id": "KindredW",
      "name": "Wolf's Frenzy",
      "description": "Wolf enrages and attacks enemies around him. Lamb passively gains stacks by moving and attacking. When fully charged, Lamb's next attack restores health.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Kindred.json"
    },
    "Caitlyn:P": {
      "champion": "Caitlyn",
      "slot": "P",
      "id": null,
      "name": "Headshot",
      "description": "Every few basic attacks, or against a target she has trapped or netted, Caitlyn will fire a headshot dealing bonus damage that scales with her critical strike chance. On trapped or netted targets, Caitlyn's Headshot attack range is doubled.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Caitlyn.json"
    },
    "Caitlyn:E": {
      "champion": "Caitlyn",
      "slot": "E",
      "id": "CaitlynE",
      "name": "90 Caliber Net",
      "description": "Caitlyn fires a heavy net to slow her target. The recoil knocks Caitlyn back.",
      "source": "https://ddragon.leagueoflegends.com/cdn/16.21.1/data/en_US/champion/Caitlyn.json"
    }
  }
};
