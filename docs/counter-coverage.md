# Counter coverage audit

Research patch: **16.21.1**. Validated with **live Riot Data Dragon 16.21.1**.

Coverage: **173/173 champions**, **263/263 supported role combinations**, **855 directed entries**, **180 full rune plans**, and **495 referenced official abilities**.

Every row has at least three distinct native same-role picks, each with a legal rune page. Both mechanical counters and conditional lane plans are included. The order reflects authored interaction type and priority, not measured win rates. Cross-role team-context entries are additional to this table.

Only explicitly researched pairings receive pages. Coverage of every champion does not mean every arbitrary champion pair, off-role matchup, or future patch has been reviewed.

Reproduce with `node scripts/check-counter-coverage.cjs --live --write-report`. The command reports drift and never rewrites ability evidence or matchup decisions.

| Enemy | Role | Researched answers |
| --- | --- | --- |
| Aatrox | Top | Fiora (mechanical); Olaf (mechanical); Poppy (mechanical) |
| Ahri | Mid | Yasuo (mechanical); Mel (mechanical); Fizz (conditional) |
| Akali | Mid | Galio (mechanical); Lissandra (mechanical); Malzahar (mechanical); Vex (mechanical); Twisted Fate (mechanical) |
| Akali | Top | Poppy (mechanical); Twisted Fate (mechanical); Olaf (mechanical) |
| Akshan | Mid | Lissandra (mechanical); Malzahar (mechanical); Taliyah (mechanical) |
| Akshan | Top | Poppy (mechanical); Jax (mechanical); Malphite (conditional) |
| Alistar | Support | Janna (mechanical); Morgana (mechanical); Milio (conditional) |
| Ambessa | Top | Poppy (mechanical); Jax (mechanical); Olaf (mechanical) |
| Amumu | Jungle | Morgana (mechanical); Nocturne (mechanical); Olaf (mechanical) |
| Amumu | Support | Milio (mechanical); Morgana (mechanical); Janna (conditional) |
| Anivia | Mid | Malzahar (mechanical); Qiyana (conditional); Fizz (conditional) |
| Annie | Mid | Morgana (mechanical); Malzahar (mechanical); Fizz (conditional) |
| Annie | Support | Morgana (mechanical); Braum (mechanical); Milio (mechanical) |
| Aphelios | ADC | Yasuo (mechanical); Sivir (mechanical); Xayah (conditional) |
| Ashe | ADC | Sivir (mechanical); Samira (mechanical); Yasuo (mechanical) |
| Ashe | Support | Morgana (mechanical); Braum (mechanical); Milio (mechanical) |
| Aurelion Sol | Mid | Ahri (mechanical); Anivia (mechanical); Malzahar (mechanical) |
| Aurora | Mid | Yasuo (mechanical); Malzahar (mechanical); Fizz (conditional) |
| Aurora | Top | Yasuo (mechanical); Cassiopeia (mechanical); Poppy (mechanical) |
| Azir | Mid | Taliyah (mechanical); Malzahar (mechanical); Xerath (conditional) |
| Bard | Support | Morgana (mechanical); Milio (mechanical); Rakan (conditional) |
| Bel'Veth | Jungle | Poppy (mechanical); Rammus (mechanical); Jax (mechanical) |
| Blitzcrank | Support | Morgana (mechanical); Heimerdinger (mechanical); Zyra (mechanical) |
| Brand | Support | Braum (mechanical); Milio (mechanical); Xerath (conditional) |
| Brand | Mid | Morgana (mechanical); Xerath (conditional); Fizz (conditional) |
| Brand | Jungle | Elise (mechanical); Nocturne (mechanical); Rengar (mechanical) |
| Braum | Support | Lux (mechanical); Morgana (mechanical); Senna (mechanical); Vel'Koz (mechanical) |
| Briar | Jungle | Jax (mechanical); Nocturne (mechanical); Olaf (mechanical) |
| Caitlyn | ADC | Yasuo (mechanical); Sivir (mechanical); Xayah (conditional) |
| Camille | Top | Jax (mechanical); Poppy (mechanical); Renekton (mechanical) |
| Camille | Support | Morgana (mechanical); Poppy (mechanical); Janna (mechanical) |
| Cassiopeia | Mid | Xerath (conditional); Fizz (conditional); Syndra (conditional) |
| Cassiopeia | Top | Cho'Gath (mechanical); Gangplank (mechanical); Yorick (conditional) |
| Cho'Gath | Top | Fiora (mechanical); Olaf (mechanical); Vayne (conditional) |
| Cho'Gath | Mid | Morgana (mechanical); Fizz (conditional); Xerath (conditional) |
| Corki | Mid | Yasuo (mechanical); Cassiopeia (mechanical); Fizz (conditional) |
| Corki | ADC | Yasuo (mechanical); Sivir (mechanical); Xayah (conditional) |
| Darius | Top | Jax (mechanical); Vayne (conditional); Quinn (conditional) |
| Diana | Jungle | Poppy (mechanical); Nocturne (mechanical); Olaf (mechanical) |
| Diana | Mid | Lissandra (mechanical); Cassiopeia (mechanical); Malzahar (mechanical) |
| Dr. Mundo | Top | Fiora (mechanical); Vayne (conditional); Gwen (conditional) |
| Draven | ADC | Yasuo (mechanical); Sivir (mechanical); Miss Fortune (conditional) |
| Ekko | Jungle | Poppy (mechanical); Nocturne (mechanical); Olaf (mechanical) |
| Ekko | Mid | Taliyah (mechanical); Malzahar (mechanical); Lissandra (conditional) |
| Elise | Jungle | Nocturne (mechanical); Olaf (mechanical); Rengar (mechanical) |
| Evelynn | Jungle | Olaf (mechanical); Rek'Sai (conditional); Rengar (conditional) |
| Ezreal | ADC | Yasuo (mechanical); Sivir (mechanical); Smolder (conditional) |
| Fiddlesticks | Jungle | Morgana (mechanical); Viego (mechanical); Olaf (mechanical) |
| Fiddlesticks | Support | Morgana (mechanical); Janna (mechanical); Milio (mechanical) |
| Fiora | Top | Poppy (mechanical); Jax (mechanical); Olaf (mechanical) |
| Fizz | Mid | Lissandra (mechanical); Malzahar (mechanical); Galio (conditional) |
| Galio | Mid | Morgana (mechanical); Corki (conditional); Fizz (conditional) |
| Galio | Support | Morgana (mechanical); Janna (mechanical); Milio (mechanical) |
| Gangplank | Top | Riven (conditional); Akshan (conditional); Irelia (conditional) |
| Garen | Top | Jax (mechanical); Kayle (mechanical); Tryndamere (mechanical); Aurora (conditional); Jayce (conditional); Vayne (conditional); Quinn (conditional) |
| Gnar | Top | Fiora (mechanical); Olaf (mechanical); Ambessa (conditional) |
| Gragas | Top | Poppy (mechanical); Fiora (mechanical); Olaf (mechanical) |
| Gragas | Jungle | Morgana (mechanical); Poppy (mechanical); Nocturne (mechanical); Olaf (mechanical) |
| Gragas | Support | Morgana (mechanical); Poppy (mechanical); Janna (mechanical) |
| Graves | Jungle | Poppy (mechanical); Vi (mechanical); Rammus (conditional) |
| Gwen | Top | Jax (mechanical); Poppy (mechanical); Riven (conditional) |
| Gwen | Jungle | Jax (mechanical); Poppy (mechanical); Elise (conditional) |
| Hecarim | Jungle | Poppy (mechanical); Nocturne (mechanical); Trundle (conditional) |
| Heimerdinger | Mid | Aurelion Sol (conditional); Syndra (conditional); Xerath (conditional); Ziggs (conditional) |
| Heimerdinger | Support | Xerath (conditional); Vel'Koz (conditional); Zyra (conditional) |
| Heimerdinger | Top | Olaf (mechanical); Yasuo (mechanical); Irelia (conditional) |
| Hwei | Mid | Morgana (mechanical); Yasuo (mechanical); Fizz (conditional) |
| Hwei | Support | Morgana (mechanical); Braum (mechanical); Milio (mechanical) |
| Illaoi | Top | Fiora (mechanical); Mordekaiser (mechanical); K'Sante (conditional) |
| Irelia | Top | Poppy (mechanical); Fiora (mechanical); Olaf (mechanical); Volibear (conditional) |
| Irelia | Mid | Taliyah (mechanical); Cassiopeia (mechanical); Malzahar (mechanical) |
| Ivern | Jungle | Morgana (mechanical); Nocturne (mechanical); Olaf (mechanical) |
| Janna | Support | Nami (mechanical); Nautilus (mechanical); Zyra (conditional) |
| Jarvan IV | Jungle | Poppy (mechanical); Nocturne (mechanical); Olaf (mechanical) |
| Jarvan IV | Top | Poppy (mechanical); Fiora (mechanical); Olaf (mechanical) |
| Jax | Top | Malphite (mechanical); Poppy (mechanical); Rumble (mechanical); Singed (mechanical) |
| Jax | Jungle | Poppy (mechanical); Nocturne (mechanical); Olaf (mechanical) |
| Jayce | Top | Poppy (mechanical); Olaf (mechanical); Wukong (conditional) |
| Jayce | Mid | Syndra (mechanical); Cassiopeia (mechanical); Xerath (conditional) |
| Jhin | ADC | Sivir (mechanical); Ezreal (mechanical); Yasuo (mechanical); Kalista (conditional); Twitch (conditional); Yunara (conditional) |
| Jinx | ADC | Yasuo (mechanical); Sivir (mechanical); Xayah (conditional) |
| K'Sante | Top | Fiora (mechanical); Olaf (mechanical); Camille (conditional) |
| Kai'Sa | ADC | Yasuo (mechanical); Sivir (mechanical); Xayah (conditional) |
| Kalista | ADC | Ashe (mechanical); Jhin (mechanical); Yasuo (mechanical) |
| Karma | Support | Pyke (mechanical); Blitzcrank (mechanical); Rell (mechanical) |
| Karma | Mid | Morgana (mechanical); Syndra (conditional); Fizz (conditional) |
| Karthus | Jungle | Xin Zhao (mechanical); Ekko (mechanical); Elise (mechanical); Evelynn (mechanical); Hecarim (mechanical); Kindred (mechanical); Master Yi (mechanical); Nunu & Willump (mechanical); Shaco (mechanical); Zac (mechanical); Bel'Veth (conditional); Kayn (conditional); Nidalee (conditional) |
| Karthus | Mid | Fizz (mechanical); Pantheon (mechanical); Vladimir (mechanical) |
| Kassadin | Mid | Akshan (conditional); Lucian (conditional); Talon (conditional) |
| Katarina | Mid | Galio (mechanical); Kassadin (mechanical); Lissandra (mechanical); Malzahar (mechanical); Cho'Gath (mechanical); Orianna (mechanical); Viktor (mechanical) |
| Kayle | Top | Akali (mechanical); Jax (mechanical); Nasus (conditional) |
| Kayle | Mid | Akali (mechanical); Malzahar (mechanical); Xerath (conditional) |
| Kayn | Jungle | Poppy (mechanical); Nocturne (mechanical); Olaf (mechanical) |
| Kennen | Top | Sylas (mechanical); Fiora (mechanical); Olaf (mechanical) |
| Kennen | Mid | Sylas (mechanical); Morgana (mechanical); Fizz (conditional) |
| Kha'Zix | Jungle | Poppy (mechanical); Ivern (mechanical); Nocturne (mechanical) |
| Kindred | Jungle | Gragas (mechanical); Lee Sin (mechanical); Diana (conditional); Graves (conditional); Kha'Zix (conditional) |
| Kled | Top | Fiora (mechanical); Poppy (mechanical); Olaf (mechanical) |
| Kog'Maw | ADC | Yasuo (mechanical); Sivir (mechanical); Kai'Sa (conditional) |
| LeBlanc | Mid | Lissandra (mechanical); Vex (mechanical); Morgana (mechanical) |
| Lee Sin | Jungle | Poppy (mechanical); Nocturne (mechanical); Olaf (mechanical) |
| Leona | Support | Morgana (mechanical); Thresh (mechanical); Karma (conditional) |
| Lillia | Jungle | Nocturne (mechanical); Olaf (mechanical); Briar (conditional) |
| Lillia | Top | Olaf (mechanical); Nasus (conditional); Teemo (conditional) |
| Lissandra | Mid | Morgana (mechanical); Malzahar (mechanical); Fizz (conditional) |
| Locke | Mid | Cassiopeia (mechanical); Lissandra (mechanical); Malzahar (mechanical) |
| Locke | Jungle | Jax (mechanical); Kindred (mechanical); Rammus (conditional) |
| Lucian | ADC | Yasuo (mechanical); Sivir (mechanical); Xayah (conditional) |
| Lucian | Mid | Veigar (mechanical); Yasuo (mechanical); Cassiopeia (mechanical) |
| Lulu | Support | Blitzcrank (mechanical); Rell (mechanical); Zyra (conditional) |
| Lux | Support | Morgana (mechanical); Braum (mechanical); Milio (mechanical) |
| Lux | Mid | Morgana (mechanical); Yasuo (mechanical); Fizz (conditional) |
| Malphite | Top | Sylas (mechanical); Mordekaiser (conditional); Gwen (conditional) |
| Malphite | Support | Morgana (mechanical); Janna (conditional); Taric (conditional) |
| Malzahar | Mid | Morgana (mechanical); Fizz (conditional); Xerath (conditional) |
| Maokai | Support | Morgana (mechanical); Milio (mechanical); Janna (conditional) |
| Maokai | Jungle | Morgana (mechanical); Nocturne (mechanical); Olaf (mechanical) |
| Maokai | Top | Dr. Mundo (mechanical); Fiora (mechanical); Olaf (mechanical) |
| Master Yi | Jungle | Rammus (mechanical); Amumu (mechanical); Jax (mechanical); Maokai (mechanical); Sejuani (mechanical) |
| Mel | Mid | Morgana (mechanical); Fizz (conditional); Vel'Koz (conditional) |
| Mel | Support | Morgana (mechanical); Milio (mechanical); Blitzcrank (conditional) |
| Milio | Support | Blitzcrank (mechanical); Braum (mechanical); Rell (mechanical) |
| Miss Fortune | ADC | Yasuo (mechanical); Sivir (mechanical); Xayah (conditional) |
| Mordekaiser | Top | Gwen (mechanical); Fiora (mechanical); Olaf (mechanical) |
| Mordekaiser | Jungle | Gwen (mechanical); Nocturne (mechanical); Olaf (mechanical) |
| Morgana | Support | Rell (mechanical); Braum (mechanical); Milio (mechanical) |
| Morgana | Mid | Zed (conditional); Fizz (conditional); Xerath (conditional) |
| Morgana | Jungle | Rell (mechanical); Nocturne (mechanical); Olaf (mechanical) |
| Naafiri | Mid | Taliyah (mechanical); Cassiopeia (mechanical); Malzahar (mechanical) |
| Nami | Support | Soraka (mechanical); Braum (mechanical); Sona (conditional) |
| Nasus | Top | Jax (mechanical); Fiora (mechanical); Olaf (mechanical); Garen (conditional) |
| Nautilus | Support | Morgana (mechanical); Janna (conditional); Taric (conditional) |
| Nautilus | Jungle | Morgana (mechanical); Nocturne (mechanical); Olaf (mechanical) |
| Neeko | Mid | Morgana (mechanical); Fizz (conditional); Xerath (conditional) |
| Neeko | Support | Morgana (mechanical); Braum (mechanical); Milio (mechanical) |
| Nidalee | Jungle | Poppy (mechanical); Nocturne (mechanical); Xin Zhao (mechanical) |
| Nilah | ADC | Caitlyn (mechanical); Jinx (mechanical); Xayah (mechanical) |
| Nocturne | Jungle | Olaf (mechanical); Rengar (mechanical); Kindred (conditional) |
| Nunu & Willump | Jungle | Fiddlesticks (mechanical); Morgana (mechanical); Shyvana (mechanical); Skarner (mechanical) |
| Olaf | Top | Jarvan IV (mechanical); Trundle (conditional); Gwen (conditional) |
| Olaf | Jungle | Jarvan IV (mechanical); Trundle (conditional); Kindred (conditional) |
| Orianna | Mid | Fizz (mechanical); Vel'Koz (conditional); Xerath (conditional) |
| Ornn | Top | Fiora (mechanical); Olaf (mechanical); Illaoi (conditional) |
| Pantheon | Top | Poppy (mechanical); Fiora (mechanical); Olaf (mechanical) |
| Pantheon | Support | Poppy (mechanical); Janna (mechanical); Milio (mechanical) |
| Pantheon | Mid | Lissandra (mechanical); Malzahar (mechanical); Syndra (mechanical) |
| Poppy | Top | Olaf (mechanical); Fiora (mechanical); Trundle (conditional) |
| Poppy | Jungle | Olaf (mechanical); Nocturne (mechanical); Trundle (conditional) |
| Poppy | Support | Morgana (mechanical); Milio (mechanical); Janna (conditional) |
| Pyke | Support | Lulu (mechanical); Soraka (mechanical); Renata Glasc (conditional); Sona (conditional); Yuumi (conditional) |
| Qiyana | Mid | Taliyah (mechanical); Cassiopeia (mechanical); Lissandra (mechanical); Malzahar (mechanical) |
| Qiyana | Jungle | Poppy (mechanical); Taliyah (mechanical); Nocturne (mechanical); Olaf (mechanical) |
| Quinn | Top | Fiora (mechanical); Olaf (mechanical); Nasus (conditional) |
| Rakan | Support | Janna (mechanical); Morgana (mechanical); Poppy (mechanical); Alistar (mechanical) |
| Rammus | Jungle | Trundle (mechanical); Lillia (mechanical); Karthus (conditional) |
| Rek'Sai | Jungle | Poppy (mechanical); Nocturne (mechanical); Olaf (mechanical) |
| Rell | Support | Morgana (mechanical); Poppy (mechanical); Swain (conditional) |
| Rell | Jungle | Morgana (mechanical); Poppy (mechanical); Olaf (mechanical) |
| Renata Glasc | Support | Milio (mechanical); Blitzcrank (mechanical); Braum (mechanical) |
| Renekton | Top | Poppy (mechanical); Fiora (mechanical); Olaf (mechanical) |
| Rengar | Jungle | Poppy (mechanical); Nocturne (mechanical); Olaf (mechanical) |
| Rengar | Top | Poppy (mechanical); Fiora (mechanical); Olaf (mechanical) |
| Riven | Top | Poppy (mechanical); Renekton (mechanical); Garen (mechanical) |
| Rumble | Top | Vayne (conditional); Cho'Gath (conditional); Gwen (conditional) |
| Rumble | Mid | Syndra (conditional); Fizz (conditional); Xerath (conditional) |
| Ryze | Mid | Cassiopeia (mechanical); Fizz (conditional); Xerath (conditional) |
| Ryze | Top | Cassiopeia (mechanical); Fiora (mechanical); Olaf (mechanical) |
| Samira | ADC | Tristana (mechanical); Yasuo (mechanical); Sivir (mechanical) |
| Sejuani | Jungle | Morgana (mechanical); Poppy (mechanical); Udyr (mechanical); Olaf (mechanical) |
| Sejuani | Top | Poppy (mechanical); Udyr (mechanical); Fiora (mechanical); Olaf (mechanical) |
| Senna | Support | Pyke (mechanical); Braum (mechanical); Zyra (conditional) |
| Senna | ADC | Yasuo (mechanical); Sivir (mechanical); Xayah (conditional) |
| Seraphine | Support | Morgana (mechanical); Braum (mechanical); Milio (mechanical) |
| Seraphine | Mid | Morgana (mechanical); Yasuo (mechanical); Fizz (conditional) |
| Seraphine | ADC | Yasuo (mechanical); Sivir (mechanical); Xayah (conditional) |
| Sett | Top | Jax (mechanical); Urgot (mechanical); Gnar (conditional); Vayne (conditional) |
| Sett | Support | Ashe (conditional); Janna (conditional); Zyra (conditional) |
| Shaco | Jungle | Morgana (mechanical); Nocturne (mechanical); Olaf (mechanical) |
| Shaco | Support | Morgana (mechanical); Braum (mechanical); Milio (mechanical) |
| Shen | Top | Fiora (mechanical); Gangplank (mechanical); Poppy (mechanical); Olaf (mechanical) |
| Shen | Support | Morgana (mechanical); Poppy (mechanical); Milio (mechanical) |
| Shyvana | Jungle | Jax (mechanical); Gwen (conditional); Trundle (conditional) |
| Shyvana | Top | Jax (mechanical); Gwen (conditional); Trundle (conditional) |
| Singed | Top | Fiora (mechanical); Olaf (mechanical); Heimerdinger (conditional) |
| Sion | Top | Aatrox (mechanical); Darius (mechanical); Fiora (mechanical); Kled (mechanical); Riven (mechanical); Zaahen (mechanical) |
| Sivir | ADC | Yasuo (mechanical); Kog'Maw (conditional); Caitlyn (conditional) |
| Skarner | Jungle | Morgana (mechanical); Nocturne (mechanical); Olaf (mechanical) |
| Skarner | Top | Olaf (mechanical); Fiora (mechanical); Trundle (conditional) |
| Smolder | ADC | Yasuo (mechanical); Sivir (mechanical); Draven (conditional) |
| Smolder | Mid | Yasuo (mechanical); Cassiopeia (mechanical); Xerath (conditional) |
| Sona | Support | Seraphine (conditional); Blitzcrank (conditional); Pyke (conditional) |
| Soraka | Support | Blitzcrank (mechanical); Leona (mechanical); Pyke (conditional) |
| Swain | Support | Morgana (mechanical); Braum (mechanical); Milio (mechanical) |
| Swain | Mid | Morgana (mechanical); Fizz (conditional); Xerath (conditional) |
| Sylas | Mid | Cassiopeia (mechanical); Taliyah (mechanical); Malzahar (mechanical) |
| Sylas | Top | Poppy (mechanical); Cassiopeia (mechanical); Olaf (mechanical) |
| Syndra | Mid | Naafiri (mechanical); Yasuo (mechanical); Fizz (conditional) |
| Tahm Kench | Support | Morgana (mechanical); Milio (mechanical); Rell (mechanical) |
| Tahm Kench | Top | Fiora (mechanical); Olaf (mechanical); Vayne (conditional) |
| Taliyah | Mid | Zed (conditional); Fizz (conditional); Vel'Koz (conditional) |
| Taliyah | Jungle | Nocturne (mechanical); Olaf (mechanical); Kayn (conditional) |
| Talon | Mid | Ryze (mechanical); Cassiopeia (mechanical); Malzahar (mechanical) |
| Talon | Jungle | Poppy (mechanical); Lee Sin (conditional); Rengar (conditional) |
| Taric | Support | Morgana (mechanical); Milio (mechanical); Bard (conditional) |
| Teemo | Top | Rumble (mechanical); Sion (conditional); Cho'Gath (conditional) |
| Teemo | Support | Morgana (mechanical); Braum (mechanical); Milio (mechanical) |
| Thresh | Support | Morgana (mechanical); Braum (mechanical); Janna (conditional) |
| Tristana | ADC | Yasuo (mechanical); Sivir (mechanical); Xayah (conditional) |
| Tristana | Mid | Yasuo (mechanical); Cassiopeia (mechanical); Malzahar (mechanical) |
| Trundle | Top | Jax (mechanical); Ornn (mechanical); Gwen (conditional) |
| Trundle | Jungle | Jax (mechanical); Gwen (conditional); Kindred (conditional) |
| Tryndamere | Top | Jax (mechanical); Malphite (mechanical); Nasus (mechanical); Poppy (mechanical); Shen (mechanical); Teemo (mechanical) |
| Twisted Fate | Mid | Yasuo (mechanical); Morgana (mechanical); Fizz (conditional) |
| Twisted Fate | Top | Jax (mechanical); Fiora (mechanical); Olaf (mechanical) |
| Twitch | ADC | Yasuo (mechanical); Sivir (mechanical); Xayah (conditional) |
| Twitch | Support | Braum (mechanical); Lulu (conditional); Janna (conditional) |
| Udyr | Jungle | Jax (mechanical); Nocturne (mechanical); Olaf (mechanical) |
| Udyr | Top | Jax (mechanical); Fiora (mechanical); Olaf (mechanical) |
| Urgot | Top | Fiora (mechanical); Jax (mechanical); Olaf (mechanical) |
| Varus | ADC | Sivir (mechanical); Yasuo (mechanical); Xayah (conditional) |
| Vayne | ADC | Nilah (mechanical); Varus (mechanical); Yasuo (mechanical); Aphelios (conditional) |
| Vayne | Top | Yasuo (mechanical); Fiora (mechanical); Olaf (mechanical) |
| Veigar | Mid | Kassadin (mechanical); Katarina (mechanical); Locke (mechanical); Morgana (mechanical); LeBlanc (conditional); Zed (conditional) |
| Veigar | Support | Morgana (mechanical); Braum (mechanical); Milio (mechanical) |
| Vel'Koz | Support | Hwei (mechanical); Leona (mechanical); Nautilus (mechanical) |
| Vel'Koz | Mid | Hwei (mechanical); Yasuo (mechanical); Yone (mechanical); Zoe (mechanical) |
| Vex | Mid | Morgana (mechanical); Xerath (conditional); Fizz (conditional) |
| Vi | Jungle | Poppy (mechanical); Nocturne (mechanical); Olaf (mechanical) |
| Viego | Jungle | Poppy (mechanical); Nocturne (mechanical); Olaf (mechanical) |
| Viktor | Mid | Kassadin (mechanical); Fizz (conditional); Vel'Koz (conditional) |
| Vladimir | Mid | Malzahar (mechanical); Anivia (conditional); Xerath (conditional) |
| Vladimir | Top | Yorick (mechanical); Irelia (conditional); Nasus (conditional) |
| Volibear | Top | Jax (mechanical); Fiora (mechanical); Olaf (mechanical) |
| Volibear | Jungle | Jax (mechanical); Nocturne (mechanical); Olaf (mechanical) |
| Warwick | Jungle | Jax (mechanical); Nocturne (mechanical); Olaf (mechanical) |
| Warwick | Top | Teemo (mechanical); Fiora (mechanical); Olaf (mechanical) |
| Wukong | Top | Jax (mechanical); Poppy (mechanical); Fiora (mechanical); Olaf (mechanical) |
| Wukong | Jungle | Jax (mechanical); Poppy (mechanical); Olaf (mechanical) |
| Xayah | ADC | Yasuo (mechanical); Sivir (mechanical); Caitlyn (conditional) |
| Xerath | Support | Nautilus (mechanical); Leona (mechanical); Pyke (mechanical) |
| Xerath | Mid | Yasuo (mechanical); Fizz (conditional); Zed (conditional) |
| Xin Zhao | Jungle | Jax (mechanical); Poppy (mechanical); Olaf (mechanical) |
| Yasuo | Mid | Malzahar (mechanical); Taliyah (mechanical); Vex (mechanical); Annie (mechanical); Kennen (mechanical); Neeko (mechanical) |
| Yasuo | Top | Kennen (mechanical); Poppy (mechanical); Sett (mechanical) |
| Yasuo | ADC | Nilah (mechanical); Sivir (mechanical); Xayah (conditional) |
| Yone | Mid | Vex (mechanical); Azir (mechanical); Malzahar (mechanical) |
| Yone | Top | Poppy (mechanical); Olaf (mechanical); Warwick (conditional) |
| Yorick | Top | Jax (mechanical); Renekton (mechanical); Irelia (conditional) |
| Yunara | ADC | Yasuo (mechanical); Sivir (mechanical); Xayah (conditional) |
| Yuumi | Support | Rell (mechanical); Leona (conditional); Nautilus (conditional) |
| Zaahen | Top | Fiora (mechanical); Poppy (mechanical); Olaf (mechanical) |
| Zaahen | Jungle | Poppy (mechanical); Nocturne (mechanical); Olaf (mechanical) |
| Zac | Jungle | Poppy (mechanical); Olaf (mechanical); Brand (conditional) |
| Zac | Top | Poppy (mechanical); Fiora (mechanical); Olaf (mechanical) |
| Zac | Support | Poppy (mechanical); Janna (mechanical); Morgana (mechanical) |
| Zed | Mid | Lissandra (mechanical); Kayle (mechanical); Zilean (mechanical) |
| Zeri | ADC | Yasuo (mechanical); Sivir (mechanical); Xayah (conditional) |
| Ziggs | ADC | Yasuo (mechanical); Sivir (mechanical); Xayah (conditional) |
| Ziggs | Mid | Yasuo (mechanical); Fizz (conditional); Vel'Koz (conditional) |
| Zilean | Support | Morgana (mechanical); Braum (mechanical); Milio (mechanical) |
| Zilean | Mid | Morgana (mechanical); Fizz (conditional); Xerath (conditional) |
| Zoe | Mid | Morgana (mechanical); Yasuo (mechanical); Fizz (conditional) |
| Zyra | Support | Morgana (mechanical); Braum (mechanical); Milio (mechanical) |
