# Counter coverage audit

Research patch: **16.21.1**. Validated with **live Riot Data Dragon 16.21.1**.

Coverage: **173/173 champions**, **263/263 supported role combinations**, **454 directed entries**, **180 full rune plans**, and **433 referenced official abilities**.

Every row has a native same-role answer with a legal rune page. Both mechanical counters and conditional lane plans are included. The order reflects authored interaction type and priority, not measured win rates. Cross-role team-context entries are additional to this table.

Only explicitly researched pairings receive pages. Coverage of every champion does not mean every arbitrary champion pair, off-role matchup, or future patch has been reviewed.

Reproduce with `node scripts/check-counter-coverage.cjs --live --write-report`. The command reports drift and never rewrites ability evidence or matchup decisions.

| Enemy | Role | Researched answers |
| --- | --- | --- |
| Aatrox | Top | Fiora (mechanical) |
| Ahri | Mid | Yasuo (mechanical); Mel (mechanical) |
| Akali | Mid | Galio (mechanical); Lissandra (mechanical); Malzahar (mechanical); Vex (mechanical); Twisted Fate (mechanical) |
| Akali | Top | Poppy (mechanical); Twisted Fate (mechanical) |
| Akshan | Mid | Lissandra (mechanical) |
| Akshan | Top | Poppy (mechanical) |
| Alistar | Support | Janna (mechanical); Morgana (mechanical) |
| Ambessa | Top | Poppy (mechanical) |
| Amumu | Jungle | Morgana (mechanical) |
| Amumu | Support | Milio (mechanical); Morgana (mechanical) |
| Anivia | Mid | Qiyana (conditional) |
| Annie | Mid | Morgana (mechanical) |
| Annie | Support | Morgana (mechanical) |
| Aphelios | ADC | Yasuo (mechanical) |
| Ashe | ADC | Sivir (mechanical); Samira (mechanical); Yasuo (mechanical) |
| Ashe | Support | Morgana (mechanical) |
| Aurelion Sol | Mid | Ahri (mechanical); Anivia (mechanical) |
| Aurora | Mid | Yasuo (mechanical) |
| Aurora | Top | Yasuo (mechanical) |
| Azir | Mid | Taliyah (mechanical) |
| Bard | Support | Morgana (mechanical); Rakan (conditional) |
| Bel'Veth | Jungle | Poppy (mechanical); Rammus (mechanical); Jax (mechanical) |
| Blitzcrank | Support | Morgana (mechanical); Heimerdinger (mechanical); Zyra (mechanical) |
| Brand | Support | Xerath (conditional) |
| Brand | Mid | Xerath (conditional) |
| Brand | Jungle | Elise (mechanical) |
| Braum | Support | Lux (mechanical); Morgana (mechanical); Senna (mechanical); Vel'Koz (mechanical) |
| Briar | Jungle | Jax (mechanical) |
| Caitlyn | ADC | Yasuo (mechanical) |
| Camille | Top | Jax (mechanical); Poppy (mechanical) |
| Camille | Support | Morgana (mechanical); Poppy (mechanical) |
| Cassiopeia | Mid | Xerath (conditional) |
| Cassiopeia | Top | Cho'Gath (mechanical) |
| Cho'Gath | Top | Vayne (conditional) |
| Cho'Gath | Mid | Morgana (mechanical) |
| Corki | Mid | Yasuo (mechanical) |
| Corki | ADC | Yasuo (mechanical) |
| Darius | Top | Jax (mechanical); Vayne (conditional); Quinn (conditional) |
| Diana | Jungle | Poppy (mechanical) |
| Diana | Mid | Lissandra (mechanical) |
| Dr. Mundo | Top | Vayne (conditional) |
| Draven | ADC | Yasuo (mechanical); Miss Fortune (conditional) |
| Ekko | Jungle | Poppy (mechanical) |
| Ekko | Mid | Taliyah (mechanical) |
| Elise | Jungle | Nocturne (mechanical) |
| Evelynn | Jungle | Rek'Sai (conditional); Rengar (conditional) |
| Ezreal | ADC | Yasuo (mechanical); Smolder (conditional) |
| Fiddlesticks | Jungle | Morgana (mechanical); Viego (mechanical) |
| Fiddlesticks | Support | Morgana (mechanical) |
| Fiora | Top | Poppy (mechanical); Jax (mechanical) |
| Fizz | Mid | Lissandra (mechanical) |
| Galio | Mid | Morgana (mechanical); Corki (conditional) |
| Galio | Support | Morgana (mechanical) |
| Gangplank | Top | Riven (conditional) |
| Garen | Top | Jax (mechanical); Kayle (mechanical); Tryndamere (mechanical); Aurora (conditional); Jayce (conditional); Vayne (conditional); Quinn (conditional) |
| Gnar | Top | Fiora (mechanical); Ambessa (conditional) |
| Gragas | Top | Poppy (mechanical) |
| Gragas | Jungle | Morgana (mechanical); Poppy (mechanical) |
| Gragas | Support | Morgana (mechanical); Poppy (mechanical) |
| Graves | Jungle | Poppy (mechanical); Vi (mechanical) |
| Gwen | Top | Jax (mechanical); Poppy (mechanical) |
| Gwen | Jungle | Jax (mechanical); Poppy (mechanical) |
| Hecarim | Jungle | Poppy (mechanical) |
| Heimerdinger | Mid | Aurelion Sol (conditional); Syndra (conditional); Xerath (conditional); Ziggs (conditional) |
| Heimerdinger | Support | Xerath (conditional) |
| Heimerdinger | Top | Irelia (conditional) |
| Hwei | Mid | Morgana (mechanical); Yasuo (mechanical) |
| Hwei | Support | Morgana (mechanical) |
| Illaoi | Top | Fiora (mechanical); Mordekaiser (mechanical); K'Sante (conditional) |
| Irelia | Top | Poppy (mechanical); Volibear (conditional) |
| Irelia | Mid | Taliyah (mechanical) |
| Ivern | Jungle | Morgana (mechanical) |
| Janna | Support | Nami (mechanical); Nautilus (mechanical) |
| Jarvan IV | Jungle | Poppy (mechanical) |
| Jarvan IV | Top | Poppy (mechanical) |
| Jax | Top | Malphite (mechanical); Poppy (mechanical); Rumble (mechanical); Singed (mechanical) |
| Jax | Jungle | Poppy (mechanical) |
| Jayce | Top | Poppy (mechanical); Wukong (conditional) |
| Jayce | Mid | Syndra (mechanical) |
| Jhin | ADC | Sivir (mechanical); Ezreal (mechanical); Yasuo (mechanical); Kalista (conditional); Twitch (conditional); Yunara (conditional) |
| Jinx | ADC | Yasuo (mechanical) |
| K'Sante | Top | Fiora (mechanical); Camille (conditional) |
| Kai'Sa | ADC | Yasuo (mechanical) |
| Kalista | ADC | Ashe (mechanical); Jhin (mechanical); Yasuo (mechanical) |
| Karma | Support | Pyke (mechanical) |
| Karma | Mid | Syndra (conditional) |
| Karthus | Jungle | Xin Zhao (mechanical); Ekko (mechanical); Elise (mechanical); Evelynn (mechanical); Hecarim (mechanical); Kindred (mechanical); Master Yi (mechanical); Nunu & Willump (mechanical); Shaco (mechanical); Zac (mechanical); Bel'Veth (conditional); Kayn (conditional); Nidalee (conditional) |
| Karthus | Mid | Fizz (mechanical); Pantheon (mechanical); Vladimir (mechanical) |
| Kassadin | Mid | Akshan (conditional); Lucian (conditional); Talon (conditional) |
| Katarina | Mid | Galio (mechanical); Kassadin (mechanical); Lissandra (mechanical); Malzahar (mechanical); Cho'Gath (mechanical); Orianna (mechanical); Viktor (mechanical) |
| Kayle | Top | Akali (mechanical) |
| Kayle | Mid | Akali (mechanical) |
| Kayn | Jungle | Poppy (mechanical) |
| Kennen | Top | Sylas (mechanical) |
| Kennen | Mid | Sylas (mechanical) |
| Kha'Zix | Jungle | Poppy (mechanical); Ivern (mechanical) |
| Kindred | Jungle | Gragas (mechanical); Lee Sin (mechanical); Diana (conditional); Graves (conditional); Kha'Zix (conditional) |
| Kled | Top | Fiora (mechanical); Poppy (mechanical) |
| Kog'Maw | ADC | Yasuo (mechanical); Kai'Sa (conditional) |
| LeBlanc | Mid | Lissandra (mechanical); Vex (mechanical); Morgana (mechanical) |
| Lee Sin | Jungle | Poppy (mechanical) |
| Leona | Support | Morgana (mechanical); Thresh (mechanical); Karma (conditional) |
| Lillia | Jungle | Nocturne (mechanical); Briar (conditional) |
| Lillia | Top | Nasus (conditional) |
| Lissandra | Mid | Morgana (mechanical) |
| Locke | Mid | Cassiopeia (mechanical) |
| Locke | Jungle | Jax (mechanical) |
| Lucian | ADC | Yasuo (mechanical) |
| Lucian | Mid | Veigar (mechanical); Yasuo (mechanical) |
| Lulu | Support | Blitzcrank (mechanical) |
| Lux | Support | Morgana (mechanical) |
| Lux | Mid | Morgana (mechanical); Yasuo (mechanical) |
| Malphite | Top | Sylas (mechanical); Mordekaiser (conditional); Gwen (conditional) |
| Malphite | Support | Morgana (mechanical) |
| Malzahar | Mid | Morgana (mechanical) |
| Maokai | Support | Morgana (mechanical) |
| Maokai | Jungle | Morgana (mechanical) |
| Maokai | Top | Dr. Mundo (mechanical) |
| Master Yi | Jungle | Rammus (mechanical); Amumu (mechanical); Jax (mechanical); Maokai (mechanical); Sejuani (mechanical) |
| Mel | Mid | Morgana (mechanical) |
| Mel | Support | Morgana (mechanical) |
| Milio | Support | Blitzcrank (mechanical) |
| Miss Fortune | ADC | Yasuo (mechanical) |
| Mordekaiser | Top | Gwen (mechanical) |
| Mordekaiser | Jungle | Gwen (mechanical) |
| Morgana | Support | Rell (mechanical) |
| Morgana | Mid | Zed (conditional) |
| Morgana | Jungle | Rell (mechanical) |
| Naafiri | Mid | Taliyah (mechanical) |
| Nami | Support | Soraka (mechanical) |
| Nasus | Top | Jax (mechanical); Garen (conditional) |
| Nautilus | Support | Morgana (mechanical) |
| Nautilus | Jungle | Morgana (mechanical) |
| Neeko | Mid | Morgana (mechanical) |
| Neeko | Support | Morgana (mechanical) |
| Nidalee | Jungle | Poppy (mechanical) |
| Nilah | ADC | Caitlyn (mechanical); Jinx (mechanical); Xayah (mechanical) |
| Nocturne | Jungle | Olaf (mechanical) |
| Nunu & Willump | Jungle | Fiddlesticks (mechanical); Morgana (mechanical); Shyvana (mechanical); Skarner (mechanical) |
| Olaf | Top | Jarvan IV (mechanical); Trundle (conditional) |
| Olaf | Jungle | Jarvan IV (mechanical); Trundle (conditional) |
| Orianna | Mid | Fizz (mechanical) |
| Ornn | Top | Fiora (mechanical); Illaoi (conditional) |
| Pantheon | Top | Poppy (mechanical) |
| Pantheon | Support | Poppy (mechanical) |
| Pantheon | Mid | Lissandra (mechanical) |
| Poppy | Top | Olaf (mechanical) |
| Poppy | Jungle | Olaf (mechanical) |
| Poppy | Support | Morgana (mechanical) |
| Pyke | Support | Lulu (mechanical); Soraka (mechanical); Renata Glasc (conditional); Sona (conditional); Yuumi (conditional) |
| Qiyana | Mid | Taliyah (mechanical) |
| Qiyana | Jungle | Poppy (mechanical); Taliyah (mechanical) |
| Quinn | Top | Nasus (conditional) |
| Rakan | Support | Janna (mechanical); Morgana (mechanical); Poppy (mechanical); Alistar (mechanical) |
| Rammus | Jungle | Trundle (mechanical); Lillia (mechanical); Karthus (conditional) |
| Rek'Sai | Jungle | Poppy (mechanical) |
| Rell | Support | Morgana (mechanical); Poppy (mechanical); Swain (conditional) |
| Rell | Jungle | Morgana (mechanical); Poppy (mechanical) |
| Renata Glasc | Support | Milio (mechanical) |
| Renekton | Top | Poppy (mechanical) |
| Rengar | Jungle | Poppy (mechanical) |
| Rengar | Top | Poppy (mechanical) |
| Riven | Top | Poppy (mechanical); Renekton (mechanical) |
| Rumble | Top | Vayne (conditional) |
| Rumble | Mid | Syndra (conditional) |
| Ryze | Mid | Cassiopeia (mechanical) |
| Ryze | Top | Cassiopeia (mechanical) |
| Samira | ADC | Tristana (mechanical); Yasuo (mechanical) |
| Sejuani | Jungle | Morgana (mechanical); Poppy (mechanical); Udyr (mechanical) |
| Sejuani | Top | Poppy (mechanical); Udyr (mechanical) |
| Senna | Support | Pyke (mechanical) |
| Senna | ADC | Yasuo (mechanical) |
| Seraphine | Support | Morgana (mechanical) |
| Seraphine | Mid | Morgana (mechanical); Yasuo (mechanical) |
| Seraphine | ADC | Yasuo (mechanical) |
| Sett | Top | Jax (mechanical); Urgot (mechanical); Gnar (conditional); Vayne (conditional) |
| Sett | Support | Ashe (conditional) |
| Shaco | Jungle | Morgana (mechanical) |
| Shaco | Support | Morgana (mechanical) |
| Shen | Top | Fiora (mechanical); Gangplank (mechanical); Poppy (mechanical) |
| Shen | Support | Morgana (mechanical); Poppy (mechanical) |
| Shyvana | Jungle | Jax (mechanical) |
| Shyvana | Top | Jax (mechanical) |
| Singed | Top | Heimerdinger (conditional) |
| Sion | Top | Aatrox (mechanical); Darius (mechanical); Fiora (mechanical); Kled (mechanical); Riven (mechanical); Zaahen (mechanical) |
| Sivir | ADC | Yasuo (mechanical); Kog'Maw (conditional) |
| Skarner | Jungle | Morgana (mechanical) |
| Skarner | Top | Olaf (mechanical) |
| Smolder | ADC | Yasuo (mechanical); Draven (conditional) |
| Smolder | Mid | Yasuo (mechanical) |
| Sona | Support | Seraphine (conditional) |
| Soraka | Support | Blitzcrank (mechanical) |
| Swain | Support | Morgana (mechanical) |
| Swain | Mid | Morgana (mechanical) |
| Sylas | Mid | Cassiopeia (mechanical); Taliyah (mechanical) |
| Sylas | Top | Poppy (mechanical) |
| Syndra | Mid | Naafiri (mechanical); Yasuo (mechanical) |
| Tahm Kench | Support | Morgana (mechanical) |
| Tahm Kench | Top | Vayne (conditional) |
| Taliyah | Mid | Zed (conditional) |
| Taliyah | Jungle | Kayn (conditional) |
| Talon | Mid | Ryze (mechanical) |
| Talon | Jungle | Poppy (mechanical) |
| Taric | Support | Morgana (mechanical); Bard (conditional) |
| Teemo | Top | Rumble (mechanical); Sion (conditional) |
| Teemo | Support | Morgana (mechanical) |
| Thresh | Support | Morgana (mechanical) |
| Tristana | ADC | Yasuo (mechanical) |
| Tristana | Mid | Yasuo (mechanical) |
| Trundle | Top | Jax (mechanical); Ornn (mechanical) |
| Trundle | Jungle | Jax (mechanical) |
| Tryndamere | Top | Jax (mechanical); Malphite (mechanical); Nasus (mechanical); Poppy (mechanical); Shen (mechanical); Teemo (mechanical) |
| Twisted Fate | Mid | Yasuo (mechanical) |
| Twisted Fate | Top | Jax (mechanical) |
| Twitch | ADC | Yasuo (mechanical) |
| Twitch | Support | Lulu (conditional) |
| Udyr | Jungle | Jax (mechanical) |
| Udyr | Top | Jax (mechanical) |
| Urgot | Top | Fiora (mechanical) |
| Varus | ADC | Sivir (mechanical); Yasuo (mechanical) |
| Vayne | ADC | Nilah (mechanical); Varus (mechanical); Yasuo (mechanical); Aphelios (conditional) |
| Vayne | Top | Yasuo (mechanical) |
| Veigar | Mid | Kassadin (mechanical); Katarina (mechanical); Locke (mechanical); Morgana (mechanical); LeBlanc (conditional); Zed (conditional) |
| Veigar | Support | Morgana (mechanical) |
| Vel'Koz | Support | Hwei (mechanical) |
| Vel'Koz | Mid | Hwei (mechanical); Yasuo (mechanical); Yone (mechanical); Zoe (mechanical) |
| Vex | Mid | Xerath (conditional) |
| Vi | Jungle | Poppy (mechanical) |
| Viego | Jungle | Poppy (mechanical) |
| Viktor | Mid | Kassadin (mechanical) |
| Vladimir | Mid | Malzahar (mechanical) |
| Vladimir | Top | Yorick (mechanical) |
| Volibear | Top | Jax (mechanical) |
| Volibear | Jungle | Jax (mechanical) |
| Warwick | Jungle | Jax (mechanical) |
| Warwick | Top | Teemo (mechanical) |
| Wukong | Top | Jax (mechanical); Poppy (mechanical) |
| Wukong | Jungle | Jax (mechanical); Poppy (mechanical) |
| Xayah | ADC | Yasuo (mechanical) |
| Xerath | Support | Nautilus (mechanical) |
| Xerath | Mid | Yasuo (mechanical) |
| Xin Zhao | Jungle | Jax (mechanical); Poppy (mechanical) |
| Yasuo | Mid | Malzahar (mechanical); Taliyah (mechanical); Vex (mechanical); Annie (mechanical); Kennen (mechanical); Neeko (mechanical) |
| Yasuo | Top | Kennen (mechanical); Poppy (mechanical); Sett (mechanical) |
| Yasuo | ADC | Nilah (mechanical) |
| Yone | Mid | Vex (mechanical); Azir (mechanical) |
| Yone | Top | Poppy (mechanical); Warwick (conditional) |
| Yorick | Top | Irelia (conditional) |
| Yunara | ADC | Yasuo (mechanical) |
| Yuumi | Support | Leona (conditional) |
| Zaahen | Top | Fiora (mechanical); Poppy (mechanical) |
| Zaahen | Jungle | Poppy (mechanical) |
| Zac | Jungle | Poppy (mechanical); Brand (conditional) |
| Zac | Top | Poppy (mechanical) |
| Zac | Support | Poppy (mechanical) |
| Zed | Mid | Lissandra (mechanical); Kayle (mechanical); Zilean (mechanical) |
| Zeri | ADC | Yasuo (mechanical) |
| Ziggs | ADC | Yasuo (mechanical) |
| Ziggs | Mid | Yasuo (mechanical) |
| Zilean | Support | Morgana (mechanical) |
| Zilean | Mid | Morgana (mechanical) |
| Zoe | Mid | Morgana (mechanical); Yasuo (mechanical) |
| Zyra | Support | Morgana (mechanical) |
