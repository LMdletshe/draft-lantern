# Counter coverage audit

Research patch: **16.22.1**. Validated with **live Riot Data Dragon 16.22.1**.

Coverage: **173/173 champions**, **263/263 supported role combinations**, **2193 directed entries**, **180 full rune plans**, and **581 referenced official abilities**.

Every row has at least 6 distinct native same-role picks, each with a legal rune page. Both mechanical counters and conditional lane plans are included. These are not six guaranteed winning matchups. The order reflects authored interaction type and priority, not measured win rates. Cross-role team-context entries are additional to this table.

Only explicitly researched pairings receive pages. Coverage of every champion does not mean every arbitrary champion pair, off-role matchup, or future patch has been reviewed.

Reproduce with `node scripts/check-counter-coverage.cjs --live --write-report`. The command reports drift and never rewrites ability evidence or matchup decisions.

| Enemy | Role | Researched answers |
| --- | --- | --- |
| Aatrox | Top | Fiora (mechanical); Olaf (mechanical); Poppy (mechanical); Jax (conditional); Shen (conditional); Teemo (conditional); Gwen (conditional); Malphite (conditional); Nasus (conditional); Vayne (conditional); Vladimir (conditional) |
| Ahri | Mid | Yasuo (mechanical); Mel (mechanical); Morgana (mechanical); Vladimir (mechanical); Fizz (conditional); Galio (conditional); Kassadin (conditional) |
| Akali | Mid | Galio (mechanical); Lissandra (mechanical); Malzahar (mechanical); Vex (mechanical); Twisted Fate (mechanical); Fizz (mechanical); Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); Kassadin (conditional); Tristana (conditional) |
| Akali | Top | Poppy (mechanical); Twisted Fate (mechanical); Olaf (mechanical); Fiora (mechanical); Vladimir (mechanical); Yasuo (mechanical); Gwen (conditional); Vayne (conditional); Warwick (conditional) |
| Akshan | Mid | Lissandra (mechanical); Malzahar (mechanical); Taliyah (mechanical); Fizz (mechanical); Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); Tristana (conditional) |
| Akshan | Top | Poppy (mechanical); Jax (mechanical); Fiora (mechanical); Vladimir (mechanical); Yasuo (mechanical); Malphite (conditional); Gwen (conditional); Shen (conditional); Teemo (conditional); Nasus (conditional); Vayne (conditional) |
| Alistar | Support | Janna (mechanical); Morgana (mechanical); Milio (conditional); Galio (conditional); Poppy (conditional); Thresh (conditional) |
| Ambessa | Top | Poppy (mechanical); Jax (mechanical); Olaf (mechanical); Fiora (mechanical); Shen (conditional); Teemo (conditional); Gwen (conditional); Malphite (conditional); Nasus (conditional); Vayne (conditional); Vladimir (conditional); Warwick (conditional) |
| Amumu | Jungle | Morgana (mechanical); Nocturne (mechanical); Olaf (mechanical); Gwen (conditional); Warwick (conditional); Kindred (conditional) |
| Amumu | Support | Milio (mechanical); Morgana (mechanical); Braum (mechanical); Mel (mechanical); Janna (conditional); Galio (conditional); Alistar (conditional) |
| Anivia | Mid | Malzahar (mechanical); Mel (mechanical); Morgana (mechanical); Vladimir (mechanical); Yasuo (mechanical); Qiyana (conditional); Fizz (conditional); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Annie | Mid | Morgana (mechanical); Malzahar (mechanical); Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); Fizz (conditional); Galio (conditional); Kassadin (conditional) |
| Annie | Support | Morgana (mechanical); Braum (mechanical); Milio (mechanical); Mel (mechanical); Galio (conditional); Alistar (conditional) |
| Aphelios | ADC | Yasuo (mechanical); Sivir (mechanical); Samira (mechanical); Xayah (conditional); Nilah (conditional); Ezreal (conditional); Tristana (conditional); Vayne (conditional) |
| Ashe | ADC | Sivir (mechanical); Samira (mechanical); Yasuo (mechanical); Xayah (mechanical); Nilah (conditional); Ezreal (conditional); Tristana (conditional); Vayne (conditional) |
| Ashe | Support | Morgana (mechanical); Braum (mechanical); Milio (mechanical); Mel (mechanical); Galio (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional) |
| Aurelion Sol | Mid | Ahri (mechanical); Anivia (mechanical); Malzahar (mechanical); Morgana (mechanical); Galio (conditional); Kassadin (conditional); Fizz (conditional); Tristana (conditional); Vladimir (conditional) |
| Aurora | Mid | Yasuo (mechanical); Malzahar (mechanical); Fizz (conditional); Galio (conditional); Kassadin (conditional); Tristana (conditional); Vladimir (conditional) |
| Aurora | Top | Yasuo (mechanical); Cassiopeia (mechanical); Poppy (mechanical); Fiora (mechanical); Gwen (conditional); Vayne (conditional); Vladimir (conditional); Warwick (conditional); Olaf (conditional) |
| Azir | Mid | Taliyah (mechanical); Malzahar (mechanical); Xerath (conditional); Galio (conditional); Kassadin (conditional); Fizz (conditional); Tristana (conditional); Vladimir (conditional) |
| Bard | Support | Morgana (mechanical); Milio (mechanical); Braum (mechanical); Mel (mechanical); Rakan (conditional); Galio (conditional); Alistar (conditional) |
| Bel'Veth | Jungle | Poppy (mechanical); Rammus (mechanical); Jax (mechanical); Morgana (mechanical); Nocturne (mechanical); Olaf (mechanical); Gwen (conditional); Warwick (conditional); Kindred (conditional) |
| Blitzcrank | Support | Morgana (mechanical); Heimerdinger (mechanical); Zyra (mechanical); Braum (mechanical); Mel (mechanical); Galio (conditional) |
| Brand | Support | Braum (mechanical); Milio (mechanical); Mel (mechanical); Morgana (mechanical); Xerath (conditional); Galio (conditional); Alistar (conditional) |
| Brand | Mid | Morgana (mechanical); Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); Xerath (conditional); Fizz (conditional); Galio (conditional); Kassadin (conditional) |
| Brand | Jungle | Elise (mechanical); Nocturne (mechanical); Rengar (mechanical); Morgana (mechanical); Olaf (mechanical); Gwen (conditional); Warwick (conditional); Kindred (conditional) |
| Braum | Support | Lux (mechanical); Morgana (mechanical); Senna (mechanical); Vel'Koz (mechanical); Mel (mechanical); Galio (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional) |
| Briar | Jungle | Jax (mechanical); Nocturne (mechanical); Olaf (mechanical); Morgana (mechanical); Gwen (conditional); Rammus (conditional); Warwick (conditional); Kindred (conditional) |
| Caitlyn | ADC | Yasuo (mechanical); Sivir (mechanical); Samira (mechanical); Xayah (conditional); Nilah (conditional); Ezreal (conditional); Tristana (conditional); Vayne (conditional) |
| Camille | Top | Jax (mechanical); Poppy (mechanical); Renekton (mechanical); Fiora (mechanical); Olaf (mechanical); Shen (conditional); Teemo (conditional); Malphite (conditional); Nasus (conditional); Vayne (conditional); Warwick (conditional) |
| Camille | Support | Morgana (mechanical); Poppy (mechanical); Janna (mechanical); Galio (conditional); Shen (conditional); Teemo (conditional); Alistar (conditional); Malphite (conditional); Milio (conditional) |
| Cassiopeia | Mid | Morgana (mechanical); Xerath (conditional); Fizz (conditional); Syndra (conditional); Galio (conditional); Kassadin (conditional); Tristana (conditional); Vladimir (conditional) |
| Cassiopeia | Top | Cho'Gath (mechanical); Gangplank (mechanical); Fiora (mechanical); Olaf (mechanical); Yorick (conditional); Gwen (conditional); Vayne (conditional); Vladimir (conditional); Warwick (conditional) |
| Cho'Gath | Top | Fiora (mechanical); Olaf (mechanical); Vayne (conditional); Gwen (conditional); Jax (conditional); Shen (conditional); Teemo (conditional); Vladimir (conditional); Warwick (conditional) |
| Cho'Gath | Mid | Morgana (mechanical); Fizz (conditional); Xerath (conditional); Galio (conditional); Kassadin (conditional); Tristana (conditional); Vladimir (conditional) |
| Corki | Mid | Yasuo (mechanical); Cassiopeia (mechanical); Mel (mechanical); Vladimir (mechanical); Fizz (conditional); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Corki | ADC | Yasuo (mechanical); Sivir (mechanical); Samira (mechanical); Xayah (conditional); Nilah (conditional); Ezreal (conditional); Tristana (conditional); Vayne (conditional) |
| Darius | Top | Jax (mechanical); Fiora (mechanical); Olaf (mechanical); Vayne (conditional); Quinn (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional); Nasus (conditional) |
| Diana | Jungle | Poppy (mechanical); Nocturne (mechanical); Olaf (mechanical); Gwen (conditional); Warwick (conditional); Kindred (conditional) |
| Diana | Mid | Lissandra (mechanical); Cassiopeia (mechanical); Malzahar (mechanical); Fizz (mechanical); Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Dr. Mundo | Top | Fiora (mechanical); Vladimir (mechanical); Yasuo (mechanical); Vayne (conditional); Gwen (conditional); Jax (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional); Nasus (conditional); Warwick (conditional); Olaf (conditional) |
| Draven | ADC | Yasuo (mechanical); Sivir (mechanical); Samira (mechanical); Xayah (mechanical); Miss Fortune (conditional); Nilah (conditional); Ezreal (conditional); Tristana (conditional); Vayne (conditional) |
| Ekko | Jungle | Poppy (mechanical); Nocturne (mechanical); Olaf (mechanical); Gwen (conditional); Jax (conditional); Rammus (conditional); Warwick (conditional); Kindred (conditional) |
| Ekko | Mid | Taliyah (mechanical); Malzahar (mechanical); Fizz (mechanical); Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); Lissandra (conditional); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Elise | Jungle | Nocturne (mechanical); Olaf (mechanical); Rengar (mechanical); Morgana (mechanical); Gwen (conditional); Warwick (conditional); Kindred (conditional) |
| Evelynn | Jungle | Olaf (mechanical); Nocturne (mechanical); Rek'Sai (conditional); Rengar (conditional); Gwen (conditional); Warwick (conditional); Kindred (conditional) |
| Ezreal | ADC | Yasuo (mechanical); Sivir (mechanical); Samira (mechanical); Xayah (mechanical); Smolder (conditional); Tristana (conditional); Vayne (conditional) |
| Fiddlesticks | Jungle | Morgana (mechanical); Viego (mechanical); Olaf (mechanical); Nocturne (mechanical); Gwen (conditional); Warwick (conditional); Kindred (conditional) |
| Fiddlesticks | Support | Morgana (mechanical); Janna (mechanical); Milio (mechanical); Galio (conditional); Soraka (conditional); Alistar (conditional) |
| Fiora | Top | Poppy (mechanical); Jax (mechanical); Olaf (mechanical); Vladimir (mechanical); Yasuo (mechanical); Gwen (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional); Nasus (conditional); Vayne (conditional) |
| Fizz | Mid | Lissandra (mechanical); Malzahar (mechanical); Mel (mechanical); Morgana (mechanical); Vladimir (mechanical); Yasuo (mechanical); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Galio | Mid | Morgana (mechanical); Mel (mechanical); Corki (conditional); Fizz (conditional); Kassadin (conditional); Tristana (conditional); Vladimir (conditional) |
| Galio | Support | Morgana (mechanical); Janna (mechanical); Milio (mechanical); Mel (mechanical); Poppy (conditional); Alistar (conditional) |
| Gangplank | Top | Fiora (mechanical); Vladimir (mechanical); Yasuo (mechanical); Riven (conditional); Akshan (conditional); Irelia (conditional); Gwen (conditional); Jax (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional); Nasus (conditional); Warwick (conditional) |
| Garen | Top | Jax (mechanical); Kayle (mechanical); Tryndamere (mechanical); Aurora (conditional); Jayce (conditional); Vayne (conditional); Quinn (conditional); Shen (conditional); Teemo (conditional); Gwen (conditional); Malphite (conditional); Nasus (conditional); Vladimir (conditional) |
| Gnar | Top | Fiora (mechanical); Olaf (mechanical); Vladimir (mechanical); Yasuo (mechanical); Ambessa (conditional); Gwen (conditional); Jax (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional); Nasus (conditional); Vayne (conditional) |
| Gragas | Top | Poppy (mechanical); Fiora (mechanical); Olaf (mechanical); Vladimir (mechanical); Yasuo (mechanical); Gwen (conditional); Vayne (conditional); Warwick (conditional) |
| Gragas | Jungle | Morgana (mechanical); Poppy (mechanical); Nocturne (mechanical); Olaf (mechanical); Gwen (conditional); Warwick (conditional); Kindred (conditional) |
| Gragas | Support | Morgana (mechanical); Poppy (mechanical); Janna (mechanical); Braum (mechanical); Mel (mechanical); Galio (conditional) |
| Graves | Jungle | Poppy (mechanical); Vi (mechanical); Nocturne (mechanical); Rammus (conditional); Gwen (conditional); Jax (conditional); Warwick (conditional); Kindred (conditional) |
| Gwen | Top | Jax (mechanical); Poppy (mechanical); Fiora (mechanical); Vladimir (mechanical); Yasuo (mechanical); Riven (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional); Nasus (conditional); Vayne (conditional); Warwick (conditional); Olaf (conditional) |
| Gwen | Jungle | Jax (mechanical); Poppy (mechanical); Nocturne (mechanical); Elise (conditional); Rammus (conditional); Warwick (conditional); Kindred (conditional); Olaf (conditional) |
| Hecarim | Jungle | Poppy (mechanical); Nocturne (mechanical); Morgana (mechanical); Olaf (mechanical); Trundle (conditional); Jax (conditional); Gwen (conditional); Rammus (conditional); Warwick (conditional); Kindred (conditional) |
| Heimerdinger | Mid | Fizz (mechanical); Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); Aurelion Sol (conditional); Syndra (conditional); Xerath (conditional); Ziggs (conditional); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Heimerdinger | Support | Braum (mechanical); Mel (mechanical); Xerath (conditional); Vel'Koz (conditional); Zyra (conditional); Galio (conditional) |
| Heimerdinger | Top | Olaf (mechanical); Yasuo (mechanical); Fiora (mechanical); Vladimir (mechanical); Irelia (conditional); Gwen (conditional); Vayne (conditional); Warwick (conditional) |
| Hwei | Mid | Morgana (mechanical); Yasuo (mechanical); Fizz (conditional); Galio (conditional); Kassadin (conditional); Mel (conditional); Tristana (conditional); Vladimir (conditional) |
| Hwei | Support | Morgana (mechanical); Braum (mechanical); Milio (mechanical); Galio (conditional); Mel (conditional); Alistar (conditional) |
| Illaoi | Top | Fiora (mechanical); Mordekaiser (mechanical); Vladimir (mechanical); Yasuo (mechanical); K'Sante (conditional); Gwen (conditional); Vayne (conditional) |
| Irelia | Top | Poppy (mechanical); Fiora (mechanical); Olaf (mechanical); Volibear (conditional); Jax (conditional); Shen (conditional); Teemo (conditional); Gwen (conditional); Malphite (conditional); Nasus (conditional); Vayne (conditional); Vladimir (conditional); Warwick (conditional) |
| Irelia | Mid | Taliyah (mechanical); Cassiopeia (mechanical); Malzahar (mechanical); Morgana (mechanical); Galio (conditional); Kassadin (conditional); Fizz (conditional); Tristana (conditional); Vladimir (conditional) |
| Ivern | Jungle | Morgana (mechanical); Nocturne (mechanical); Olaf (mechanical); Gwen (conditional); Warwick (conditional); Kindred (conditional) |
| Janna | Support | Nami (mechanical); Nautilus (mechanical); Blitzcrank (mechanical); Braum (mechanical); Mel (mechanical); Morgana (mechanical); Rell (mechanical); Zyra (conditional); Galio (conditional) |
| Jarvan IV | Jungle | Poppy (mechanical); Nocturne (mechanical); Olaf (mechanical); Gwen (conditional); Warwick (conditional); Kindred (conditional) |
| Jarvan IV | Top | Poppy (mechanical); Fiora (mechanical); Olaf (mechanical); Gwen (conditional); Vayne (conditional); Vladimir (conditional); Warwick (conditional) |
| Jax | Top | Malphite (mechanical); Poppy (mechanical); Rumble (mechanical); Singed (mechanical); Fiora (mechanical); Olaf (mechanical); Shen (conditional); Teemo (conditional); Gwen (conditional); Nasus (conditional); Vayne (conditional); Vladimir (conditional); Warwick (conditional) |
| Jax | Jungle | Poppy (mechanical); Nocturne (mechanical); Olaf (mechanical); Morgana (mechanical); Gwen (conditional); Rammus (conditional); Warwick (conditional); Kindred (conditional) |
| Jayce | Top | Poppy (mechanical); Olaf (mechanical); Fiora (mechanical); Vladimir (mechanical); Yasuo (mechanical); Wukong (conditional); Gwen (conditional); Jax (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional); Nasus (conditional); Vayne (conditional); Warwick (conditional) |
| Jayce | Mid | Syndra (mechanical); Cassiopeia (mechanical); Fizz (mechanical); Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); Xerath (conditional); Tristana (conditional) |
| Jhin | ADC | Sivir (mechanical); Ezreal (mechanical); Yasuo (mechanical); Samira (mechanical); Xayah (mechanical); Kalista (conditional); Twitch (conditional); Yunara (conditional); Nilah (conditional); Tristana (conditional); Vayne (conditional) |
| Jinx | ADC | Yasuo (mechanical); Sivir (mechanical); Samira (mechanical); Xayah (conditional); Nilah (conditional); Ezreal (conditional); Tristana (conditional); Vayne (conditional) |
| K'Sante | Top | Fiora (mechanical); Olaf (mechanical); Camille (conditional); Gwen (conditional); Vayne (conditional); Vladimir (conditional) |
| Kai'Sa | ADC | Yasuo (mechanical); Sivir (mechanical); Samira (mechanical); Xayah (conditional); Nilah (conditional); Ezreal (conditional); Tristana (conditional); Vayne (conditional) |
| Kalista | ADC | Ashe (mechanical); Jhin (mechanical); Yasuo (mechanical); Samira (mechanical); Sivir (mechanical); Xayah (mechanical); Nilah (conditional); Ezreal (conditional); Tristana (conditional); Vayne (conditional) |
| Karma | Support | Pyke (mechanical); Blitzcrank (mechanical); Rell (mechanical); Braum (mechanical); Mel (mechanical); Galio (conditional); Alistar (conditional); Milio (conditional) |
| Karma | Mid | Morgana (mechanical); Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); Syndra (conditional); Fizz (conditional); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Karthus | Jungle | Xin Zhao (mechanical); Ekko (mechanical); Elise (mechanical); Evelynn (mechanical); Hecarim (mechanical); Kindred (mechanical); Master Yi (mechanical); Nunu & Willump (mechanical); Shaco (mechanical); Zac (mechanical); Nocturne (mechanical); Bel'Veth (conditional); Kayn (conditional); Nidalee (conditional); Gwen (conditional); Warwick (conditional) |
| Karthus | Mid | Fizz (mechanical); Pantheon (mechanical); Vladimir (mechanical); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Kassadin | Mid | Akshan (conditional); Lucian (conditional); Talon (conditional); Galio (conditional); Fizz (conditional); Tristana (conditional); Vladimir (conditional) |
| Katarina | Mid | Galio (mechanical); Kassadin (mechanical); Lissandra (mechanical); Malzahar (mechanical); Cho'Gath (mechanical); Orianna (mechanical); Viktor (mechanical); Fizz (mechanical); Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical) |
| Kayle | Top | Akali (mechanical); Jax (mechanical); Fiora (mechanical); Vladimir (mechanical); Yasuo (mechanical); Nasus (conditional); Gwen (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional); Vayne (conditional); Warwick (conditional); Olaf (conditional) |
| Kayle | Mid | Akali (mechanical); Malzahar (mechanical); Fizz (mechanical); Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); Xerath (conditional); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Kayn | Jungle | Poppy (mechanical); Nocturne (mechanical); Olaf (mechanical); Gwen (conditional); Warwick (conditional); Kindred (conditional) |
| Kennen | Top | Sylas (mechanical); Fiora (mechanical); Olaf (mechanical); Vladimir (mechanical); Yasuo (mechanical); Gwen (conditional); Jax (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional); Nasus (conditional); Warwick (conditional) |
| Kennen | Mid | Sylas (mechanical); Morgana (mechanical); Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); Fizz (conditional); Galio (conditional); Kassadin (conditional) |
| Kha'Zix | Jungle | Poppy (mechanical); Ivern (mechanical); Nocturne (mechanical); Gwen (conditional); Kindred (conditional); Olaf (conditional) |
| Kindred | Jungle | Gragas (mechanical); Lee Sin (mechanical); Diana (conditional); Graves (conditional); Kha'Zix (conditional); Jax (conditional); Rammus (conditional); Olaf (conditional) |
| Kled | Top | Fiora (mechanical); Poppy (mechanical); Olaf (mechanical); Vladimir (mechanical); Yasuo (mechanical); Gwen (conditional); Jax (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional); Nasus (conditional); Vayne (conditional) |
| Kog'Maw | ADC | Yasuo (mechanical); Sivir (mechanical); Samira (mechanical); Xayah (mechanical); Kai'Sa (conditional); Nilah (conditional); Ezreal (conditional); Tristana (conditional); Vayne (conditional) |
| LeBlanc | Mid | Lissandra (mechanical); Vex (mechanical); Morgana (mechanical); Fizz (mechanical); Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Lee Sin | Jungle | Poppy (mechanical); Nocturne (mechanical); Olaf (mechanical); Gwen (conditional); Warwick (conditional); Kindred (conditional) |
| Leona | Support | Morgana (mechanical); Thresh (mechanical); Braum (mechanical); Mel (mechanical); Karma (conditional); Galio (conditional); Alistar (conditional); Milio (conditional) |
| Lillia | Jungle | Nocturne (mechanical); Olaf (mechanical); Briar (conditional); Gwen (conditional); Warwick (conditional); Kindred (conditional) |
| Lillia | Top | Olaf (mechanical); Fiora (mechanical); Vladimir (mechanical); Yasuo (mechanical); Nasus (conditional); Teemo (conditional); Gwen (conditional); Vayne (conditional); Warwick (conditional) |
| Lissandra | Mid | Morgana (mechanical); Malzahar (mechanical); Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); Fizz (conditional); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Locke | Mid | Cassiopeia (mechanical); Lissandra (mechanical); Malzahar (mechanical); Fizz (mechanical); Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Locke | Jungle | Jax (mechanical); Kindred (mechanical); Nocturne (mechanical); Rammus (conditional); Gwen (conditional); Warwick (conditional); Olaf (conditional) |
| Lucian | ADC | Yasuo (mechanical); Sivir (mechanical); Samira (mechanical); Xayah (conditional); Nilah (conditional); Ezreal (conditional); Tristana (conditional); Vayne (conditional) |
| Lucian | Mid | Veigar (mechanical); Yasuo (mechanical); Cassiopeia (mechanical); Fizz (mechanical); Mel (mechanical); Vladimir (mechanical); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Lulu | Support | Blitzcrank (mechanical); Rell (mechanical); Braum (mechanical); Mel (mechanical); Zyra (conditional); Galio (conditional); Alistar (conditional); Milio (conditional) |
| Lux | Support | Morgana (mechanical); Braum (mechanical); Milio (mechanical); Mel (mechanical); Galio (conditional); Alistar (conditional) |
| Lux | Mid | Morgana (mechanical); Yasuo (mechanical); Mel (mechanical); Vladimir (mechanical); Fizz (conditional); Galio (conditional); Kassadin (conditional) |
| Malphite | Top | Sylas (mechanical); Fiora (mechanical); Vladimir (mechanical); Yasuo (mechanical); Mordekaiser (conditional); Gwen (conditional); Warwick (conditional); Olaf (conditional) |
| Malphite | Support | Morgana (mechanical); Braum (mechanical); Mel (mechanical); Janna (conditional); Taric (conditional); Galio (conditional) |
| Malzahar | Mid | Morgana (mechanical); Fizz (conditional); Xerath (conditional); Galio (conditional); Kassadin (conditional); Tristana (conditional); Vladimir (conditional) |
| Maokai | Support | Morgana (mechanical); Milio (mechanical); Janna (conditional); Galio (conditional); Shen (conditional); Teemo (conditional) |
| Maokai | Jungle | Morgana (mechanical); Nocturne (mechanical); Olaf (mechanical); Jax (conditional); Warwick (conditional); Kindred (conditional) |
| Maokai | Top | Dr. Mundo (mechanical); Fiora (mechanical); Olaf (mechanical); Jax (conditional); Shen (conditional); Teemo (conditional); Vayne (conditional); Warwick (conditional) |
| Master Yi | Jungle | Rammus (mechanical); Amumu (mechanical); Jax (mechanical); Maokai (mechanical); Sejuani (mechanical); Warwick (conditional); Kindred (conditional) |
| Mel | Mid | Morgana (mechanical); Vladimir (mechanical); Yasuo (mechanical); Fizz (conditional); Vel'Koz (conditional); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Mel | Support | Morgana (mechanical); Milio (mechanical); Braum (mechanical); Rell (mechanical); Blitzcrank (conditional); Galio (conditional); Alistar (conditional) |
| Milio | Support | Blitzcrank (mechanical); Braum (mechanical); Rell (mechanical); Mel (mechanical); Morgana (mechanical); Galio (conditional) |
| Miss Fortune | ADC | Yasuo (mechanical); Sivir (mechanical); Samira (mechanical); Xayah (conditional); Ezreal (conditional); Tristana (conditional); Vayne (conditional) |
| Mordekaiser | Top | Gwen (mechanical); Fiora (mechanical); Olaf (mechanical); Jax (conditional); Shen (conditional); Teemo (conditional); Vayne (conditional); Vladimir (conditional); Warwick (conditional) |
| Mordekaiser | Jungle | Gwen (mechanical); Nocturne (mechanical); Olaf (mechanical); Morgana (mechanical); Jax (conditional); Warwick (conditional); Kindred (conditional) |
| Morgana | Support | Rell (mechanical); Braum (mechanical); Milio (mechanical); Mel (mechanical); Galio (conditional); Alistar (conditional) |
| Morgana | Mid | Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); Zed (conditional); Fizz (conditional); Xerath (conditional); Galio (conditional); Kassadin (conditional) |
| Morgana | Jungle | Rell (mechanical); Nocturne (mechanical); Olaf (mechanical); Gwen (conditional); Warwick (conditional); Kindred (conditional) |
| Naafiri | Mid | Taliyah (mechanical); Cassiopeia (mechanical); Malzahar (mechanical); Fizz (mechanical); Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); Tristana (conditional) |
| Nami | Support | Soraka (mechanical); Braum (mechanical); Mel (mechanical); Morgana (mechanical); Sona (conditional); Galio (conditional) |
| Nasus | Top | Jax (mechanical); Fiora (mechanical); Olaf (mechanical); Garen (conditional); Gwen (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional); Vayne (conditional); Vladimir (conditional); Warwick (conditional) |
| Nautilus | Support | Morgana (mechanical); Braum (mechanical); Mel (mechanical); Janna (conditional); Taric (conditional); Galio (conditional) |
| Nautilus | Jungle | Morgana (mechanical); Nocturne (mechanical); Olaf (mechanical); Gwen (conditional); Warwick (conditional); Kindred (conditional) |
| Neeko | Mid | Morgana (mechanical); Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); Fizz (conditional); Xerath (conditional); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Neeko | Support | Morgana (mechanical); Braum (mechanical); Milio (mechanical); Mel (mechanical); Galio (conditional); Alistar (conditional) |
| Nidalee | Jungle | Poppy (mechanical); Nocturne (mechanical); Xin Zhao (mechanical); Gwen (conditional); Warwick (conditional); Kindred (conditional) |
| Nilah | ADC | Caitlyn (mechanical); Jinx (mechanical); Xayah (mechanical); Ezreal (conditional); Tristana (conditional); Vayne (conditional) |
| Nocturne | Jungle | Olaf (mechanical); Rengar (mechanical); Kindred (conditional); Gwen (conditional); Jax (conditional); Rammus (conditional) |
| Nunu & Willump | Jungle | Fiddlesticks (mechanical); Morgana (mechanical); Shyvana (mechanical); Skarner (mechanical); Nocturne (mechanical); Olaf (mechanical); Gwen (conditional); Warwick (conditional); Kindred (conditional) |
| Olaf | Top | Jarvan IV (mechanical); Fiora (mechanical); Vladimir (mechanical); Yasuo (mechanical); Trundle (conditional); Gwen (conditional); Jax (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional); Nasus (conditional); Vayne (conditional) |
| Olaf | Jungle | Jarvan IV (mechanical); Nocturne (mechanical); Trundle (conditional); Kindred (conditional); Gwen (conditional); Jax (conditional); Rammus (conditional) |
| Orianna | Mid | Fizz (mechanical); Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); Vel'Koz (conditional); Xerath (conditional); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Ornn | Top | Fiora (mechanical); Olaf (mechanical); Vladimir (mechanical); Yasuo (mechanical); Illaoi (conditional); Gwen (conditional); Vayne (conditional) |
| Pantheon | Top | Poppy (mechanical); Fiora (mechanical); Olaf (mechanical); Vladimir (mechanical); Yasuo (mechanical); Gwen (conditional); Jax (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional); Nasus (conditional); Vayne (conditional); Warwick (conditional) |
| Pantheon | Support | Poppy (mechanical); Janna (mechanical); Milio (mechanical); Braum (mechanical); Mel (mechanical); Shen (conditional); Teemo (conditional); Malphite (conditional) |
| Pantheon | Mid | Lissandra (mechanical); Malzahar (mechanical); Syndra (mechanical); Fizz (mechanical); Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); Tristana (conditional) |
| Poppy | Top | Olaf (mechanical); Fiora (mechanical); Trundle (conditional); Gwen (conditional); Vayne (conditional); Vladimir (conditional); Warwick (conditional) |
| Poppy | Jungle | Olaf (mechanical); Nocturne (mechanical); Rell (mechanical); Trundle (conditional); Gwen (conditional); Warwick (conditional); Kindred (conditional) |
| Poppy | Support | Morgana (mechanical); Milio (mechanical); Blitzcrank (mechanical); Rell (mechanical); Janna (conditional); Alistar (conditional) |
| Pyke | Support | Lulu (mechanical); Soraka (mechanical); Braum (mechanical); Mel (mechanical); Morgana (mechanical); Renata Glasc (conditional); Sona (conditional); Yuumi (conditional) |
| Qiyana | Mid | Taliyah (mechanical); Cassiopeia (mechanical); Lissandra (mechanical); Malzahar (mechanical); Fizz (mechanical); Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); Tristana (conditional) |
| Qiyana | Jungle | Poppy (mechanical); Taliyah (mechanical); Nocturne (mechanical); Olaf (mechanical); Gwen (conditional); Kindred (conditional) |
| Quinn | Top | Fiora (mechanical); Olaf (mechanical); Vladimir (mechanical); Yasuo (mechanical); Nasus (conditional); Gwen (conditional); Jax (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional); Vayne (conditional); Warwick (conditional) |
| Rakan | Support | Janna (mechanical); Morgana (mechanical); Poppy (mechanical); Alistar (mechanical); Braum (mechanical); Mel (mechanical); Galio (conditional) |
| Rammus | Jungle | Trundle (mechanical); Lillia (mechanical); Morgana (mechanical); Nocturne (mechanical); Olaf (mechanical); Karthus (conditional); Gwen (conditional); Warwick (conditional); Kindred (conditional) |
| Rek'Sai | Jungle | Poppy (mechanical); Nocturne (mechanical); Olaf (mechanical); Gwen (conditional); Warwick (conditional); Kindred (conditional) |
| Rell | Support | Morgana (mechanical); Poppy (mechanical); Blitzcrank (mechanical); Swain (conditional); Galio (conditional); Janna (conditional); Alistar (conditional); Milio (conditional) |
| Rell | Jungle | Morgana (mechanical); Poppy (mechanical); Olaf (mechanical); Gwen (conditional); Warwick (conditional); Kindred (conditional) |
| Renata Glasc | Support | Milio (mechanical); Blitzcrank (mechanical); Braum (mechanical); Mel (mechanical); Morgana (mechanical); Galio (conditional); Alistar (conditional) |
| Renekton | Top | Poppy (mechanical); Fiora (mechanical); Olaf (mechanical); Jax (conditional); Shen (conditional); Teemo (conditional); Gwen (conditional); Malphite (conditional); Nasus (conditional); Vayne (conditional); Vladimir (conditional) |
| Rengar | Jungle | Poppy (mechanical); Nocturne (mechanical); Olaf (mechanical); Morgana (mechanical); Gwen (conditional); Jax (conditional); Rammus (conditional); Kindred (conditional) |
| Rengar | Top | Poppy (mechanical); Fiora (mechanical); Olaf (mechanical); Vladimir (mechanical); Yasuo (mechanical); Gwen (conditional); Jax (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional); Nasus (conditional); Vayne (conditional) |
| Riven | Top | Poppy (mechanical); Renekton (mechanical); Garen (mechanical); Fiora (mechanical); Olaf (mechanical); Jax (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional); Nasus (conditional); Warwick (conditional) |
| Rumble | Top | Fiora (mechanical); Vladimir (mechanical); Yasuo (mechanical); Vayne (conditional); Cho'Gath (conditional); Gwen (conditional); Warwick (conditional); Olaf (conditional) |
| Rumble | Mid | Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); Syndra (conditional); Fizz (conditional); Xerath (conditional); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Ryze | Mid | Cassiopeia (mechanical); Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); Fizz (conditional); Xerath (conditional); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Ryze | Top | Cassiopeia (mechanical); Fiora (mechanical); Olaf (mechanical); Vladimir (mechanical); Yasuo (mechanical); Gwen (conditional); Vayne (conditional); Warwick (conditional) |
| Samira | ADC | Tristana (mechanical); Yasuo (mechanical); Sivir (mechanical); Xayah (mechanical); Nilah (conditional); Ezreal (conditional); Vayne (conditional) |
| Sejuani | Jungle | Morgana (mechanical); Poppy (mechanical); Udyr (mechanical); Olaf (mechanical); Nocturne (mechanical); Warwick (conditional); Kindred (conditional) |
| Sejuani | Top | Poppy (mechanical); Udyr (mechanical); Fiora (mechanical); Olaf (mechanical); Vayne (conditional); Warwick (conditional) |
| Senna | Support | Pyke (mechanical); Braum (mechanical); Mel (mechanical); Morgana (mechanical); Zyra (conditional); Shen (conditional); Teemo (conditional); Alistar (conditional); Malphite (conditional); Milio (conditional) |
| Senna | ADC | Yasuo (mechanical); Sivir (mechanical); Samira (mechanical); Xayah (conditional); Nilah (conditional); Ezreal (conditional); Tristana (conditional); Vayne (conditional) |
| Seraphine | Support | Morgana (mechanical); Braum (mechanical); Milio (mechanical); Mel (mechanical); Galio (conditional); Alistar (conditional) |
| Seraphine | Mid | Morgana (mechanical); Yasuo (mechanical); Mel (mechanical); Vladimir (mechanical); Fizz (conditional); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Seraphine | ADC | Yasuo (mechanical); Sivir (mechanical); Samira (mechanical); Xayah (conditional); Ezreal (conditional); Tristana (conditional); Vayne (conditional) |
| Sett | Top | Jax (mechanical); Urgot (mechanical); Fiora (mechanical); Gnar (conditional); Vayne (conditional); Shen (conditional); Teemo (conditional); Gwen (conditional); Malphite (conditional); Nasus (conditional); Vladimir (conditional) |
| Sett | Support | Ashe (conditional); Janna (conditional); Zyra (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional) |
| Shaco | Jungle | Morgana (mechanical); Nocturne (mechanical); Olaf (mechanical); Gwen (conditional); Warwick (conditional); Kindred (conditional) |
| Shaco | Support | Morgana (mechanical); Braum (mechanical); Milio (mechanical); Mel (mechanical); Galio (conditional); Alistar (conditional) |
| Shen | Top | Fiora (mechanical); Gangplank (mechanical); Poppy (mechanical); Olaf (mechanical); Jax (conditional); Teemo (conditional); Malphite (conditional); Nasus (conditional); Vayne (conditional) |
| Shen | Support | Morgana (mechanical); Poppy (mechanical); Milio (mechanical); Teemo (conditional); Alistar (conditional); Malphite (conditional) |
| Shyvana | Jungle | Jax (mechanical); Nocturne (mechanical); Gwen (conditional); Trundle (conditional); Rammus (conditional); Warwick (conditional); Kindred (conditional) |
| Shyvana | Top | Jax (mechanical); Fiora (mechanical); Vladimir (mechanical); Yasuo (mechanical); Gwen (conditional); Trundle (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional); Nasus (conditional); Vayne (conditional); Warwick (conditional) |
| Singed | Top | Fiora (mechanical); Olaf (mechanical); Heimerdinger (conditional); Gwen (conditional); Vayne (conditional); Vladimir (conditional); Warwick (conditional) |
| Sion | Top | Aatrox (mechanical); Darius (mechanical); Fiora (mechanical); Kled (mechanical); Riven (mechanical); Zaahen (mechanical); Olaf (mechanical); Gwen (conditional); Vayne (conditional); Vladimir (conditional); Warwick (conditional) |
| Sivir | ADC | Yasuo (mechanical); Samira (mechanical); Xayah (mechanical); Kog'Maw (conditional); Caitlyn (conditional); Nilah (conditional); Ezreal (conditional); Tristana (conditional); Vayne (conditional) |
| Skarner | Jungle | Morgana (mechanical); Nocturne (mechanical); Olaf (mechanical); Gwen (conditional); Warwick (conditional); Kindred (conditional) |
| Skarner | Top | Olaf (mechanical); Fiora (mechanical); Trundle (conditional); Gwen (conditional); Vayne (conditional); Warwick (conditional) |
| Smolder | ADC | Yasuo (mechanical); Sivir (mechanical); Samira (mechanical); Xayah (mechanical); Draven (conditional); Ezreal (conditional); Tristana (conditional); Vayne (conditional) |
| Smolder | Mid | Yasuo (mechanical); Cassiopeia (mechanical); Fizz (mechanical); Mel (mechanical); Vladimir (mechanical); Xerath (conditional); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Sona | Support | Braum (mechanical); Mel (mechanical); Morgana (mechanical); Rell (mechanical); Seraphine (conditional); Blitzcrank (conditional); Pyke (conditional); Galio (conditional); Alistar (conditional); Milio (conditional) |
| Soraka | Support | Blitzcrank (mechanical); Leona (mechanical); Braum (mechanical); Mel (mechanical); Pyke (conditional); Galio (conditional); Alistar (conditional); Milio (conditional) |
| Swain | Support | Morgana (mechanical); Braum (mechanical); Milio (mechanical); Mel (mechanical); Galio (conditional); Alistar (conditional) |
| Swain | Mid | Morgana (mechanical); Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); Fizz (conditional); Xerath (conditional); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Sylas | Mid | Cassiopeia (mechanical); Taliyah (mechanical); Malzahar (mechanical); Fizz (mechanical); Mel (mechanical); Morgana (mechanical); Vladimir (mechanical); Yasuo (mechanical); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Sylas | Top | Poppy (mechanical); Cassiopeia (mechanical); Olaf (mechanical); Fiora (mechanical); Vladimir (mechanical); Yasuo (mechanical); Gwen (conditional); Vayne (conditional); Warwick (conditional) |
| Syndra | Mid | Naafiri (mechanical); Yasuo (mechanical); Fizz (conditional); Galio (conditional); Kassadin (conditional); Tristana (conditional); Vladimir (conditional) |
| Tahm Kench | Support | Morgana (mechanical); Milio (mechanical); Rell (mechanical); Braum (mechanical); Mel (mechanical); Galio (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional) |
| Tahm Kench | Top | Fiora (mechanical); Olaf (mechanical); Vladimir (mechanical); Yasuo (mechanical); Vayne (conditional); Gwen (conditional); Jax (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional); Nasus (conditional); Warwick (conditional) |
| Taliyah | Mid | Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); Zed (conditional); Fizz (conditional); Vel'Koz (conditional); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Taliyah | Jungle | Nocturne (mechanical); Olaf (mechanical); Kayn (conditional); Gwen (conditional); Warwick (conditional); Kindred (conditional) |
| Talon | Mid | Ryze (mechanical); Cassiopeia (mechanical); Malzahar (mechanical); Fizz (mechanical); Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); Tristana (conditional) |
| Talon | Jungle | Poppy (mechanical); Nocturne (mechanical); Lee Sin (conditional); Rengar (conditional); Gwen (conditional); Kindred (conditional) |
| Taric | Support | Morgana (mechanical); Milio (mechanical); Blitzcrank (mechanical); Rell (mechanical); Bard (conditional); Galio (conditional); Shen (conditional); Teemo (conditional); Alistar (conditional); Malphite (conditional) |
| Teemo | Top | Rumble (mechanical); Fiora (mechanical); Vladimir (mechanical); Yasuo (mechanical); Sion (conditional); Cho'Gath (conditional); Gwen (conditional); Jax (conditional); Shen (conditional); Malphite (conditional); Nasus (conditional); Warwick (conditional) |
| Teemo | Support | Morgana (mechanical); Braum (mechanical); Milio (mechanical); Mel (mechanical); Galio (conditional); Shen (conditional); Malphite (conditional) |
| Thresh | Support | Morgana (mechanical); Braum (mechanical); Mel (mechanical); Janna (conditional); Galio (conditional); Taric (conditional) |
| Tristana | ADC | Yasuo (mechanical); Sivir (mechanical); Samira (mechanical); Xayah (conditional); Nilah (conditional); Vayne (conditional) |
| Tristana | Mid | Yasuo (mechanical); Cassiopeia (mechanical); Malzahar (mechanical); Fizz (mechanical); Mel (mechanical); Morgana (mechanical); Vladimir (mechanical); Galio (conditional); Kassadin (conditional) |
| Trundle | Top | Jax (mechanical); Ornn (mechanical); Gwen (conditional); Poppy (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional); Nasus (conditional); Vayne (conditional); Olaf (conditional) |
| Trundle | Jungle | Jax (mechanical); Gwen (conditional); Kindred (conditional); Poppy (conditional); Rammus (conditional); Olaf (conditional) |
| Tryndamere | Top | Jax (mechanical); Malphite (mechanical); Nasus (mechanical); Poppy (mechanical); Shen (mechanical); Teemo (mechanical); Fiora (mechanical); Gwen (conditional); Vayne (conditional); Vladimir (conditional) |
| Twisted Fate | Mid | Yasuo (mechanical); Morgana (mechanical); Mel (mechanical); Vladimir (mechanical); Fizz (conditional); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Twisted Fate | Top | Jax (mechanical); Fiora (mechanical); Olaf (mechanical); Vladimir (mechanical); Yasuo (mechanical); Gwen (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional); Nasus (conditional); Vayne (conditional); Warwick (conditional) |
| Twitch | ADC | Yasuo (mechanical); Sivir (mechanical); Samira (mechanical); Xayah (conditional); Nilah (conditional); Ezreal (conditional); Tristana (conditional); Vayne (conditional) |
| Twitch | Support | Braum (mechanical); Mel (mechanical); Lulu (conditional); Janna (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional) |
| Udyr | Jungle | Jax (mechanical); Nocturne (mechanical); Olaf (mechanical); Gwen (conditional); Rammus (conditional); Warwick (conditional); Kindred (conditional) |
| Udyr | Top | Jax (mechanical); Fiora (mechanical); Olaf (mechanical); Shen (conditional); Teemo (conditional); Gwen (conditional); Malphite (conditional); Nasus (conditional); Vayne (conditional); Vladimir (conditional); Warwick (conditional) |
| Urgot | Top | Fiora (mechanical); Jax (mechanical); Olaf (mechanical); Vladimir (mechanical); Yasuo (mechanical); Gwen (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional); Nasus (conditional); Vayne (conditional); Warwick (conditional) |
| Varus | ADC | Sivir (mechanical); Yasuo (mechanical); Samira (mechanical); Xayah (conditional); Ezreal (conditional); Tristana (conditional); Vayne (conditional) |
| Vayne | ADC | Nilah (mechanical); Varus (mechanical); Yasuo (mechanical); Samira (mechanical); Sivir (mechanical); Xayah (mechanical); Aphelios (conditional); Ezreal (conditional); Tristana (conditional) |
| Vayne | Top | Yasuo (mechanical); Fiora (mechanical); Olaf (mechanical); Vladimir (mechanical); Gwen (conditional); Jax (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional); Nasus (conditional); Warwick (conditional) |
| Veigar | Mid | Kassadin (mechanical); Katarina (mechanical); Locke (mechanical); Morgana (mechanical); Fizz (mechanical); Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); LeBlanc (conditional); Zed (conditional); Galio (conditional); Tristana (conditional) |
| Veigar | Support | Morgana (mechanical); Braum (mechanical); Milio (mechanical); Mel (mechanical); Galio (conditional); Alistar (conditional) |
| Vel'Koz | Support | Hwei (mechanical); Leona (mechanical); Nautilus (mechanical); Braum (mechanical); Mel (mechanical); Galio (conditional) |
| Vel'Koz | Mid | Hwei (mechanical); Yasuo (mechanical); Yone (mechanical); Zoe (mechanical); Fizz (mechanical); Mel (mechanical); Vladimir (mechanical); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Vex | Mid | Morgana (mechanical); Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); Xerath (conditional); Fizz (conditional); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Vi | Jungle | Poppy (mechanical); Nocturne (mechanical); Olaf (mechanical); Morgana (mechanical); Warwick (conditional); Kindred (conditional) |
| Viego | Jungle | Poppy (mechanical); Nocturne (mechanical); Olaf (mechanical); Morgana (mechanical); Gwen (conditional); Jax (conditional); Rammus (conditional); Warwick (conditional); Kindred (conditional) |
| Viktor | Mid | Kassadin (mechanical); Fizz (conditional); Vel'Koz (conditional); Galio (conditional); Tristana (conditional); Vladimir (conditional) |
| Vladimir | Mid | Malzahar (mechanical); Anivia (conditional); Xerath (conditional); Galio (conditional); Kassadin (conditional); Fizz (conditional); Tristana (conditional) |
| Vladimir | Top | Yorick (mechanical); Fiora (mechanical); Irelia (conditional); Nasus (conditional); Gwen (conditional); Vayne (conditional); Warwick (conditional) |
| Volibear | Top | Jax (mechanical); Fiora (mechanical); Olaf (mechanical); Shen (conditional); Teemo (conditional); Gwen (conditional); Malphite (conditional); Nasus (conditional); Vayne (conditional); Vladimir (conditional); Warwick (conditional) |
| Volibear | Jungle | Jax (mechanical); Nocturne (mechanical); Olaf (mechanical); Gwen (conditional); Rammus (conditional); Warwick (conditional); Kindred (conditional) |
| Warwick | Jungle | Jax (mechanical); Nocturne (mechanical); Olaf (mechanical); Gwen (conditional); Rammus (conditional); Kindred (conditional) |
| Warwick | Top | Teemo (mechanical); Fiora (mechanical); Olaf (mechanical); Jax (conditional); Shen (conditional); Gwen (conditional); Malphite (conditional); Nasus (conditional); Vayne (conditional); Vladimir (conditional) |
| Wukong | Top | Jax (mechanical); Poppy (mechanical); Fiora (mechanical); Olaf (mechanical); Shen (conditional); Teemo (conditional); Gwen (conditional); Malphite (conditional); Nasus (conditional); Vayne (conditional); Vladimir (conditional) |
| Wukong | Jungle | Jax (mechanical); Poppy (mechanical); Olaf (mechanical); Morgana (mechanical); Nocturne (mechanical); Gwen (conditional); Rammus (conditional); Kindred (conditional) |
| Xayah | ADC | Yasuo (mechanical); Sivir (mechanical); Samira (mechanical); Caitlyn (conditional); Ezreal (conditional); Tristana (conditional); Vayne (conditional) |
| Xerath | Support | Nautilus (mechanical); Leona (mechanical); Pyke (mechanical); Braum (mechanical); Mel (mechanical); Morgana (mechanical); Galio (conditional) |
| Xerath | Mid | Yasuo (mechanical); Mel (mechanical); Morgana (mechanical); Vladimir (mechanical); Fizz (conditional); Zed (conditional); Galio (conditional); Kassadin (conditional) |
| Xin Zhao | Jungle | Jax (mechanical); Poppy (mechanical); Olaf (mechanical); Nocturne (mechanical); Gwen (conditional); Rammus (conditional); Kindred (conditional) |
| Yasuo | Mid | Malzahar (mechanical); Taliyah (mechanical); Vex (mechanical); Annie (mechanical); Kennen (mechanical); Neeko (mechanical); Fizz (mechanical); Mel (mechanical); Morgana (mechanical); Vladimir (mechanical); Tristana (conditional) |
| Yasuo | Top | Kennen (mechanical); Poppy (mechanical); Sett (mechanical); Fiora (mechanical); Olaf (mechanical); Vladimir (mechanical); Gwen (conditional); Jax (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional); Nasus (conditional); Vayne (conditional) |
| Yasuo | ADC | Nilah (mechanical); Sivir (mechanical); Samira (mechanical); Xayah (conditional); Ezreal (conditional); Tristana (conditional); Vayne (conditional) |
| Yone | Mid | Vex (mechanical); Azir (mechanical); Malzahar (mechanical); Fizz (conditional); Tristana (conditional); Vladimir (conditional) |
| Yone | Top | Poppy (mechanical); Olaf (mechanical); Fiora (mechanical); Warwick (conditional); Jax (conditional); Shen (conditional); Teemo (conditional); Gwen (conditional); Malphite (conditional); Nasus (conditional); Vayne (conditional); Vladimir (conditional) |
| Yorick | Top | Jax (mechanical); Renekton (mechanical); Fiora (mechanical); Vladimir (mechanical); Yasuo (mechanical); Irelia (conditional); Gwen (conditional); Shen (conditional); Teemo (conditional); Malphite (conditional); Nasus (conditional); Vayne (conditional); Warwick (conditional); Olaf (conditional) |
| Yunara | ADC | Yasuo (mechanical); Sivir (mechanical); Samira (mechanical); Xayah (conditional); Nilah (conditional); Ezreal (conditional); Tristana (conditional); Vayne (conditional) |
| Yuumi | Support | Rell (mechanical); Blitzcrank (mechanical); Braum (mechanical); Mel (mechanical); Leona (conditional); Nautilus (conditional); Galio (conditional) |
| Zaahen | Top | Fiora (mechanical); Poppy (mechanical); Olaf (mechanical); Jax (conditional); Shen (conditional); Teemo (conditional); Gwen (conditional); Malphite (conditional); Nasus (conditional); Vayne (conditional); Vladimir (conditional) |
| Zaahen | Jungle | Poppy (mechanical); Nocturne (mechanical); Olaf (mechanical); Jax (conditional); Gwen (conditional); Rammus (conditional); Kindred (conditional) |
| Zac | Jungle | Poppy (mechanical); Olaf (mechanical); Morgana (mechanical); Nocturne (mechanical); Brand (conditional); Gwen (conditional); Warwick (conditional); Kindred (conditional) |
| Zac | Top | Poppy (mechanical); Fiora (mechanical); Olaf (mechanical); Gwen (conditional); Vayne (conditional); Vladimir (conditional); Warwick (conditional) |
| Zac | Support | Poppy (mechanical); Janna (mechanical); Morgana (mechanical); Galio (conditional); Alistar (conditional); Thresh (conditional) |
| Zed | Mid | Lissandra (mechanical); Kayle (mechanical); Zilean (mechanical); Fizz (mechanical); Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); Tristana (conditional) |
| Zeri | ADC | Yasuo (mechanical); Sivir (mechanical); Samira (mechanical); Xayah (conditional); Nilah (conditional); Ezreal (conditional); Tristana (conditional); Vayne (conditional) |
| Ziggs | ADC | Yasuo (mechanical); Sivir (mechanical); Samira (mechanical); Xayah (conditional); Ezreal (conditional); Tristana (conditional); Vayne (conditional) |
| Ziggs | Mid | Yasuo (mechanical); Mel (mechanical); Vladimir (mechanical); Fizz (conditional); Vel'Koz (conditional); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Zilean | Support | Morgana (mechanical); Braum (mechanical); Milio (mechanical); Mel (mechanical); Galio (conditional); Alistar (conditional) |
| Zilean | Mid | Morgana (mechanical); Mel (mechanical); Vladimir (mechanical); Yasuo (mechanical); Fizz (conditional); Xerath (conditional); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Zoe | Mid | Morgana (mechanical); Yasuo (mechanical); Mel (mechanical); Vladimir (mechanical); Fizz (conditional); Galio (conditional); Kassadin (conditional); Tristana (conditional) |
| Zyra | Support | Morgana (mechanical); Braum (mechanical); Milio (mechanical); Mel (mechanical); Galio (conditional); Alistar (conditional) |
